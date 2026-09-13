import React, { useState } from 'react';
import {
  HelpCircle,
  Database,
  Filter,
  Cpu,
  FlaskConical,
  CheckCircle2,
  SlidersHorizontal,
  Rocket,
  Globe2,
  ArrowRight,
} from 'lucide-react';

interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  icon: any;
  description: string;
  exampleProject: string;
  exampleDetails: string;
}

export const ResearchPipeline: React.FC = () => {
  const steps: PipelineStep[] = [
    {
      id: 'question',
      stepNumber: '01',
      title: 'Research Question',
      icon: HelpCircle,
      description: 'Formulating rigorous academic hypotheses at the boundaries of CV, NLP, and document intelligence.',
      exampleProject: 'SemEval 2026 Task 4 & Grounded Citation RAG',
      exampleDetails: 'Can transformer embeddings be ensembled with structured LLM prompting to discern multi-character narrative similarity and eliminate hallucinated assertions?',
    },
    {
      id: 'data',
      stepNumber: '02',
      title: 'Data Collection & Curation',
      icon: Database,
      description: 'Curating domain-specific corpora, video surveillance frames, and archival manuscript scans.',
      exampleProject: 'Mass Attendance System & Historical Books',
      exampleDetails: 'Video-based multi-angle facial capture and multi-century Sanskrit/Hindi archival text digitization.',
    },
    {
      id: 'preprocessing',
      stepNumber: '03',
      title: 'Preprocessing & Normalization',
      icon: Filter,
      description: 'Adaptive denoising, dewarping, layout segmentation, and script-aware Unicode normalization.',
      exampleProject: 'Hospital Document OCR & Surya Multilingual OCR',
      exampleDetails: 'Image contrast stretching, binarization on noisy doctor handwriting, and Devanagari conjunct orthography restoration.',
    },
    {
      id: 'model',
      stepNumber: '04',
      title: 'Model Architecture',
      icon: Cpu,
      description: 'Selecting and engineering deep backbones: Transformers, ResNet, GhostFaceNet, and YOLOv8.',
      exampleProject: 'COLING 2025 GenAI Detection & Face Recognition',
      exampleDetails: 'Fine-tuning RoBERTa and XLM-R cross-lingual models and GhostFaceNet lightweight embedding extractors.',
    },
    {
      id: 'experimentation',
      stepNumber: '05',
      title: 'Experimentation & Ablation',
      icon: FlaskConical,
      description: 'Iterative hypothesis testing, hyperparameter sweeps, and architectural ablation studies.',
      exampleProject: 'SemEval 2026 Narrative Similarity',
      exampleDetails: 'Testing complementarity-driven fusion of dense topological embeddings against generative few-shot prompts.',
    },
    {
      id: 'evaluation',
      stepNumber: '06',
      title: 'Rigorous Evaluation',
      icon: CheckCircle2,
      description: 'Validation on competitive shared-task benchmarks, F1 parameter optimization, and distance metrics.',
      exampleProject: 'COLING 2025 & Depth Estimation',
      exampleDetails: 'Achieving 3rd Rank in SemEval 2026 and improved F1 detection metrics across multi-lingual test distributions.',
    },
    {
      id: 'optimization',
      stepNumber: '07',
      title: 'Optimization & Alignment',
      icon: SlidersHorizontal,
      description: 'L2 embedding space normalization, latency reduction, and high-throughput inference tuning.',
      exampleProject: 'Mass Attendance & Monocular Depth',
      exampleDetails: 'Applying L2 normalization to face vectors followed by 2D/3D t-SNE & PCA cluster inspections.',
    },
    {
      id: 'deployment',
      stepNumber: '08',
      title: 'Deployment & Systems Engineering',
      icon: Rocket,
      description: 'Encapsulating pipelines into reactive interfaces, microservices, and Streamlit dashboards.',
      exampleProject: 'Wildfire Detection & Hospital OCR',
      exampleDetails: 'Deploying real-time YOLOv8 wildfire alert dashboard in Streamlit and clinical OCR extraction pipelines.',
    },
    {
      id: 'real-world',
      stepNumber: '09',
      title: 'Real-World Application',
      icon: Globe2,
      description: 'Institutional translation into live hospital EHRs, precision agriculture logistics, and digital governance.',
      exampleProject: 'Swami Rama Himalayan Hospital & ICITSIF IEEE',
      exampleDetails: 'Delivering structured medical data from patient files and seed supply-chain traceability frameworks.',
    },
  ];

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = steps[activeStepIndex];

  return (
    <section id="research-pipeline" className="py-20 bg-lab-bg border-b border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            METHODOLOGICAL LIFECYCLE
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            From Research to Deployment
          </p>
          <p className="text-sm text-slate-400 mt-2">
            The systematic 9-stage engineering pipeline powering every published study and deployed system in Prakhar Joshi's laboratory.
          </p>
        </div>

        {/* Interactive Step Selector Grid / Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl flex flex-col items-center justify-center text-center transition-all border ${
                  isActive
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-105 z-10'
                    : 'bg-slate-900/60 border-lab-border text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <span className="text-[10px] font-mono opacity-60 mb-1">{step.stepNumber}</span>
                <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="text-[11px] font-medium leading-tight line-clamp-1">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Step Inspector Card */}
        <div className="p-8 rounded-2xl bg-slate-900/70 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-900/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span>STAGE {activeStep.stepNumber} OF 09</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                {activeStep.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Practical Implementation Example from Resume */}
            <div className="md:col-span-6 p-5 rounded-xl bg-slate-950/80 border border-lab-border space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>GROUNDED LABORATORY CASE:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                  VERIFIED EXAMPLE
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                {activeStep.exampleProject}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.exampleDetails}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Step {activeStepIndex + 1} of 9
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-700"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStepIndex === steps.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                    className="px-3 py-1 rounded bg-cyan-600 text-xs text-white disabled:opacity-40 hover:bg-cyan-500 flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
