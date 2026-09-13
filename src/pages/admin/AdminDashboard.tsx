import React, { useState, useEffect } from 'react';
import { contentService, ContentState } from '../../services/contentService';
import { Project, Publication, Experience, Education, SkillCategory, Achievement, Certification, Profile, SiteSettings } from '../../types/content';
import {
  Sliders,
  Layers,
  BookOpen,
  Briefcase,
  GraduationCap,
  Cpu,
  Award,
  Settings,
  GitBranch,
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  Upload,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

type TabType =
  | 'overview'
  | 'projects'
  | 'publications'
  | 'experience'
  | 'education'
  | 'skills'
  | 'achievements'
  | 'profile'
  | 'settings'
  | 'git-sync';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [state, setState] = useState<ContentState>(contentService.getState());
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // GitHub API direct commit state
  const [ghOwner, setGhOwner] = useState('prakharxai');
  const [ghRepo, setGhRepo] = useState('prakharxai.github.io');
  const [ghBranch, setGhBranch] = useState('main');
  const [ghToken, setGhToken] = useState('');
  const [ghCommitMsg, setGhCommitMsg] = useState('chore(cms): update portfolio content data');
  const [isCommitting, setIsCommitting] = useState(false);

  // Editing state trackers
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setState(contentService.getState());
    });
    return () => unsub();
  }, []);

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Reorder projects
  const moveProject = (index: number, direction: 'up' | 'down') => {
    const newProjects = [...state.projects];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newProjects.length) return;
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;
    contentService.reorderProjects(newProjects.map((p) => p.id));
    notify('Project order updated');
  };

  // Reorder publications
  const movePublication = (index: number, direction: 'up' | 'down') => {
    const newPubs = [...state.publications];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newPubs.length) return;
    const temp = newPubs[index];
    newPubs[index] = newPubs[targetIdx];
    newPubs[targetIdx] = temp;
    newPubs.forEach((p) => contentService.savePublication(p));
    notify('Publication order updated');
  };

  // Download Collection as JSON
  const downloadJson = (key: keyof ContentState) => {
    const jsonStr = contentService.exportCollectionJson(key);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Downloaded ${key}.json`);
  };

  // Handle GitHub Direct Commit
  const handleGitCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ghToken.trim()) {
      notify('Please enter a valid GitHub Personal Access Token', 'error');
      return;
    }
    setIsCommitting(true);
    const result = await contentService.commitToGitHub({
      owner: ghOwner,
      repo: ghRepo,
      branch: ghBranch,
      token: ghToken,
      message: ghCommitMsg,
    });
    setIsCommitting(false);
    if (result.success) {
      notify(result.message, 'success');
    } else {
      notify(result.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-lab-bg text-slate-100 pt-20 pb-28 font-sans">
      {/* Top Admin Header */}
      <div className="bg-slate-900/90 border-b border-lab-border sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-white text-base">CMS Admin Console</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  LIVE DATA ENGINE
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Prakhar Joshi Research Portfolio · Git-Based Architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                contentService.resetToDefaults();
                notify('Content reset to default repository version');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-lab-border"
              title="Reset any session edits to default repository files"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar border-t border-slate-800/80 gap-1 py-1 text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview', icon: Sliders },
            { id: 'projects', label: 'Projects (12)', icon: Layers },
            { id: 'publications', label: 'Publications (5)', icon: BookOpen },
            { id: 'experience', label: 'Experience (3)', icon: Briefcase },
            { id: 'education', label: 'Education (3)', icon: GraduationCap },
            { id: 'skills', label: 'Skills', icon: Cpu },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'profile', label: 'Profile & Socials', icon: Edit2 },
            { id: 'settings', label: 'Site Settings', icon: Settings },
            { id: 'git-sync', label: 'Git Sync & Export', icon: GitBranch },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Banner */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-mono ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/70 border border-lab-border">
                <div className="text-xs font-mono text-slate-400">TOTAL PROJECTS</div>
                <div className="text-3xl font-display font-bold text-white mt-1">
                  {state.projects.length}
                </div>
                <div className="text-[11px] font-mono text-cyan-400 mt-1">
                  {state.projects.filter((p) => p.featured).length} Featured
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/70 border border-lab-border">
                <div className="text-xs font-mono text-slate-400">PUBLICATIONS</div>
                <div className="text-3xl font-display font-bold text-white mt-1">
                  {state.publications.length}
                </div>
                <div className="text-[11px] font-mono text-indigo-400 mt-1">
                  Peer-Reviewed &amp; Workshops
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/70 border border-lab-border">
                <div className="text-xs font-mono text-slate-400">APPOINTMENTS</div>
                <div className="text-3xl font-display font-bold text-white mt-1">
                  {state.experience.length}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">
                  SRHU &amp; CAIR JRF
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/70 border border-lab-border">
                <div className="text-xs font-mono text-slate-400">SKILL CATEGORIES</div>
                <div className="text-3xl font-display font-bold text-white mt-1">
                  {state.skills.length}
                </div>
                <div className="text-[11px] font-mono text-amber-400 mt-1">
                  {state.skills.reduce((acc, c) => acc + c.skills.length, 0)} Total Skills
                </div>
              </div>
            </div>

            {/* Git Persistence Notice */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/30">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>Git-Based Content Management Policy</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                To guarantee zero backend dependencies on GitHub Pages while adhering strictly to version-controlled best practices, any edits you make are tested immediately in your active session. To persist edits permanently, use the <strong>Git Sync &amp; Export</strong> tab to commit directly to GitHub or download updated JSON files to keep in your repository.
              </p>
              <button
                onClick={() => setActiveTab('git-sync')}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-mono text-white font-bold"
              >
                Go to Git Sync &amp; Export
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Project Registry</h2>
                <p className="text-xs text-slate-400">
                  Manage research architectures, edit details, and reorder display sequence.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingProject({
                    id: `project-${Date.now()}`,
                    slug: 'new-research-project',
                    title: 'New Research Project',
                    year: '2026',
                    category: 'Computer Vision',
                    featured: false,
                    shortDescription: '',
                    description: '',
                    problem: '',
                    approach: '',
                    architecture: '',
                    technologies: ['Python', 'PyTorch'],
                    image: 'assets/projects/semeval-narrative.svg',
                    tags: ['Research'],
                    order: state.projects.length + 1,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Project List */}
            <div className="space-y-3">
              {state.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-lab-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1 text-slate-500">
                      <button
                        onClick={() => moveProject(idx, 'up')}
                        disabled={idx === 0}
                        className="hover:text-cyan-400 disabled:opacity-20"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveProject(idx, 'down')}
                        disabled={idx === state.projects.length - 1}
                        className="hover:text-cyan-400 disabled:opacity-20"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="w-6 text-center text-xs font-mono text-slate-500">
                      {idx + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/30">
                            Featured
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {proj.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        contentService.saveProject({
                          ...proj,
                          featured: !proj.featured,
                        });
                        notify(`Toggled featured status for ${proj.title}`);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-mono border ${
                        proj.featured
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {proj.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => setEditingProject({ ...proj })}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          contentService.deleteProject(proj.id);
                          notify(`Deleted project ${proj.title}`);
                        }
                      }}
                      className="p-1.5 rounded bg-slate-800 hover:bg-red-900/80 text-slate-300 hover:text-red-300 border border-slate-700"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-lab-border rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-lab-border">
                    <h3 className="text-lg font-bold text-white">
                      {editingProject.id ? 'Edit Project' : 'Add Project'}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-slate-400 hover:text-white text-xs font-mono"
                    >
                      Close (ESC)
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Project Title:</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Slug (URL):</label>
                      <input
                        type="text"
                        value={editingProject.slug}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, slug: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Category:</label>
                      <input
                        type="text"
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Year:</label>
                      <input
                        type="text"
                        value={editingProject.year}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, year: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Image Asset Path:</label>
                      <input
                        type="text"
                        value={editingProject.image}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, image: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Short Description:</label>
                      <textarea
                        rows={2}
                        value={editingProject.shortDescription}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, shortDescription: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Detailed Description:</label>
                      <textarea
                        rows={3}
                        value={editingProject.description}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, description: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Research Problem:</label>
                      <textarea
                        rows={2}
                        value={editingProject.problem}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, problem: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Methodological Approach:</label>
                      <textarea
                        rows={2}
                        value={editingProject.approach}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, approach: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Computational Architecture:</label>
                      <input
                        type="text"
                        value={editingProject.architecture}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, architecture: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Technologies (comma separated):</label>
                      <input
                        type="text"
                        value={editingProject.technologies.join(', ')}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">GitHub URL (optional):</label>
                      <input
                        type="text"
                        value={editingProject.githubUrl || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, githubUrl: e.target.value })
                        }
                        placeholder="https://github.com/..."
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Result / Achievement:</label>
                      <input
                        type="text"
                        value={editingProject.resultOrAchievement || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, resultOrAchievement: e.target.value })
                        }
                        placeholder="e.g. Secured 3rd rank in SemEval"
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-lab-border">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        contentService.saveProject(editingProject);
                        setEditingProject(null);
                        notify(`Saved project ${editingProject.title}`);
                      }}
                      className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Project</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Publications Manager</h2>
                <p className="text-xs text-slate-400">
                  Update conference submissions, DOIs, PDF links, and BibTeX citations.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingPublication({
                    id: `pub-${Date.now()}`,
                    title: 'New Research Paper',
                    venue: 'Conference / Workshop',
                    year: '2026',
                    abstract: '',
                    authors: ['Prakhar Joshi'],
                    tags: ['Research'],
                    bibtex: '',
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-bold text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Publication</span>
              </button>
            </div>

            <div className="space-y-3">
              {state.publications.map((pub, idx) => (
                <div
                  key={pub.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-lab-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1 text-slate-500">
                      <button
                        onClick={() => movePublication(idx, 'up')}
                        disabled={idx === 0}
                        className="hover:text-indigo-400 disabled:opacity-20"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => movePublication(idx, 'down')}
                        disabled={idx === state.publications.length - 1}
                        className="hover:text-indigo-400 disabled:opacity-20"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                          {pub.venue}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{pub.year}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{pub.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{pub.abstract}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setEditingPublication({ ...pub })}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 border border-slate-700"
                      title="Edit Paper"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete publication "${pub.title}"?`)) {
                          contentService.deletePublication(pub.id);
                          notify(`Deleted publication ${pub.title}`);
                        }
                      }}
                      className="p-1.5 rounded bg-slate-800 hover:bg-red-900/80 text-slate-300 hover:text-red-300 border border-slate-700"
                      title="Delete Paper"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Publication Edit Modal */}
            {editingPublication && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-lab-border rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs font-mono">
                  <div className="flex items-center justify-between pb-3 border-b border-lab-border">
                    <h3 className="text-lg font-bold text-white">Edit Publication</h3>
                    <button
                      onClick={() => setEditingPublication(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Title:</label>
                      <input
                        type="text"
                        value={editingPublication.title}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, title: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Venue:</label>
                        <input
                          type="text"
                          value={editingPublication.venue}
                          onChange={(e) =>
                            setEditingPublication({ ...editingPublication, venue: e.target.value })
                          }
                          className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Year:</label>
                        <input
                          type="text"
                          value={editingPublication.year}
                          onChange={(e) =>
                            setEditingPublication({ ...editingPublication, year: e.target.value })
                          }
                          className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Abstract:</label>
                      <textarea
                        rows={3}
                        value={editingPublication.abstract}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, abstract: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">DOI URL (Optional):</label>
                        <input
                          type="text"
                          value={editingPublication.doiUrl || ''}
                          onChange={(e) =>
                            setEditingPublication({ ...editingPublication, doiUrl: e.target.value })
                          }
                          placeholder="https://doi.org/..."
                          className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">PDF URL (Optional):</label>
                        <input
                          type="text"
                          value={editingPublication.pdfUrl || ''}
                          onChange={(e) =>
                            setEditingPublication({ ...editingPublication, pdfUrl: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">BibTeX Citation:</label>
                      <textarea
                        rows={4}
                        value={editingPublication.bibtex || ''}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, bibtex: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-lab-border">
                    <button
                      onClick={() => setEditingPublication(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        contentService.savePublication(editingPublication);
                        setEditingPublication(null);
                        notify(`Saved publication ${editingPublication.title}`);
                      }}
                      className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                    >
                      Save Publication
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE & SOCIALS */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white">Profile &amp; Identity</h2>
              <p className="text-xs text-slate-400">
                Update your positioning statement, verified links, and Google Scholar profile URL.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                contentService.updateProfile(state.profile);
                notify('Profile information saved');
              }}
              className="p-6 rounded-2xl bg-slate-900/80 border border-lab-border space-y-4 text-xs font-mono"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={state.profile.name}
                    onChange={(e) =>
                      setState({ ...state, profile: { ...state.profile, name: e.target.value } })
                    }
                    className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Professional Title:</label>
                  <input
                    type="text"
                    value={state.profile.title}
                    onChange={(e) =>
                      setState({ ...state, profile: { ...state.profile, title: e.target.value } })
                    }
                    className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Core Positioning Tagline:</label>
                <input
                  type="text"
                  value={state.profile.tagline}
                  onChange={(e) =>
                    setState({ ...state, profile: { ...state.profile, tagline: e.target.value } })
                  }
                  className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Short Bio (Hero):</label>
                <textarea
                  rows={2}
                  value={state.profile.shortBio}
                  onChange={(e) =>
                    setState({ ...state, profile: { ...state.profile, shortBio: e.target.value } })
                  }
                  className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Full Bio (About):</label>
                <textarea
                  rows={4}
                  value={state.profile.fullBio}
                  onChange={(e) =>
                    setState({ ...state, profile: { ...state.profile, fullBio: e.target.value } })
                  }
                  className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Email:</label>
                  <input
                    type="email"
                    value={state.profile.email}
                    onChange={(e) =>
                      setState({ ...state, profile: { ...state.profile, email: e.target.value } })
                    }
                    className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Location:</label>
                  <input
                    type="text"
                    value={state.profile.location}
                    onChange={(e) =>
                      setState({ ...state, profile: { ...state.profile, location: e.target.value } })
                    }
                    className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">LinkedIn Profile URL:</label>
                  <input
                    type="text"
                    value={state.profile.linkedin}
                    onChange={(e) =>
                      setState({ ...state, profile: { ...state.profile, linkedin: e.target.value } })
                    }
                    className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">GitHub Profile URL:</label>
                  <input
                    type="text"
                    value={state.profile.github}
                    onChange={(e) =>
                      setState({ ...state, profile: { ...state.profile, github: e.target.value } })
                    }
                    className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                  />
                </div>
              </div>

              {/* Google Scholar URL Configurable Field */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
                <label className="block text-indigo-300 font-bold mb-1">
                  Google Scholar Profile URL (Configurable Field):
                </label>
                <input
                  type="text"
                  value={state.profile.googleScholar || ''}
                  onChange={(e) =>
                    setState({
                      ...state,
                      profile: { ...state.profile, googleScholar: e.target.value },
                    })
                  }
                  placeholder="Paste your actual Google Scholar URL here (e.g. https://scholar.google.com/citations?user=...)"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-indigo-500/50 text-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  When populated, this URL will activate the Google Scholar links across your Navbar, Hero, and Footer.
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 10: GIT SYNC & EXPORT */}
        {activeTab === 'git-sync' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                Git-Based Synchronization &amp; Deployment Engine
              </h2>
              <p className="text-xs text-slate-400">
                Directly push CMS changes to GitHub Pages or download modified JSON files for local version control.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Option A: Direct Commit via GitHub API */}
              <div className="lg:col-span-7 p-7 rounded-2xl bg-slate-900/80 border border-lab-border space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                  <GitBranch className="w-4 h-4" />
                  <span>DIRECT GITHUB REPOSITORY COMMIT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter your GitHub Personal Access Token (PAT) to commit the updated content directly to branch <code>main</code> on <code>prakharxai/prakharxai.github.io</code>. This triggers GitHub Actions to build and deploy immediately.
                </p>

                <form onSubmit={handleGitCommit} className="space-y-3 text-xs font-mono">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Owner:</label>
                      <input
                        type="text"
                        value={ghOwner}
                        onChange={(e) => setGhOwner(e.target.value)}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Repository:</label>
                      <input
                        type="text"
                        value={ghRepo}
                        onChange={(e) => setGhRepo(e.target.value)}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Branch:</label>
                      <input
                        type="text"
                        value={ghBranch}
                        onChange={(e) => setGhBranch(e.target.value)}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Commit Message:</label>
                    <input
                      type="text"
                      value={ghCommitMsg}
                      onChange={(e) => setGhCommitMsg(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">
                      GitHub Personal Access Token (PAT):
                    </label>
                    <input
                      type="password"
                      value={ghToken}
                      onChange={(e) => setGhToken(e.target.value)}
                      placeholder="ghp_************************************"
                      className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Token is held in volatile component memory only and NEVER stored to disk or committed to git.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isCommitting}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50"
                  >
                    {isCommitting ? (
                      <span>Pushing commits to GitHub...</span>
                    ) : (
                      <>
                        <GitBranch className="w-4 h-4" />
                        <span>Commit &amp; Trigger Deployment</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Option B: Download JSON Files */}
              <div className="lg:col-span-5 p-7 rounded-2xl bg-slate-900/80 border border-lab-border space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD STRUCTURED JSON FILES</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Download any edited dataset as standard JSON to drop into <code>/src/content/</code>:
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {(
                    [
                      'profile',
                      'projects',
                      'publications',
                      'experience',
                      'education',
                      'skills',
                      'achievements',
                      'certifications',
                      'domains',
                      'settings',
                    ] as (keyof ContentState)[]
                  ).map((key) => (
                    <button
                      key={key}
                      onClick={() => downloadJson(key)}
                      className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-left flex items-center justify-between"
                    >
                      <span className="capitalize">{key}.json</span>
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EXPERIENCE, EDUCATION, SKILLS, ACHIEVEMENTS, SETTINGS fallbacks */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white">Appointments &amp; Experience</h2>
            <div className="space-y-3">
              {state.experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-900/80 border border-lab-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-cyan-400">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{exp.organization} · {exp.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white">Education Entries</h2>
            <div className="space-y-3">
              {state.education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-slate-900/80 border border-lab-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                    <span className="text-xs font-mono text-cyan-400">{edu.startYear} – {edu.endYear}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{edu.institution} · {edu.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white">Technical Skills Groups</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state.skills.map((grp) => (
                <div key={grp.id} className="p-4 rounded-xl bg-slate-900/80 border border-lab-border">
                  <h3 className="text-sm font-bold text-white mb-2">{grp.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white">Honors &amp; Recognitions</h2>
            <div className="space-y-3">
              {state.achievements.map((ach) => (
                <div key={ach.id} className="p-4 rounded-xl bg-slate-900/80 border border-lab-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                    <span className="text-xs font-mono text-emerald-400">{ach.year}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-4 text-xs font-mono">
            <h2 className="text-xl font-display font-bold text-white">SEO &amp; Site Settings</h2>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-lab-border space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">Site Title Tag:</label>
                <input
                  type="text"
                  value={state.settings.siteTitle}
                  onChange={(e) =>
                    setState({
                      ...state,
                      settings: { ...state.settings, siteTitle: e.target.value },
                    })
                  }
                  className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Meta Description:</label>
                <textarea
                  rows={3}
                  value={state.settings.metaDescription}
                  onChange={(e) =>
                    setState({
                      ...state,
                      settings: { ...state.settings, metaDescription: e.target.value },
                    })
                  }
                  className="w-full p-2 rounded-lg bg-slate-950 border border-lab-border text-white"
                />
              </div>
              <button
                onClick={() => {
                  contentService.updateSettings(state.settings);
                  notify('Settings saved');
                }}
                className="px-5 py-2 rounded-lg bg-cyan-600 text-white font-bold"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
