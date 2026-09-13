import React, { useEffect } from 'react';
import { contentService } from '../services/contentService';
import { Project } from '../types/content';
import {
  ArrowLeft,
  Calendar,
  Layers,
  Award,
  ExternalLink,
  Cpu,
  CheckCircle2,
  FileText,
  Workflow,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';

interface ProjectDetailPageProps {
  slug: string;
  onNavigateHome: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onNavigateHome,
}) => {
  const project = contentService.getProjectBySlug(slug);
  const allProjects = contentService.getProjects();
  const publications = contentService.getPublications();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-display font-bold text-white mb-3">Project Not Found</h1>
        <p className="text-sm text-slate-400 mb-6">
          The requested project with slug "{slug}" does not exist in the research registry.
        </p>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-mono font-bold hover:bg-cyan-500"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  // Related projects in same category
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.tags.some(t => project.tags.includes(t))))
    .slice(0, 3);

  // Check if there is a matching publication
  const relatedPub = publications.find(
    (pub) =>
      pub.id === project.relatedPublicationId ||
      (project.slug.includes('semeval') && pub.id.includes('semeval')) ||
      (project.slug.includes('coling') && pub.id.includes('coling'))
  );

  return (
    <article className="pt-28 pb-24 bg-lab-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-lab-border text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>RESEARCH REPOSITORY</span>
            <span>/</span>
            <span className="text-cyan-400">{project.category}</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {project.year}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30">
                Featured Architecture
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            {project.description}
          </p>

          {/* Explicitly Verified Result / Benchmark */}
          {project.resultOrAchievement && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-200">VERIFIED BENCHMARK &amp; RESULT: </span>
                <span>{project.resultOrAchievement}</span>
              </div>
            </div>
          )}
        </div>

        {/* Technical Architecture Diagram */}
        <div className="my-10 rounded-2xl bg-slate-950 border border-lab-border overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-900/90 border-b border-lab-border flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400">
              <Workflow className="w-4 h-4" />
              <span>TECHNICAL ARCHITECTURE SPECIFICATION</span>
            </div>
            <span className="text-slate-500">SCHEMATIC DIAGRAM</span>
          </div>
          <div className="p-2 sm:p-6 bg-slate-950/90 flex justify-center">
            <img
              src={project.image}
              alt={`${project.title} detailed architecture illustration`}
              className="max-h-[460px] w-auto object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Technical Deep Dive: Problem, Approach & Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {/* Problem Statement */}
          <div className="p-7 rounded-2xl bg-slate-900/70 border border-lab-border space-y-3">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Research Challenge &amp; Problem</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Research Approach */}
          <div className="p-7 rounded-2xl bg-slate-900/70 border border-lab-border space-y-3">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Methodological Approach</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.approach}
            </p>
          </div>
        </div>

        {/* Pipeline / Architectural Flow String */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-lab-border my-8 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>End-to-End Computational Pipeline</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed">
            {project.architecture}
          </div>
        </div>

        {/* Technologies Stack */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-lab-border my-8 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Technologies &amp; Libraries:
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Related Publication Callout if applicable */}
        {relatedPub && (
          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 my-8 space-y-2">
            <div className="text-xs font-mono text-indigo-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>ASSOCIATED PEER-REVIEWED PUBLICATION</span>
            </div>
            <h3 className="text-base font-bold text-white">
              {relatedPub.title}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              {relatedPub.venue} ({relatedPub.year})
            </p>
            <p className="text-xs text-slate-300 pt-1">
              {relatedPub.abstract}
            </p>
          </div>
        )}

        {/* Repository & Source Availability */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-lab-border my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Repository &amp; Documentation</h3>
            <p className="text-xs text-slate-400">
              {project.githubUrl
                ? 'Code and documentation available on GitHub'
                : 'Repository link and deployment endpoints can be updated in CMS'}
            </p>
          </div>

          <div className="flex gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white border border-slate-700"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-xs font-mono text-slate-500 border border-slate-800">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub (CMS Configurable)</span>
              </span>
            )}
          </div>
        </div>

        {/* Related Projects Carousel/List */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-10 border-t border-lab-border">
            <h3 className="text-xl font-display font-bold text-white mb-6">
              Related Research &amp; Deployments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <a
                  key={rp.id}
                  href={`#/projects/${rp.slug}`}
                  className="p-5 rounded-xl bg-slate-900/70 border border-lab-border hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 mb-1 block">
                      {rp.category} • {rp.year}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {rp.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-cyan-400">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
