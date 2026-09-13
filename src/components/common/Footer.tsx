import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { Mail, GraduationCap, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  const [profile, setProfile] = useState(contentService.getProfile());

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setProfile(contentService.getProfile());
    });
    return () => unsub();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-lab-bg-secondary border-t border-lab-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-lab-border/60">
          {/* Brand & Persona */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-display font-bold text-sm">
                PJ
              </div>
              <h2 className="text-lg font-display font-bold text-white tracking-tight">
                {profile.name}
              </h2>
            </div>
            <p className="text-sm font-medium text-cyan-400">
              {profile.title}
            </p>
            <p className="text-xs font-mono text-slate-400 tracking-wide">
              Computer Vision · NLP · OCR · RAG · Deep Learning
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          {/* Quick Academic Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#research-domains" className="hover:text-cyan-400 transition-colors">
                  Research Domains
                </a>
              </li>
              <li>
                <a href="#research-pipeline" className="hover:text-cyan-400 transition-colors">
                  Research Pipeline
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#publications" className="hover:text-cyan-400 transition-colors">
                  Publications &amp; Timeline
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">
                  Academic Experience
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  Research Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Connect &amp; Profiles
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub ({profile.github.replace('https://github.com/', '@')})</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>LinkedIn</span>
              </a>
              {profile.googleScholar ? (
                <a
                  href={profile.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Google Scholar Profile</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-xs text-slate-500 cursor-not-allowed" title="Google Scholar URL can be configured in CMS">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>Google Scholar Profile (CMS Configurable)</span>
                </span>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-600">
              Grounded strictly in verified academic resume
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-lab-border text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
