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
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';

export const Hero: React.FC = () => {
  const [profile, setProfile] = useState(contentService.getProfile());
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
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
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
      { text: 'RAG Citations', color: '#06b6d4', type: 'embedding' },
      { text: 'Hospital OCR', color: '#14b8a6', type: 'ocr' },
      { text: 'COLING 2025', color: '#8b5cf6', type: 'model' },
      { text: 'Knowledge Graph', color: '#ec4899', type: 'graph' },
      { text: 'GhostFaceNet', color: '#38bdf8', type: 'embedding' },
      { text: 'Surya OCR', color: '#f59e0b', type: 'ocr' },
      { text: 'YOLOv8 Streamlit', color: '#ef4444', type: 'model' },
      { text: 'NOUGAT Math', color: '#0ea5e9', type: 'ocr' },
    ];

    const nodes: Node[] = labels.map((l, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const dist = 110 + (i % 3) * 35;
      return {
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
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
      color: '#06b6d4',
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
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const step = 40;
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

      // Draw orbital guides around center
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 110, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 180, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update and connect nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Keep within reasonable boundaries around center
        const dx = node.x - centerNode.x;
        const dy = node.y - centerNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 210 || dist < 60) {
          node.vx *= -1;
          node.vy *= -1;
        }

        // Draw connection to center hub
        const pulse = (Math.sin(frame * 0.03 + i) + 1) / 2;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 + pulse * 0.25})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        // Cross-connect neighboring nodes
        const nextNode = nodes[(i + 1) % nodes.length];
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.stroke();

        // Interactive mouse tension
        if (isHovering) {
          const mdx = mouseX - node.x;
          const mdy = mouseY - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100) {
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        }

        // Draw node entity
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node halo
        ctx.strokeStyle = `${node.color}55`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 4 + pulse * 2, 0, Math.PI * 2);
        ctx.stroke();

        // Text tag
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#e2e8f0';
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
        30
      );
      grad.addColorStop(0, '#06b6d4');
      grad.addColorStop(1, '#090d16');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.radius + centerPulse * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.radius + 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(centerNode.label, centerNode.x, centerNode.y + 32);

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
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Academic Persona & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>Junior Research Fellow · SRHU Dehradun</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                {profile.name}
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                {profile.title}
              </p>
            </div>

            {/* Core Domain Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-lab-border flex items-center gap-1.5">
                <ScanLine className="w-3.5 h-3.5 text-cyan-400" />
                Computer Vision
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-lab-border flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                NLP
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-lab-border flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-teal-400" />
                OCR &amp; Doc Intelligence
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-lab-border flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                RAG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-lab-border flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
                Deep Learning
              </span>
            </div>

            {/* Strict Resume-grounded Intro */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              "{profile.shortBio}"
            </p>

            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl border-l-2 border-cyan-500/60 pl-3">
              {profile.tagline}
            </p>

            {/* Prominent Action CTAs */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#research-domains"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Explore Research</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-lab-border hover:border-slate-500 active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>View Projects</span>
              </a>
              <a
                href="#publications"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-lab-border hover:border-slate-500 active:scale-95 transition-all"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Publications</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-lab-border hover:text-white transition-all"
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
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
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
                  className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
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
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Research Network Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[500px] rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-lab-border p-2 shadow-2xl shadow-cyan-950/30 overflow-hidden">
              {/* Corner tech indicators */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400/80 flex items-center gap-1.5 z-20">
                <Network className="w-3.5 h-3.5" />
                <span>DYNAMIC_RESEARCH_GRAPH</span>
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400/70 z-20">
                LIVE_TOPOLOGY
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400/70 z-20">
                INTERACTIVE · HOVER NODES
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-400/80 z-20">
                SEMEVAL #3 · COLING '25
              </div>

              {/* Dynamic HTML5 Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
