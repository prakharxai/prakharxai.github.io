import React from 'react';
import { contentService } from '../../services/contentService';
import { GraduationCap, Calendar, MapPin, BookCheck } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const educationList = contentService.getEducation();

  return (
    <section id="education" className="py-24 bg-lab-bg border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Education &amp; Academic Training
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Advanced graduate specialization in Data Science and fundamental computer science degree coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="p-7 rounded-2xl bg-slate-900/70 border border-lab-border hover:border-blue-500/40 transition-all flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700/60 group-hover:border-blue-500/40 transition-colors text-blue-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-800 text-blue-300 border border-slate-700/60 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.startYear} – {edu.endYear}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-blue-300 transition-colors mb-1.5">
                  {edu.degree}
                </h3>

                <div className="text-sm font-semibold text-slate-300 mb-1">
                  {edu.institution}
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-slate-400 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.location}</span>
                </div>

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="pt-4 border-t border-lab-border/60">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Relevant Coursework:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
