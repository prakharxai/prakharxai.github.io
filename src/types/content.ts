export interface Profile {
  name: string;
  title: string;
  tagline: string;
  subTagline: string;
  shortBio: string;
  fullBio: string;
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
  googleScholar?: string;
  avatarUrl?: string;
}

export interface ResearchDomain {
  id: string;
  number: string;
  name: string;
  shortDescription: string;
  technologies: string[];
  icon: string;
  relatedProjectIds: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  category: string;
  featured: boolean;
  shortDescription: string;
  description: string;
  problem: string;
  approach: string;
  architecture: string;
  technologies: string[];
  image: string;
  gallery?: string[];
  githubUrl?: string;
  publicationUrl?: string;
  liveUrl?: string;
  relatedPublicationId?: string;
  tags: string[];
  order: number;
  resultOrAchievement?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  authors?: string[];
  pdfUrl?: string;
  doiUrl?: string;
  conferenceUrl?: string;
  googleScholarUrl?: string;
  tags: string[];
  bibtex?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  coursework?: string[];
  notes?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  organizationOrEvent: string;
  description: string;
  badge?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  contactEmail: string;
  ctaText: string;
}
