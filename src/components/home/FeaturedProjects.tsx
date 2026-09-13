import React, { useState, useMemo } from 'react';
import { contentService } from '../../services/contentService';
import { Project } from '../../types/content';
import {
  Search,
  ArrowRight,
  Sparkles,
  Award,
  ExternalLink,
  Layers,
  Calendar,
  Tag,
} from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const allProjects = contentService.getProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories = [
    'All',
    'Computer Vision',
    'NLP',
    'OCR',
    'RAG',
    'Healthcare',
    'Knowledge Graph',
    'Generative AI',
    'Research',
    'Deployment',
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category / Tag filter
      const matchesCategory =
        selectedCategory === 'All' ||
        project.category.toLowerCase() === selectedCategory.toLowerCase() ||
        project.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.problem.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 bg-lab-bg border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>RESEARCH &amp; DEPLOYED SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Featured Research &amp; Projects
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Architected and deployed solutions across multilingual OCR, biometrics, transformer narrative alignment, and healthcare records.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, technologies (e.g. YOLO, RAG, Surya, ResNet)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-lab-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-slate-400 text-right">
              Showing <span className="text-cyan-400 font-bold">{filteredProjects.length}</span> of {allProjects.length} verified projects
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {filterCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/60 text-slate-400 border-lab-border hover:text-white hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-slate-900/70 border border-lab-border hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Visual Architecture Preview */}
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-lab-border">
                    <img
                      src={project.image}
                      alt={`${project.title} architecture diagram`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-slate-950/85 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1 backdrop-blur-md">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 text-slate-300 border border-slate-700/60 flex items-center gap-1 backdrop-blur-md">
                        <Calendar className="w-2.5 h-2.5" />
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Result / Achievement Badge if explicitly verified */}
                    {project.resultOrAchievement && (
                      <div className="mb-4 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                        <span>{project.resultOrAchievement}</span>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action: Link to Detail Page */}
                <div className="p-6 pt-0 border-t border-lab-border/40 mt-4 flex items-center justify-between">
                  <a
                    href={`#/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                  >
                    <span>View Technical Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white"
                      title="GitHub Repository"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-lab-border">
            <p className="text-sm text-slate-400">
              No projects found matching category "{selectedCategory}" and search query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
