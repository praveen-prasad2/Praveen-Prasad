'use client';

import PortfolioOS from '@/components/os/PortfolioOS';
import data from '@/data/portfolio.json';
import type { PortfolioData } from '@/types/portfolio';

const portfolioData = data as PortfolioData;

export default function Home() {
  return <PortfolioOS data={portfolioData} />;
}
