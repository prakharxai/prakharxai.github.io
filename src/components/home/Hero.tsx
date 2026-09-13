import React, { useState, useEffect, useRef } from 'react';
import { contentService } from '../../services/contentService';
import {
  ArrowRight,
  FileCode,
  BookOpen,
  Mail,
  GraduationCap,
  Sparkles,
  Layers,
  Network,
  Cpu,
  ScanLine,
  User,
  Award,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';

export const Hero: React.FC = () => {
  const [profile, setProfile] = useState(contentService.getProfile());
  const [activeHeroView, setActiveHeroView] = useState<'portrait' | 'network'>('portrait');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setProfile(contentService.getProfile());
    });
    return () => unsub();
  }, []);

  // Interactive Neural & Research Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Nodes representing research entities
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label: string;
      color: string;
      type: 'hub' | 'embedding' | 'ocr' | 'graph' | 'model';
    }

    const labels = [
      { text: 'SemEval #3', color: '#10b981', type: 'model' },
      { text: 'RAG Citations', color: '#3b82f6', type: 'embedding' },
      { text: 'Hospital OCR', color: '#38bdf8', type: 'ocr' },
      { text: 'COLING 2025', color: '#8b5cf6', type: 'model' },
      { text: 'Knowledge Graph', color: '#a855f7', type: 'graph' },
      { text: 'GhostFaceNet', color: '#60a5fa', type: 'embedding' },
      { text: 'Surya OCR', color: '#f59e0b', type: 'ocr' },
      { text: 'YOLOv8 Streamlit', color: '#ef4444', type: 'model' },
      { text: 'NOUGAT Math', color: '#38bdf8', type: 'ocr' },
    ];

    const nodes: Node[] = labels.map((l, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const dist = 115 + (i % 3) * 35;
      return {
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 6,
        label: l.text,
        color: l.color,
        type: l.type as any,
      };
    });

    // Central Lab Node
    const centerNode: Node = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      radius: 14,
      label: 'PRAKHAR AI LAB',
      color: '#3b82f6',
      type: 'hub',
    };

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };
    const onMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const step = 45;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Orbital Guides
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 115, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 185, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update and connect nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        const dx = node.x - centerNode.x;
        const dy = node.y - centerNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 210 || dist < 65) {
          node.vx *= -1;
          node.vy *= -1;
        }

        const pulse = (Math.sin(frame * 0.03 + i) + 1) / 2;
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 + pulse * 0.2})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        const nextNode = nodes[(i + 1) % nodes.length];
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.stroke();

        if (isHovering) {
          const mdx = mouseX - node.x;
          const mdy = mouseY - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 110) {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `${node.color}55`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 4 + pulse * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#cbd5e1';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 12);
      });

      // Draw Center Hub
      const centerPulse = (Math.sin(frame * 0.04) + 1) / 2;
      const grad = ctx.createRadialGradient(
        centerNode.x,
        centerNode.y,
        0,
        centerNode.x,
        centerNode.y,
        32
      );
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(1, '#050811');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.radius + centerPulse * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.radius + 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(centerNode.label, centerNode.x, centerNode.y + 34);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden bg-radial-hero">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Academic Persona & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-mono backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span>Junior Research Fellow · SRHU Dehradun</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                {profile.name}
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                {profile.title}
              </p>
            </div>

            {/* Core Domain Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-lab-border flex items-center gap-1.5">
                <ScanLine className="w-3.5 h-3.5 text-blue-400" />
                Computer Vision
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-lab-border flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                NLP
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-lab-border flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-sky-400" />
                OCR &amp; Doc Intelligence
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-lab-border flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                RAG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-lab-border flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Deep Learning
              </span>
            </div>

            {/* Strict Resume-grounded Intro */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              "{profile.shortBio}"
            </p>

            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl border-l-2 border-blue-500/60 pl-3">
              {profile.tagline}
            </p>

            {/* Prominent Action CTAs */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#research-domains"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Explore Research</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-lab-border hover:border-slate-500 active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>View Projects</span>
              </a>
              <a
                href="#publications"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-lab-border hover:border-slate-500 active:scale-95 transition-all"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Publications</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-950/90 hover:bg-slate-800 text-slate-300 border border-lab-border hover:text-white transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Academic Profiles & Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              {profile.googleScholar ? (
                <a
                  href={profile.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Google Scholar</span>
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 text-slate-500"
                  title="Google Scholar URL can be configured in CMS"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>Google Scholar (Configurable)</span>
                </span>
              )}
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Container (Profile Card & Interactive Topology) */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            {/* View Switcher Controls */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-lab-border mb-4 backdrop-blur-md shadow-lg z-20">
              <button
                onClick={() => setActiveHeroView('portrait')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeHeroView === 'portrait'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Researcher Profile</span>
              </button>
              <button
                onClick={() => setActiveHeroView('network')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeHeroView === 'network'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Interactive Topology</span>
              </button>
            </div>

            {/* View 1: Clean, Unobstructed Researcher Profile Card (Zero Overlap) */}
            <div className={`w-full max-w-[400px] transition-all duration-300 ${activeHeroView === 'portrait' ? 'block' : 'hidden'}`}>
              <div className="rounded-3xl bg-slate-900/90 border border-lab-border p-6 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl">
                {/* Photo Container: Pristine 3:4 Aspect Ratio, Clean Border, Zero Overlays */}
                <div className="relative mx-auto w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
                  <img
                    src="assets/prakhar-joshi.jpg"
                    alt="Prakhar Joshi — AI Researcher"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Structured Metadata Below the Photo (NO OVERLAP) */}
                <div className="mt-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-display font-bold text-white tracking-tight">
                        Prakhar Joshi
                      </h2>
                      <p className="text-xs font-mono text-blue-400">
                        Junior Research Fellow (JRF)
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Swami Rama Himalayan University · Dehradun
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      AI RESEARCH
                    </span>
                  </div>

                  {/* Verified Academic Badges (Cleanly Positioned Below) */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-center">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Global Benchmark</div>
                      <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>SemEval '26 #3</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-center">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Peer-Reviewed</div>
                      <div className="text-xs font-mono font-bold text-blue-300 mt-0.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                        <span>COLING 2025</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Specialization */}
                  <div className="pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span className="text-slate-500">Degree:</span>
                    <span className="text-slate-200">MCA (Data Science)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View 2: Full-Box Interactive Research Topology Canvas */}
            <div className={`w-full max-w-[460px] aspect-square transition-all duration-300 ${activeHeroView === 'network' ? 'block' : 'hidden'}`}>
              <div className="relative w-full h-full rounded-3xl bg-slate-900/90 border border-lab-border p-4 shadow-2xl shadow-indigo-950/40 overflow-hidden group">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair relative z-20"
                />
                <div className="absolute top-3 left-3 text-[10px] font-mono text-blue-400/90 flex items-center gap-1.5 z-20">
                  <Network className="w-3.5 h-3.5" />
                  <span>INTERACTIVE_RESEARCH_GRAPH</span>
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400/80 z-20">
                  CLICK &amp; HOVER NODES
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
