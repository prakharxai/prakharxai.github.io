import React from 'react';
import { contentService } from '../../services/contentService';
import { UserCheck, Binary, Terminal, Shield, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const profile = contentService.getProfile();

  const researchThemes = [
    'Computer Vision',
    'Natural Language Processing',
    'Document Intelligence & OCR',
    'Healthcare Applications',
    'Knowledge Graphs',
    'Generative AI & Grounded RAG',
  ];

  const engineeringThemes = [
    'PyTorch',
    'TensorFlow',
    'Transformers (HuggingFace)',
    'YOLOv8',
    'OpenCV',
    'Streamlit',
    'MySQL & MongoDB',
    'LaTeX & Mathematical OCR',
  ];

  return (
    <section id="about" className="py-24 bg-lab-bg-secondary border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Academic Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <UserCheck className="w-3.5 h-3.5" />
              <span>RESEARCH PROFILE &amp; PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Bridging Rigorous AI Research with Real-World Clinical &amp; Document Deployment
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              {profile.fullBio}
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-lab-border">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold mb-3">
                  <Binary className="w-4 h-4" />
                  <span>RESEARCH DIRECTION</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {researchThemes.map((theme) => (
                    <li key={theme} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-lab-border">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold mb-3">
                  <Terminal className="w-4 h-4" />
                  <span>APPLIED ENGINEERING</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {engineeringThemes.map((theme) => (
                    <li key={theme} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Research Credentials Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-lab-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-lg shadow-indigo-500/20 shrink-0">
                  <img
                    src="assets/prakhar-joshi.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{profile.name}</h3>
                  <p className="text-xs font-mono text-blue-400">Junior Research Fellow (JRF)</p>
                  <p className="text-[11px] text-slate-400">Swami Rama Himalayan University</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs font-mono text-slate-300 border-t border-lab-border pt-5">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Current Affiliation:</span>
                  <span className="text-right text-slate-200">SRHU, Dehradun</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Previous Affiliation:</span>
                  <span className="text-right text-slate-200">CAIR, Haridwar</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Master's Degree:</span>
                  <span className="text-right text-slate-200">MCA (Data Science)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Global Competition:</span>
                  <span className="text-right text-emerald-400 font-bold">SemEval 2026 #3 Rank</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Research Focus:</span>
                  <span className="text-right text-blue-400">Grounded AI &amp; CV</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-lab-border flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Location:</span>
                <span className="text-slate-300 font-mono">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
