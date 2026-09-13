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
  const [copiedType, setCopiedType] = useState<'primary' | 'secondary' | null>(null);

  // Recipient selection
  const [selectedRecipient, setSelectedRecipient] = useState<'primary' | 'secondary' | 'both'>('primary');

  // Subject and message builder for clean mailto
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleCopyEmail = (email: string, type: 'primary' | 'secondary') => {
    navigator.clipboard.writeText(email);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    let toEmail = profile.email;
    let ccParam = '';

    if (selectedRecipient === 'secondary' && profile.secondaryEmail) {
      toEmail = profile.secondaryEmail;
    } else if (selectedRecipient === 'both' && profile.secondaryEmail) {
      toEmail = profile.email;
      ccParam = `&cc=${encodeURIComponent(profile.secondaryEmail)}`;
    }

    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(
      subject || 'AI Research Collaboration Inquiry'
    )}&body=${encodeURIComponent(body)}${ccParam}`;
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono">
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
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/80 text-blue-300 border border-lab-border"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="pt-4 space-y-3">
              {/* Primary Email Pill */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-lab-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider">PRIMARY / RESEARCH EMAIL</div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyEmail(profile.email, 'primary')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shrink-0"
                  title="Copy primary email to clipboard"
                >
                  {copiedType === 'primary' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Secondary / Institutional Email Pill */}
              {profile.secondaryEmail && (
                <div className="p-4 rounded-xl bg-slate-900/70 border border-lab-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-blue-400 font-semibold tracking-wider">INSTITUTIONAL / AI CENTRE EMAIL</div>
                      <a
                        href={`mailto:${profile.secondaryEmail}`}
                        className="text-sm font-semibold text-white hover:text-blue-300 transition-colors truncate block"
                      >
                        {profile.secondaryEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyEmail(profile.secondaryEmail!, 'secondary')}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shrink-0"
                    title="Copy institutional email to clipboard"
                  >
                    {copiedType === 'secondary' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

              {/* Verified External Profiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/70 border border-lab-border hover:border-blue-500/40 flex items-center gap-2.5 text-xs text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">LinkedIn</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/70 border border-lab-border hover:border-slate-500 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-200 shrink-0" />
                  <span className="truncate">GitHub</span>
                </a>
                {profile.googleScholar ? (
                  <a
                    href={profile.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900/70 border border-indigo-500/30 hover:border-indigo-400 flex items-center gap-2.5 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">Google Scholar</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-900/50 border border-lab-border text-xs text-slate-500 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-600 shrink-0" />
                    <span className="truncate">Scholar (Config)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Mail Dispatch Form */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-lab-border shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Dispatch Research Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Direct client-side dispatch (launches your default mail client with pre-filled parameters). Zero third-party trackers.
              </p>

              <form onSubmit={handleSendMail} className="space-y-4">
                {/* Recipient Target Selector */}
                {profile.secondaryEmail && (
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Send to:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRecipient('primary')}
                        className={`px-3 py-2 rounded-lg text-xs font-mono transition-all text-left truncate ${
                          selectedRecipient === 'primary'
                            ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300'
                            : 'bg-slate-950/60 border border-lab-border text-slate-400 hover:text-white'
                        }`}
                      >
                        Personal / Research
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRecipient('secondary')}
                        className={`px-3 py-2 rounded-lg text-xs font-mono transition-all text-left truncate ${
                          selectedRecipient === 'secondary'
                            ? 'bg-blue-950/80 border border-blue-500/60 text-blue-300'
                            : 'bg-slate-950/60 border border-lab-border text-slate-400 hover:text-white'
                        }`}
                      >
                        AI Centre
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRecipient('both')}
                        className={`px-3 py-2 rounded-lg text-xs font-mono transition-all text-left truncate ${
                          selectedRecipient === 'both'
                            ? 'bg-indigo-950/80 border border-indigo-500/60 text-indigo-300'
                            : 'bg-slate-950/60 border border-lab-border text-slate-400 hover:text-white'
                        }`}
                      >
                        Both Emails (CC)
                      </button>
                    </div>
                  </div>
                )}

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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-lab-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-xs"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-lab-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    Send Message to{' '}
                    {selectedRecipient === 'secondary'
                      ? profile.secondaryEmail
                      : selectedRecipient === 'both'
                      ? 'Both Emails'
                      : profile.email}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
