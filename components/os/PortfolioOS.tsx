'use client';

import { useState, useEffect } from 'react';
import type { PortfolioData } from '@/types/portfolio';
import { useIsMobile } from '@/hooks/use-is-mobile';
import MacDesktop from '@/components/macos/MacDesktop';
import IPhoneHome from '@/components/ios/IPhoneHome';

export default function PortfolioOS({ data }: { data: PortfolioData }) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return isMobile ? <IPhoneHome data={data} /> : <MacDesktop data={data} />;
}
