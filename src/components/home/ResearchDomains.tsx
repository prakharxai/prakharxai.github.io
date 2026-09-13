import React from 'react';
import { contentService } from '../../services/contentService';
import {
  Eye,
  MessageSquareText,
  FileText,
  Layers,
  Network,
  Languages,
  HeartPulse,
  Cpu,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const ResearchDomains: React.FC = () => {
  const domains = contentService.getDomains();
  const allProjects = contentService.getProjects();

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-5 h-5 text-indigo-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-teal-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-purple-400" />;
      case 'Languages':
        return <Languages className="w-5 h-5 text-emerald-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="research-domains" className="py-24 bg-lab-bg-secondary border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <span>SPECIALIZED INVESTIGATION AREAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Research &amp; Technical Domains
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Grounded in rigorous experimentation across document processing, linguistic models, biometric vision pipelines, and clinical healthcare systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain) => {
            const domainProjects = allProjects.filter((p) =>
              domain.relatedProjectIds.includes(p.id)
            );

            return (
              <div
                key={domain.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-lab-border hover:border-cyan-500/50 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-lab-border flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                      {getDomainIcon(domain.icon)}
                    </div>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {domain.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {domain.shortDescription}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {domain.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {domain.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                        +{domain.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Related projects snippet */}
                <div className="pt-4 border-t border-lab-border/70">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Key Implementations:
                  </div>
                  <div className="space-y-1.5">
                    {domainProjects.slice(0, 2).map((proj) => (
                      <a
                        key={proj.id}
                        href={`#/projects/${proj.slug}`}
                        className="text-xs font-medium text-slate-300 hover:text-cyan-400 flex items-center justify-between group/link"
                      >
                        <span className="truncate pr-2">{proj.title}</span>
                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover/link:text-cyan-400 shrink-0 transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
