import defaultProfile from '../content/profile.json';
import defaultDomains from '../content/domains.json';
import defaultProjects from '../content/projects.json';
import defaultPublications from '../content/publications.json';
import defaultExperience from '../content/experience.json';
import defaultEducation from '../content/education.json';
import defaultSkills from '../content/skills.json';
import defaultAchievements from '../content/achievements.json';
import defaultCertifications from '../content/certifications.json';
import defaultSettings from '../content/settings.json';

import {
  Profile,
  ResearchDomain,
  Project,
  Publication,
  Experience,
  Education,
  SkillCategory,
  Achievement,
  Certification,
  SiteSettings,
} from '../types/content';

export interface ContentState {
  profile: Profile;
  domains: ResearchDomain[];
  projects: Project[];
  publications: Publication[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  achievements: Achievement[];
  certifications: Certification[];
  settings: SiteSettings;
}

const STORAGE_SESSION_KEY = 'prakhar_portfolio_session_content';

class ContentService {
  private state: ContentState;
  private listeners: (() => void)[] = [];

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): ContentState {
    const saved = sessionStorage.getItem(STORAGE_SESSION_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse session content', e);
      }
    }
    return {
      profile: defaultProfile as Profile,
      domains: defaultDomains as ResearchDomain[],
      projects: defaultProjects as Project[],
      publications: defaultPublications as Publication[],
      experience: defaultExperience as Experience[],
      education: defaultEducation as Education[],
      skills: defaultSkills as SkillCategory[],
      achievements: defaultAchievements as Achievement[],
      certifications: defaultCertifications as Certification[],
      settings: defaultSettings as SiteSettings,
    };
  }

  public getState(): ContentState {
    return this.state;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    try {
      sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Session storage write warning', e);
    }
    this.listeners.forEach((l) => l());
  }

  // Getters
  public getProfile(): Profile {
    return this.state.profile;
  }

  public getDomains(): ResearchDomain[] {
    return this.state.domains;
  }

  public getProjects(): Project[] {
    return [...this.state.projects].sort((a, b) => a.order - b.order);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.state.projects.find((p) => p.slug === slug);
  }

  public getFeaturedProjects(): Project[] {
    return this.getProjects().filter((p) => p.featured);
  }

  public getPublications(): Publication[] {
    return this.state.publications;
  }

  public getExperience(): Experience[] {
    return this.state.experience;
  }

  public getEducation(): Education[] {
    return this.state.education;
  }

  public getSkills(): SkillCategory[] {
    return this.state.skills;
  }

  public getAchievements(): Achievement[] {
    return this.state.achievements;
  }

  public getCertifications(): Certification[] {
    return this.state.certifications;
  }

  public getSettings(): SiteSettings {
    return this.state.settings;
  }

  // Setters / CMS mutators
  public updateProfile(profile: Profile) {
    this.state.profile = profile;
    this.notify();
  }

  public updateSettings(settings: SiteSettings) {
    this.state.settings = settings;
    this.notify();
  }

  // Projects CRUD
  public saveProject(project: Project) {
    const idx = this.state.projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      this.state.projects[idx] = project;
    } else {
      this.state.projects.push(project);
    }
    this.notify();
  }

  public deleteProject(id: string) {
    this.state.projects = this.state.projects.filter((p) => p.id !== id);
    this.notify();
  }

  public reorderProjects(newOrderIds: string[]) {
    this.state.projects = this.state.projects.map((proj) => {
      const idx = newOrderIds.indexOf(proj.id);
      return idx >= 0 ? { ...proj, order: idx + 1 } : proj;
    });
    this.notify();
  }

  // Publications CRUD
  public savePublication(pub: Publication) {
    const idx = this.state.publications.findIndex((p) => p.id === pub.id);
    if (idx >= 0) {
      this.state.publications[idx] = pub;
    } else {
      this.state.publications.push(pub);
    }
    this.notify();
  }

  public deletePublication(id: string) {
    this.state.publications = this.state.publications.filter((p) => p.id !== id);
    this.notify();
  }

  // Experience CRUD
  public saveExperience(exp: Experience) {
    const idx = this.state.experience.findIndex((e) => e.id === exp.id);
    if (idx >= 0) {
      this.state.experience[idx] = exp;
    } else {
      this.state.experience.push(exp);
    }
    this.notify();
  }

  public deleteExperience(id: string) {
    this.state.experience = this.state.experience.filter((e) => e.id !== id);
    this.notify();
  }

  // Education CRUD
  public saveEducation(edu: Education) {
    const idx = this.state.education.findIndex((e) => e.id === edu.id);
    if (idx >= 0) {
      this.state.education[idx] = edu;
    } else {
      this.state.education.push(edu);
    }
    this.notify();
  }

  public deleteEducation(id: string) {
    this.state.education = this.state.education.filter((e) => e.id !== id);
    this.notify();
  }

  // Skills CRUD
  public saveSkillCategory(cat: SkillCategory) {
    const idx = this.state.skills.findIndex((s) => s.id === cat.id);
    if (idx >= 0) {
      this.state.skills[idx] = cat;
    } else {
      this.state.skills.push(cat);
    }
    this.notify();
  }

  public deleteSkillCategory(id: string) {
    this.state.skills = this.state.skills.filter((s) => s.id !== id);
    this.notify();
  }

  // Achievements CRUD
  public saveAchievement(ach: Achievement) {
    const idx = this.state.achievements.findIndex((a) => a.id === ach.id);
    if (idx >= 0) {
      this.state.achievements[idx] = ach;
    } else {
      this.state.achievements.push(ach);
    }
    this.notify();
  }

  public deleteAchievement(id: string) {
    this.state.achievements = this.state.achievements.filter((a) => a.id !== id);
    this.notify();
  }

  // Certifications CRUD
  public saveCertification(cert: Certification) {
    const idx = this.state.certifications.findIndex((c) => c.id === cert.id);
    if (idx >= 0) {
      this.state.certifications[idx] = cert;
    } else {
      this.state.certifications.push(cert);
    }
    this.notify();
  }

  public deleteCertification(id: string) {
    this.state.certifications = this.state.certifications.filter((c) => c.id !== id);
    this.notify();
  }

  // Reset to original repository content
  public resetToDefaults() {
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    this.state = {
      profile: defaultProfile as Profile,
      domains: defaultDomains as ResearchDomain[],
      projects: defaultProjects as Project[],
      publications: defaultPublications as Publication[],
      experience: defaultExperience as Experience[],
      education: defaultEducation as Education[],
      skills: defaultSkills as SkillCategory[],
      achievements: defaultAchievements as Achievement[],
      certifications: defaultCertifications as Certification[],
      settings: defaultSettings as SiteSettings,
    };
    this.notify();
  }

  // Export collection as JSON string
  public exportCollectionJson(key: keyof ContentState): string {
    return JSON.stringify(this.state[key], null, 2);
  }

  // Direct GitHub API Commit helper
  public async commitToGitHub(options: {
    owner: string;
    repo: string;
    branch: string;
    token: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const { owner, repo, branch, token, message } = options;
    const collections: (keyof ContentState)[] = [
      'profile',
      'domains',
      'projects',
      'publications',
      'experience',
      'education',
      'skills',
      'achievements',
      'certifications',
      'settings',
    ];

    try {
      for (const col of collections) {
        const filePath = `src/content/${col}.json`;
        const contentStr = JSON.stringify(this.state[col], null, 2);
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

        // Get file SHA if it exists
        let sha: string | undefined;
        const getRes = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
          },
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }

        // Base64 encode UTF-8 content
        const encodedContent = btoa(unescape(encodeURIComponent(contentStr)));

        const putRes = await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `${message} (${col}.json)`,
            content: encodedContent,
            sha,
            branch,
          }),
        });

        if (!putRes.ok) {
          const errData = await putRes.json().catch(() => ({}));
          throw new Error(`Failed to commit ${filePath}: ${errData.message || putRes.statusText}`);
        }
      }

      return { success: true, message: 'All content files successfully committed to GitHub repository!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Unknown error occurred while pushing to GitHub' };
    }
  }
}

export const contentService = new ContentService();
