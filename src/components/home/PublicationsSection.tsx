import React, { useState } from 'react';
import { contentService } from '../../services/contentService';
import { Publication } from '../../types/content';
import {
  BookOpen,
  Calendar,
  FileText,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const PublicationsSection: React.FC = () => {
  const publications = contentService.getPublications();
  const [selectedYear, setSelectedYear] = useState<'All' | '2026' | '2025'>('All');
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);
  const [activeBibtexPub, setActiveBibtexPub] = useState<Publication | null>(null);

  const filteredPubs = publications.filter((p) => {
    if (selectedYear === 'All') return true;
    return p.year === selectedYear;
  });

  const handleCopyBibtex = (pub: Publication) => {
    if (!pub.bibtex) return;
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  return (
    <section id="publications" className="py-24 bg-lab-bg-secondary border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>PEER-REVIEWED &amp; ACADEMIC PAPERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Publications &amp; Academic Timeline
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Contributions to international workshops, ACL conferences, IEEE symposiums, and digital governance research.
          </p>
        </div>

        {/* Academic Timeline Navigator (2025 vs 2026) */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-lab-border mb-12 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Interactive Chronological Timeline:
            </div>
            <div className="flex gap-2">
              {(['All', '2026', '2025'] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                    selectedYear === yr
                      ? 'bg-indigo-600 text-white font-bold border-indigo-400 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-800/80 text-slate-400 border-lab-border hover:text-white'
                  }`}
                >
                  {yr === 'All' ? 'All Years' : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Graphical Timeline Track */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* 2026 Pillar */}
            <div
              onClick={() => setSelectedYear('2026')}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                selectedYear === '2026' || selectedYear === 'All'
                  ? 'bg-indigo-950/30 border-indigo-500/50'
                  : 'bg-slate-950/40 border-lab-border opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-display font-extrabold text-indigo-400">2026</span>
                <span className="text-xs font-mono text-slate-400">3 Publications</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>SemEval-2026 (Task 4 Narrative Similarity, 3rd Rank)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>ICITSIF 2026, IEEE (Precision Agriculture Logistics)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Digital Governance (Seed Information Supply Chain)</span>
                </li>
              </ul>
            </div>

            {/* 2025 Pillar */}
            <div
              onClick={() => setSelectedYear('2025')}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                selectedYear === '2025' || selectedYear === 'All'
                  ? 'bg-blue-950/30 border-blue-500/50'
                  : 'bg-slate-950/40 border-lab-border opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-display font-extrabold text-blue-400">2025</span>
                <span className="text-xs font-mono text-slate-400">2 Publications</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>COLING 2025 (Machine-Generated Text Detection)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>AIHW 2025 (Explainable AI for Depression Detection)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Publications List Cards */}
        <div className="space-y-6">
          {filteredPubs.map((pub, idx) => (
            <div
              key={pub.id}
              className="p-7 rounded-2xl bg-slate-900/70 border border-lab-border hover:border-indigo-500/40 transition-all shadow-md group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-3">
                <div className="space-y-2 flex-1">
                  {/* Venue and Year Badge */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">
                      {pub.venue}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {pub.year}
                    </span>
                    {pub.id === 'semeval-2026-task4' && (
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        3rd Rank Shared Task
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {pub.title}
                  </h3>

                  {pub.authors && pub.authors.length > 0 && (
                    <div className="text-xs font-mono text-slate-400">
                      Authors: <span className="text-slate-200">{pub.authors.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* BibTeX Action Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveBibtexPub(activeBibtexPub?.id === pub.id ? null : pub)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-lab-border hover:text-white transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>BibTeX</span>
                  </button>

                  {pub.bibtex && (
                    <button
                      onClick={() => handleCopyBibtex(pub)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-lab-border transition-all"
                      title="Copy BibTeX Citation"
                    >
                      {copiedBibtexId === pub.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl pt-2">
                {pub.abstract}
              </p>

              {/* Tags & Configurable Placeholders */}
              <div className="mt-5 pt-4 border-t border-lab-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-400 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                  {pub.doiUrl ? (
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>DOI</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span title="DOI link can be configured in CMS">DOI: Available via CMS</span>
                  )}

                  {pub.pdfUrl ? (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span title="PDF link can be configured in CMS">PDF: Available via CMS</span>
                  )}
                </div>
              </div>

              {/* Collapsible BibTeX Snippet */}
              {activeBibtexPub?.id === pub.id && pub.bibtex && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs font-mono text-slate-300 overflow-x-auto relative">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>BIBTEX CITATION</span>
                    <button
                      onClick={() => handleCopyBibtex(pub)}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      {copiedBibtexId === pub.id ? 'Copied to clipboard' : 'Copy BibTeX'}
                    </button>
                  </div>
                  <pre className="text-slate-300 leading-relaxed">{pub.bibtex}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
