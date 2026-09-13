import React, { useState } from 'react';
import { contentService } from '../../services/contentService';
import {
  Mail,
  GraduationCap,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';

export const ContactSection: React.FC = () => {
  const profile = contentService.getProfile();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Subject and message builder for clean mailto
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || 'AI Research Collaboration Inquiry'
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const collaborationAreas = [
    'AI Research & Shared Tasks',
    'Computer Vision & Biometrics',
    'NLP & Semantic Narrative Alignment',
    'Document Intelligence & OCR',
    'Healthcare AI & Clinical Systems',
    'Retrieval-Augmented Generation (RAG)',
  ];

  return (
    <section id="contact" className="py-24 bg-lab-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Direct Links */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ACADEMIC &amp; INDUSTRY DIALOGUE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Let's Build Something Intelligent.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Open to collaborative research initiatives, conference co-authorship, PhD/research opportunities, and translating computer vision and NLP models into high-impact healthcare and document intelligence systems.
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Research Collaboration Areas:
              </h3>
              <div className="flex flex-wrap gap-2">
                {collaborationAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/80 text-cyan-300 border border-lab-border"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="pt-4 space-y-3">
              {/* Email Pill */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-lab-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">DIRECT EMAIL</div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Profiles */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-lab-border hover:border-cyan-500/40 flex items-center gap-2.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-lab-border hover:border-slate-500 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-200" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Mail Dispatch Form */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-lab-border shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Dispatch Research Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Direct client-side dispatch (launches your default mail client with pre-filled parameters). Zero third-party trackers.
              </p>

              <form onSubmit={handleSendMail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Topic:
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Research Collaboration on Document OCR / SemEval"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-lab-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message / Agenda:
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Describe your research proposal, query, or collaboration scope..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-lab-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to {profile.email}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
