'use client';

import { useEffect, useState } from 'react';
import { PortfolioData, About, Skill, Experience, Project } from '@/types/portfolio';
import { useRouter } from 'next/navigation';
import { SOCIAL_ICON_OPTIONS } from '@/lib/socials';

export default function AdminPanel() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [analytics, setAnalytics] = useState<{ uniqueVisitors: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'experiences' | 'projects'>('about');
  const [uploading, setUploading] = useState<string | null>(null); // Track which item is uploading
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [portfolioRes, analyticsRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/analytics/stats'),
      ]);

      const portfolioData = await portfolioRes.json();
      const analyticsData = await analyticsRes.json();

      setData(portfolioData);
      if (analyticsData && typeof analyticsData.uniqueVisitors === 'number') {
        setAnalytics({ uniqueVisitors: analyticsData.uniqueVisitors });
      } else {
        setAnalytics({ uniqueVisitors: 0 });
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setAuthenticated(false);
    setData(null);
    setAnalytics(null);
    setPassword('');
    setActiveTab('about');
    setLoading(false);
    setCheckingAuth(false);
  };

  // Check authentication on mount
  useEffect(() => {
    fetch('/api/auth/check')
      .then((res) => res.json())
      .then((result) => {
        if (result.authenticated) {
          setAuthenticated(true);
          loadAdminData();
        } else {
          setAuthenticated(false);
        }
        setCheckingAuth(false);
      })
      .catch(() => {
        setCheckingAuth(false);
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAuthenticated(true);
        loadAdminData();
      } else {
        setLoginError(result.error || 'Invalid password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Portfolio data saved successfully!');
        router.push('/');
      } else {
        const errorMsg = result.error || 'Failed to save portfolio data';
        console.error('Save error:', result);
        alert(`Error: ${errorMsg}\n\nPlease check that BLOB_READ_WRITE_TOKEN is set in your Vercel environment variables.`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`Failed to save portfolio data: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check your Vercel environment variables.`);
    } finally {
      setSaving(false);
    }
  };


  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      resetState();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const updateAbout = (field: keyof About, value: string) => {
    if (!data) return;
    setData({ ...data, about: { ...data.about, [field]: value } });
  };

  const addSocialLink = () => {
    if (!data) return;
    const newSocial = {
      id: Date.now().toString(),
      platform: '',
      url: '',
      handle: '',
    };
    setData({
      ...data,
      about: {
        ...data.about,
        socials: [...(data.about.socials || []), newSocial],
      },
    });
  };

  const updateSocialLink = (id: string, field: keyof { platform: string; url: string; handle?: string; icon?: string }, value: string) => {
    if (!data) return;
    setData({
      ...data,
      about: {
        ...data.about,
        socials: (data.about.socials || []).map((social) =>
          social.id === id ? { ...social, [field]: value } : social
        ),
      },
    });
  };

  const removeSocialLink = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      about: {
        ...data.about,
        socials: (data.about.socials || []).filter((social) => social.id !== id),
      },
    });
  };

  const handleImageUpload = async (file: File, type: 'avatar' | 'skill-icon', skillId?: string) => {
    if (!data) return;
    
    setUploading(type === 'avatar' ? 'avatar' : skillId || '');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        if (type === 'avatar') {
          setData({ ...data, about: { ...data.about, avatar: result.url } });
        } else if (skillId) {
          setData({
            ...data,
            skills: data.skills.map((skill) =>
              skill.id === skillId ? { ...skill, icon: result.url } : skill
            ),
          });
        }
      } else {
        alert(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  const addSkill = () => {
    if (!data) return;
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 50,
      category: '',
    };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    if (!data) return;
    setData({
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    if (!data) return;
    setData({ ...data, skills: data.skills.filter((skill) => skill.id !== id) });
  };

  const addExperience = () => {
    if (!data) return;
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      period: '',
      description: '',
      technologies: [],
    };
    setData({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    if (!data) return;
    setData({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    if (!data) return;
    setData({ ...data, experiences: data.experiences.filter((exp) => exp.id !== id) });
  };

  const addProject = () => {
    if (!data) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    });
  };

  const removeProject = (id: string) => {
    if (!data) return;
    setData({ ...data, projects: data.projects.filter((project) => project.id !== id) });
  };

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Login</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Enter password to access admin panel</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 dark:text-red-400 text-sm">{loginError}</div>
              )}
              
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-red-600">Failed to load portfolio data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f5f7ff] to-white dark:from-[#050505] dark:via-[#090909] dark:to-[#050505] p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid gap-4 md:grid-cols-[1.25fr_minmax(0,1fr)] items-stretch">
          <div className="rounded-3xl bg-white/85 dark:bg-[#101012]/80 border border-gray-200/60 dark:border-gray-800/70 shadow-xl backdrop-blur-sm px-8 py-7">
            <p className="text-xs uppercase tracking-[0.35em] text-primary-600 dark:text-primary-400 mb-3">
              Creator Studio
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              Admin Control Board
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Curate your story, update wins, and fine-tune every card on the frontend. Upload visuals, adjust copy, and sync social touchpoints — all without leaving this dashboard.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/90 dark:bg-[#101012]/90 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-sm px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-3">
                Quick Actions
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
                >
                  View Portfolio
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-[#101012]/90 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-sm px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-3">
                Snapshot
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Projects</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{data.projects.length}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Skills</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{data.skills.length}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Experience</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{data.experiences.length}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Unique Visitors</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {analytics?.uniqueVisitors ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/95 dark:bg-[#101012]/95 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
          <div className="border-b border-gray-200 dark:border-gray-800 px-6">
            <div className="flex">
              {(['about', 'skills', 'experiences', 'projects'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={data.about.name}
                      onChange={(e) => updateAbout('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={data.about.title}
                      onChange={(e) => updateAbout('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={data.about.bio}
                    onChange={(e) => updateAbout('bio', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={data.about.email}
                      onChange={(e) => updateAbout('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={data.about.location}
                      onChange={(e) => updateAbout('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1.1fr_minmax(0,1fr)]">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                      Profile Photo (PNG, SVG, JPEG)
                    </label>
                    <div className="flex items-center gap-4">
                      {data.about.avatar ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-200 dark:border-primary-500/50">
                          <img
                            src={data.about.avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/png,image/svg+xml,image/jpeg,image/jpg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, 'avatar');
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                          disabled={uploading === 'avatar'}
                        />
                        {uploading === 'avatar' && (
                          <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Uploading...</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Tips
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                      <li>Use a 600x600px image for best quality.</li>
                      <li>Update socials below to match your platforms.</li>
                      <li>Handles are optional, but help reinforce branding.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Social Links</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Displayed in the about & contact sections on the frontend.
                      </p>
                    </div>
                    <button
                      onClick={addSocialLink}
                      className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      + Add Social Link
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(data.about.socials || []).map((social) => (
                      <div key={social.id} className="grid gap-3 md:grid-cols-2 bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Platform</span>
                            <button
                              onClick={() => removeSocialLink(social.id)}
                              className="text-xs text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            value={social.platform}
                            onChange={(e) => updateSocialLink(social.id, 'platform', e.target.value)}
                            placeholder="LinkedIn"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm"
                          />
                          <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                              Icon
                            </label>
                            <select
                              value={social.icon || ''}
                              onChange={(e) => updateSocialLink(social.id, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm"
                            >
                              <option value="">Auto</option>
                              {SOCIAL_ICON_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                              URL
                            </label>
                            <input
                              type="url"
                              value={social.url}
                              onChange={(e) => updateSocialLink(social.id, 'url', e.target.value)}
                              placeholder="https://linkedin.com/in/yourprofile"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                              Handle (optional)
                            </label>
                            <input
                              type="text"
                              value={social.handle || ''}
                              onChange={(e) => updateSocialLink(social.id, 'handle', e.target.value)}
                              placeholder="@username"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!data.about.socials || data.about.socials.length === 0) && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
                        No social links added. Click "+ Add Social Link" to add one.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4">
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  + Add Skill
                </button>
                {data.skills.map((skill) => (
                  <div key={skill.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 dark:text-white">Skill {skill.id}</h3>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Level ({skill.level}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <input
                        type="text"
                        value={skill.category}
                        onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Skill Icon (PNG, SVG, JPEG)
                      </label>
                      <div className="flex items-center gap-4">
                        {skill.icon && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/png,image/svg+xml,image/jpeg,image/jpg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, 'skill-icon', skill.id);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            disabled={uploading === skill.id}
                          />
                          {uploading === skill.id && (
                            <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Uploading...</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experiences' && (
              <div className="space-y-4">
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  + Add Experience
                </button>
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 dark:text-white">Experience {exp.id}</h3>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Title
                      </label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Period
                      </label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g., 2020 - 2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Description
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={exp.technologies.join(', ')}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            'technologies',
                            e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="React, TypeScript, Next.js"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  + Add Project
                </button>
                {data.projects.map((project) => (
                  <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 dark:text-white">Project {project.id}</h3>
                      <button
                        onClick={() => removeProject(project.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            'technologies',
                            e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Next.js, TypeScript, Tailwind"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Live Link (optional)
                      </label>
                      <input
                        type="url"
                        value={project.link || ''}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        GitHub Link (optional)
                      </label>
                      <input
                        type="url"
                        value={project.github || ''}
                        onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
