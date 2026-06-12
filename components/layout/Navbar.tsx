'use client';

import BubbleMenu, { type MenuItem } from '@/components/ui/BubbleMenu';

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Home',
    href: '#hero',
    ariaLabel: 'Go to home',
    rotation: -8,
    hoverStyles: { bgColor: '#c00510', textColor: '#ffffff' },
  },
  {
    label: 'About',
    href: '#about',
    ariaLabel: 'Go to about',
    rotation: 8,
    hoverStyles: { bgColor: '#ffffff', textColor: '#000000' },
  },
  {
    label: 'Services',
    href: '#services',
    ariaLabel: 'Go to services',
    rotation: 8,
    hoverStyles: { bgColor: '#c00510', textColor: '#ffffff' },
  },
  {
    label: 'Experience',
    href: '#experience',
    ariaLabel: 'Go to experience',
    rotation: -8,
    hoverStyles: { bgColor: '#ffffff', textColor: '#000000' },
  },
  {
    label: 'Projects',
    href: '#projects',
    ariaLabel: 'Go to projects',
    rotation: 8,
    hoverStyles: { bgColor: '#c00510', textColor: '#ffffff' },
  },
  {
    label: 'Skills',
    href: '#skills',
    ariaLabel: 'Go to skills',
    rotation: -8,
    hoverStyles: { bgColor: '#ffffff', textColor: '#000000' },
  },
  {
    label: 'Gaming',
    href: '#gaming',
    ariaLabel: 'Go to gaming',
    rotation: 8,
    hoverStyles: { bgColor: '#c00510', textColor: '#ffffff' },
  },
  {
    label: 'Contact',
    href: '#contact',
    ariaLabel: 'Go to contact',
    rotation: -8,
    hoverStyles: { bgColor: '#ffffff', textColor: '#000000' },
  },
];

export default function Navbar() {
  return (
    <BubbleMenu
      className="bubble-menu-portfolio"
      logo="/uploads/logo.svg"
      items={MENU_ITEMS}
      menuAriaLabel="Toggle navigation"
      menuBg="#1a1a1a"
      menuContentColor="#ffffff"
      useFixedPosition
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.1}
    />
  );
}
