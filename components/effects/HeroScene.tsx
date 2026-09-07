'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Sphere, Color } from 'ogl';

const VERTEX = /* glsl */ `
  attribute vec3 position;
  attribute vec3 normal;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat3 normalMatrix;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointSize;

  varying float vDisplacement;
  varying float vFacing;

  // Ashima/webgl-noise classic 3D simplex noise.
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    float n = snoise(position * 1.4 + uTime * 0.12);
    vDisplacement = n;

    vec3 viewNormal = normalize(normalMatrix * normal);
    vFacing = viewNormal.z;

    vec3 displaced = position + normal * n * 0.14;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = uPointSize * (0.7 + 0.5 * (n * 0.5 + 0.5)) * (0.6 + 0.4 * vFacing);
    gl_PointSize = max(size * uPixelRatio * (4.0 / -mvPosition.z), 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vDisplacement;
  varying float vFacing;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float depthFade = smoothstep(-0.75, 0.5, vFacing);
    float alpha = pow(core, 0.7) * mix(0.12, 1.0, depthFade);
    vec3 color = mix(uColorA, uColorB, smoothstep(0.35, 0.9, vDisplacement));
    color *= (0.7 + core * 0.6) * (0.5 + depthFade * 0.6);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        preserveDrawingBuffer: true,
      });
    } catch {
      return; // WebGL unavailable — background gradients still cover it.
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 32 });
    camera.position.set(0, 0, 6);

    const scene = new Transform();

    const geometry = new Sphere(gl, { radius: 1.4, widthSegments: 44, heightSegments: 28 });
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uPointSize: { value: 8.5 },
        uColorA: { value: new Color('#9b82ff') },
        uColorB: { value: new Color('#3ddc97') },
      },
    });

    const points = new Mesh(gl, { geometry, program, mode: gl.POINTS });
    points.position.set(1.3, 0.05, 0);
    points.setParent(scene);

    const mouse = { x: 0, y: 0 };
    const mouseTarget = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.perspective({ aspect: clientWidth / clientHeight });
    };
    resize();
    window.addEventListener('resize', resize);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const t = (now - start) / 1000;
      program.uniforms.uTime.value = t;

      mouse.x += (mouseTarget.x - mouse.x) * 0.04;
      mouse.y += (mouseTarget.y - mouse.y) * 0.04;

      points.rotation.y = t * 0.08 + mouse.x * 0.3;
      points.rotation.x = mouse.y * 0.2;

      renderer.render({ scene, camera });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      gl.canvas.remove();
      // Not calling loseContext() here: forcing context loss right before a
      // React 18 Strict Mode remount immediately creates a fresh context on a
      // new canvas, and the two in quick succession can leave the new one
      // silently inert (no errors, nothing draws). Let GC reclaim it instead.
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
      aria-hidden
    />
  );
}
