import React from 'react';
import { contentService } from '../../services/contentService';
import { Award, Trophy, Shield, HeartHandshake, CheckCircle2, ExternalLink } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = contentService.getAchievements();
  const certifications = contentService.getCertifications();

  const getAchievementIcon = (title: string) => {
    if (title.includes('SemEval')) return <Trophy className="w-5 h-5 text-emerald-400" />;
    if (title.includes('Hackathon')) return <Award className="w-5 h-5 text-blue-400" />;
    if (title.includes('NCC')) return <Shield className="w-5 h-5 text-amber-400" />;
    return <HeartHandshake className="w-5 h-5 text-purple-400" />;
  };

  return (
    <section id="achievements" className="py-24 bg-lab-bg border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>HONORS &amp; RECOGNITIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Achievements &amp; Certifications
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Recognitions in international NLP shared tasks, healthcare hackathons, and institutional leadership.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-7 rounded-2xl bg-slate-900/70 border border-lab-border hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700/60 group-hover:border-emerald-500/40 transition-colors">
                    {getAchievementIcon(ach.title)}
                  </div>
                  {ach.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                      {ach.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                  <span>{ach.organizationOrEvent}</span>
                  <span>•</span>
                  <span>{ach.year}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {ach.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Sub-section */}
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-lab-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                Professional Certifications
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Technical credentials verified by industry assessment platforms (CMS editable).
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {certifications.length} verified credential(s)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-lab-border flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{cert.name}</h4>
                    <p className="text-xs font-mono text-slate-400">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800"
                    title="View Credential"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
