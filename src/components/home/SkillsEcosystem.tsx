import React from 'react';
import { contentService } from '../../services/contentService';
import {
  Code2,
  Cpu,
  Eye,
  Wrench,
  Database,
  FileSpreadsheet,
  Terminal,
} from 'lucide-react';

export const SkillsEcosystem: React.FC = () => {
  const skillCategories = contentService.getSkills();

  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'programming':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'ai & machine learning':
        return <Cpu className="w-4 h-4 text-violet-400" />;
      case 'computer vision & nlp':
        return <Eye className="w-4 h-4 text-teal-400" />;
      case 'web & engineering tools':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'databases':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'documentation & design':
        return <FileSpreadsheet className="w-4 h-4 text-sky-400" />;
      default:
        return <Code2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-lab-bg-secondary border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>STACK &amp; TOOLING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Technical Skill Ecosystem
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Grounded technical competencies organized across neural architectures, computer vision frameworks, NLP toolchains, and data systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-lab-border hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700/60 group-hover:border-cyan-500/40 transition-colors">
                    {getCategoryIcon(cat.name)}
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-lab-border/40 text-[11px] font-mono text-slate-500">
                {cat.skills.length} verified technologies
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
