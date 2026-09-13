import React from 'react';
import { Hero } from '../components/home/Hero';
import { ResearchAtAGlance } from '../components/home/ResearchAtAGlance';
import { InteractiveResearchVisual } from '../components/home/InteractiveResearchVisual';
import { ResearchPipeline } from '../components/home/ResearchPipeline';
import { ResearchDomains } from '../components/home/ResearchDomains';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { PublicationsSection } from '../components/home/PublicationsSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { SkillsEcosystem } from '../components/home/SkillsEcosystem';
import { AchievementsSection } from '../components/home/AchievementsSection';
import { EducationSection } from '../components/home/EducationSection';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <ResearchAtAGlance />
      <InteractiveResearchVisual />
      <ResearchPipeline />
      <ResearchDomains />
      <FeaturedProjects />
      <PublicationsSection />
      <ExperienceSection />
      <SkillsEcosystem />
      <AchievementsSection />
      <EducationSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};
