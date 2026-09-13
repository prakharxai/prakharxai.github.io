import React, { useState } from 'react';
import { contentService } from '../../services/contentService';
import {
  Network,
  ArrowRight,
  Eye,
  MessageSquareText,
  FileText,
  Layers,
  Languages,
  HeartPulse,
  Cpu,
  Sparkles,
} from 'lucide-react';

export const InteractiveResearchVisual: React.FC = () => {
  const domains = contentService.getDomains();
  const allProjects = contentService.getProjects();
  const [selectedDomainId, setSelectedDomainId] = useState<string>(domains[0]?.id || 'computer-vision');

  const selectedDomain = domains.find((d) => d.id === selectedDomainId) || domains[0];
  const relatedProjects = allProjects.filter((p) =>
    selectedDomain.relatedProjectIds.includes(p.id)
  );

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  // Node coordinate positions around center circle (300, 300) with radius 200
  const center = { x: 250, y: 250 };
  const radius = 175;

  return (
    <section id="interactive-network" className="relative py-20 bg-lab-bg-secondary border-b border-lab-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>SIGNATURE INTERACTIVE VISUALIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            The Research Topology
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Explore the connected domains of Prakhar Joshi's AI research lab. Click any node to reveal linked techniques, methodologies, and deployed implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Node Graph (Left/Center) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <svg viewBox="0 0 500 500" className="w-full h-full select-none">
                <defs>
                  <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#0e7490" stop-opacity="0.3" />
                  </radialGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Concentric Guide Circles */}
                <circle cx={center.x} cy={center.y} r={radius} stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4 4" fill="none" />
                <circle cx={center.x} cy={center.y} r={radius * 0.55} stroke="#1e293b" stroke-width="1" stroke-dasharray="2 4" fill="none" opacity="0.4" />

                {/* Connection Lines from Center to each Domain */}
                {domains.map((domain, index) => {
                  const angle = (index / domains.length) * Math.PI * 2 - Math.PI / 2;
                  const x = center.x + Math.cos(angle) * radius;
                  const y = center.y + Math.sin(angle) * radius;
                  const isSelected = domain.id === selectedDomainId;

                  return (
                    <g key={`edge-${domain.id}`}>
                      <line
                        x1={center.x}
                        y1={center.y}
                        x2={x}
                        y2={y}
                        stroke={isSelected ? '#06b6d4' : '#334155'}
                        strokeWidth={isSelected ? '2.5' : '1.2'}
                        strokeDasharray={isSelected ? 'none' : '3 3'}
                        className="transition-all duration-300"
                      />
                      {isSelected && (
                        <circle cx={(center.x + x) / 2} cy={(center.y + y) / 2} r="3" fill="#22d3ee" filter="url(#glow)">
                          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Central Hub Node: PRAKHAR JOSHI */}
                <g className="cursor-pointer" onClick={() => setSelectedDomainId(domains[0].id)}>
                  <circle cx={center.x} cy={center.y} r="48" fill="#0b1320" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx={center.x} cy={center.y} r="56" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
                  </circle>
                  <text x={center.x} y={center.y - 6} textAnchor="middle" fill="#ffffff" fontFamily="sans-serif" fontSize="11" fontWeight="bold" letterSpacing="0.05em">
                    PRAKHAR
                  </text>
                  <text x={center.x} y={center.y + 10} textAnchor="middle" fill="#38bdf8" fontFamily="sans-serif" fontSize="10" fontWeight="bold">
                    JOSHI
                  </text>
                  <text x={center.x} y={center.y + 24} textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="8">
                    AI RESEARCH
                  </text>
                </g>

                {/* Radial Domain Nodes */}
                {domains.map((domain, index) => {
                  const angle = (index / domains.length) * Math.PI * 2 - Math.PI / 2;
                  const x = center.x + Math.cos(angle) * radius;
                  const y = center.y + Math.sin(angle) * radius;
                  const isSelected = domain.id === selectedDomainId;

                  return (
                    <g
                      key={domain.id}
                      className="cursor-pointer transition-transform duration-200 hover:scale-110"
                      onClick={() => setSelectedDomainId(domain.id)}
                    >
                      {/* Outer pulse when selected */}
                      {isSelected && (
                        <circle cx={x} cy={y} r="28" fill="#06b6d4" opacity="0.2">
                          <animate attributeName="r" values="24;32;24" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      <circle
                        cx={x}
                        cy={y}
                        r="22"
                        fill={isSelected ? '#0e7490' : '#0f172a'}
                        stroke={isSelected ? '#22d3ee' : '#334155'}
                        strokeWidth={isSelected ? '2' : '1.5'}
                      />

                      {/* Number indicator */}
                      <text x={x} y={y + 4} textAnchor="middle" fill={isSelected ? '#ffffff' : '#94a3b8'} fontFamily="monospace" fontSize="10" fontWeight="bold">
                        {domain.number}
                      </text>

                      {/* Domain Name label */}
                      <text
                        x={x}
                        y={y + (y > center.y ? 36 : -28)}
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                        fontFamily="sans-serif"
                        fontSize="9"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {domain.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Domain Inspector Panel (Right) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-lab-border shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-lab-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    {getDomainIcon(selectedDomain.icon)}
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400">DOMAIN {selectedDomain.number}</div>
                    <h3 className="text-xl font-display font-bold text-white">{selectedDomain.name}</h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                {selectedDomain.shortDescription}
              </p>

              {/* Technologies */}
              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Technologies &amp; Methods:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDomain.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-cyan-300 border border-lab-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linked Projects */}
              <div className="mt-6 pt-5 border-t border-lab-border">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Linked Projects &amp; Deployments:
                </h4>
                <div className="space-y-3">
                  {relatedProjects.length > 0 ? (
                    relatedProjects.map((proj) => (
                      <a
                        key={proj.id}
                        href={`#/projects/${proj.slug}`}
                        className="p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-lab-border hover:border-cyan-500/50 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                            {proj.title}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {proj.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 transition-transform group-hover:translate-x-1 mt-0.5" />
                      </a>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">No linked projects found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
