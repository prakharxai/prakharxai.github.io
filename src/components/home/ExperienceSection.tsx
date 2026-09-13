import React from 'react';
import { contentService } from '../../services/contentService';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = contentService.getExperience();

  return (
    <section id="experience" className="py-24 bg-lab-bg border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL APPOINTMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Research &amp; Professional Experience
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Academic appointments focusing on applied computer vision, clinical healthcare pipelines, and institutional AI research.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 md:pl-10 group">
              {/* Timeline Marker Node */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  exp.current
                    ? 'bg-blue-500 border-white shadow-lg shadow-blue-500/50 ring-4 ring-blue-500/20'
                    : 'bg-slate-900 border-slate-600 group-hover:border-blue-400'
                }`}
              />

              {/* Date callout for large screens */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28">
                <span className="text-xs font-mono font-bold text-slate-300">
                  {exp.startDate}
                </span>
                <div className="text-[11px] font-mono text-slate-500">
                  {exp.endDate}
                </div>
              </div>

              {/* Main Card */}
              <div className="p-7 rounded-2xl bg-slate-900/70 border border-lab-border group-hover:border-blue-500/40 transition-all shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-blue-300 transition-colors">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950 text-blue-300 border border-blue-500/40">
                        CURRENT ROLE
                      </span>
                    )}
                  </div>
                  <div className="md:hidden flex items-center gap-1.5 text-xs font-mono text-blue-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-5">
                  <span className="text-slate-200 font-semibold">{exp.organization}</span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {exp.location}
                  </span>
                </div>

                {/* Responsibilities list directly from resume */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
