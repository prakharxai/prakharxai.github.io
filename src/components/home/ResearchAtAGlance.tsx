import React from 'react';
import { Award, BookOpen, Layers, ShieldCheck, Cpu, Hospital } from 'lucide-react';

export const ResearchAtAGlance: React.FC = () => {
  return (
    <section className="relative py-16 bg-lab-bg border-y border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
            RESEARCH OVERVIEW
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-white">
            Research at a Glance
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Key research contributions, competitive benchmarks, and deployed architectures strictly documented in academic publications and institutional projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: SemEval 2026 3rd Rank */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400/60 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-25 transition-opacity">
              <Award className="w-16 h-16 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-3">
              <Award className="w-4 h-4" />
              <span>GLOBAL BENCHMARK</span>
            </div>
            <div className="text-3xl font-display font-extrabold text-white tracking-tight">
              3rd Rank
            </div>
            <div className="text-sm font-semibold text-slate-200 mt-1">
              SemEval 2026 (ACL)
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Task 4: Narrative Similarity. Designed hybrid transformer embeddings and complementarity-driven LLM ensembling.
            </p>
          </div>

          {/* Card 2: COLING 2025 Publication */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-blue-500/30 relative overflow-hidden group hover:border-blue-400/60 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-25 transition-opacity">
              <BookOpen className="w-16 h-16 text-blue-400" />
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold mb-3">
              <BookOpen className="w-4 h-4" />
              <span>PEER-REVIEWED</span>
            </div>
            <div className="text-3xl font-display font-extrabold text-white tracking-tight">
              COLING 2025
            </div>
            <div className="text-sm font-semibold text-slate-200 mt-1">
              GenAI Text Detection
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Fast and scalable multilingual machine-generated text detection using fine-tuned RoBERTa and XLM-R models.
            </p>
          </div>

          {/* Card 3: Healthcare AI Deployment */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-sky-500/30 relative overflow-hidden group hover:border-sky-400/60 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-25 transition-opacity">
              <Hospital className="w-16 h-16 text-sky-400" />
            </div>
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold mb-3">
              <Hospital className="w-4 h-4" />
              <span>CLINICAL DEPLOYMENT</span>
            </div>
            <div className="text-3xl font-display font-extrabold text-white tracking-tight">
              Hospital OCR
            </div>
            <div className="text-sm font-semibold text-slate-200 mt-1">
              Swami Rama Himalayan Hospital
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Production OCR pipeline tackling noisy medical scans, complex form layouts, and doctor handwriting extraction.
            </p>
          </div>

          {/* Card 4: Grounded Citation RAG */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-indigo-500/30 relative overflow-hidden group hover:border-indigo-400/60 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-25 transition-opacity">
              <ShieldCheck className="w-16 h-16 text-indigo-400" />
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>TRACEABLE AI</span>
            </div>
            <div className="text-3xl font-display font-extrabold text-white tracking-tight">
              Grounded RAG
            </div>
            <div className="text-sm font-semibold text-slate-200 mt-1">
              Passage-Level Attribution
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Verifiable LLM citation grounding framework linking generated claims directly to retrieved source documents.
            </p>
          </div>
        </div>

        {/* Highlighted Research Pillars Bar */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-lab-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-slate-200 font-medium">Core Research Pillars:</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span className="text-slate-300">Computer Vision</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">NLP</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">OCR &amp; Document Intelligence</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Grounded RAG</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Knowledge Graphs</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Multilingual AI</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Healthcare AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};
