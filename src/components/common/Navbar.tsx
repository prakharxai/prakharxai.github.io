import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { Menu, X, Sparkles, Sliders, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(contentService.getProfile());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    const unsub = contentService.subscribe(() => {
      setProfile(contentService.getProfile());
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsub();
    };
  }, []);

  const navLinks = [
    { label: 'Research', href: '#research-domains' },
    { label: 'Pipeline', href: '#research-pipeline' },
    { label: 'Projects', href: '#projects' },
    { label: 'Publications', href: '#publications' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-lab-bg/90 backdrop-blur-md border-b border-lab-border py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-indigo-500/40 shadow-sm shadow-indigo-500/20 group-hover:border-blue-400 transition-colors shrink-0">
              <img
                src="assets/prakhar-joshi.jpg"
                alt="Prakhar Joshi"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base tracking-tight flex items-center gap-2">
                <span>{profile.name}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-950/80 text-blue-300 border border-blue-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mr-1" />
                  AI LAB
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Junior Research Fellow · SRHU
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-lab-border backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-lab-border transition-all"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 border border-transparent hover:border-lab-border transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            {profile.googleScholar && (
              <a
                href={profile.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/60 border border-transparent hover:border-indigo-500/30 transition-all"
                title="Google Scholar Profile"
                aria-label="Google Scholar Profile"
              >
                <GraduationCap className="w-4 h-4" />
              </a>
            )}
            <a
              href="#/admin"
              className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 border border-transparent hover:border-lab-border transition-all"
              title="CMS Admin Dashboard"
              aria-label="CMS Admin Dashboard"
            >
              <Sliders className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Collaborate</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#/admin"
              className="p-2 text-slate-400 hover:text-amber-400"
              title="Admin"
              aria-label="Admin"
            >
              <Sliders className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-lab-border"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-lab-bg-secondary/95 border-b border-lab-border px-4 py-5 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-lab-border flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/50"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-400 bg-slate-800/50"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                {profile.googleScholar && (
                  <a
                    href={profile.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-indigo-400 hover:text-indigo-300 bg-slate-800/50"
                    aria-label="Google Scholar"
                  >
                    <GraduationCap className="w-4 h-4" />
                  </a>
                )}
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let's Collaborate</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
