import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { contentService } from './services/contentService';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '');
  const [settings, setSettings] = useState(contentService.getSettings());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '');
    };

    window.addEventListener('hashchange', handleHashChange);
    const unsub = contentService.subscribe(() => {
      setSettings(contentService.getSettings());
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      unsub();
    };
  }, []);

  // Sync title with settings
  useEffect(() => {
    if (currentHash.startsWith('#/admin')) {
      document.title = 'CMS Admin Console | Prakhar Joshi Portfolio';
    } else if (currentHash.startsWith('#/projects/')) {
      const slug = currentHash.replace('#/projects/', '');
      const project = contentService.getProjectBySlug(slug);
      document.title = project
        ? `${project.title} | Prakhar Joshi AI Research`
        : 'Project | Prakhar Joshi';
    } else {
      document.title = settings.siteTitle;
    }
  }, [currentHash, settings]);

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentHash('');
  };

  // Route 1: Admin Console
  if (currentHash.startsWith('#/admin')) {
    return <AdminDashboard onExitAdmin={navigateToHome} />;
  }

  // Route 2: Project Detail View
  if (currentHash.startsWith('#/projects/')) {
    const slug = currentHash.replace('#/projects/', '').split('?')[0];
    return (
      <div className="min-h-screen flex flex-col bg-lab-bg text-slate-100">
        <Navbar />
        <main className="flex-1">
          <ProjectDetailPage slug={slug} onNavigateHome={navigateToHome} />
        </main>
        <Footer />
      </div>
    );
  }

  // Route 3: Main Academic Portfolio Home
  return (
    <div className="min-h-screen flex flex-col bg-lab-bg text-slate-100 selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
