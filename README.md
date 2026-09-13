# Prakhar Joshi — AI Researcher Portfolio

> **"Building intelligent systems at the intersection of AI research and real-world deployment."**
> 
> *Computer Vision • NLP • OCR • RAG • Deep Learning • Intelligent Systems*

A high-performance personal research portfolio, academic laboratory showcase, and Git-based Content Management System (CMS) designed for **Prakhar Joshi**, Junior Research Fellow at Swami Rama Himalayan University and former JRF at the Center of Artificial Intelligence and Research (CAIR).

All data presented on this website is strictly derived from verified resume records, including global competitive shared-task achievements (SemEval-2026 3rd Rank, ACL), peer-reviewed publications (COLING 2025), and deployed institutional systems (Swami Rama Himalayan Hospital OCR pipeline, Mass Attendance Face Recognition, and Wildfire Detection).

---

## 🔬 Key Features

- **Academic Lab Aesthetic**: Dark-first futuristic research lab interface featuring subtle coordinate grids, orbital topological visualizations, and high-contrast typography (Outfit, Inter, and JetBrains Mono).
- **Interactive Research Topology**: Signature interactive SVG/Canvas node graph connecting Prakhar Joshi's core laboratory to 8 research domains, with real-time project filtering and methodology inspection.
- **Methodological Lifecycle**: Interactive 9-stage pipeline (*Research Question → Data → Preprocessing → Model → Experimentation → Evaluation → Optimization → Deployment → Real-World Application*) showcasing real laboratory case studies.
- **Dynamic Technical Project Showcases**: 12 verified research projects with conceptual architecture diagrams, problem statements, mathematical/computational pipelines, and dedicated dynamic detail pages (`/#/projects/:slug`).
- **Academic Timeline & Publications**: Chronological archive of peer-reviewed papers (SemEval 2026, COLING 2025, AIHW 2025, ICITSIF 2026 IEEE, Seed Information Systems) with integrated BibTeX citation drawers.
- **Institutional Appointments & Experience**: Verified timeline covering Swami Rama Himalayan University (SRHU) and CAIR Haridwar.
- **Full-Featured Admin CMS (`/#/admin`)**:
  - Live CRUD management for Projects, Publications, Experience, Education, Skills, Achievements, and Profile metadata.
  - **Git-Based Synchronization**: Direct GitHub REST API commit capability to branch `main` on `prakharxai/prakharxai.github.io` (using volatile session-stored PAT, zero hardcoded credentials).
  - **JSON Bundle Export**: Single-click download of updated JSON datasets to drop directly into `/src/content/`.
- **Zero Fabrication Guarantee**: No invented DOIs, fake citations, exaggerated metrics, or artificial benchmarks.
- **GitHub Pages Ready**: Native static routing with `HashRouter`, relative asset base paths (`./`), structured metadata (Person & ScholarlyArticle JSON-LD schemas), and automated GitHub Actions CI/CD.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Build & Tooling** | Vite 8, PostCSS, Autoprefixer |
| **Styling & Design System** | Tailwind CSS v3 (Custom Research Lab Palette), Vanilla CSS Tokens |
| **Icons & Media** | Lucide React, Custom Brand SVGs, Mathematical Schematics |
| **Routing** | Hash-based client routing (Flawless GitHub Pages static hosting compatibility) |
| **Content Architecture** | Git-based JSON collections (`/src/content/*.json`) |
| **CI/CD Deployment** | GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages |

---

## 📂 Project Structure

```
prakhar-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD pipeline
├── public/
│   ├── assets/
│   │   ├── hero-visual.svg         # Hero abstract research topology graphic
│   │   └── projects/*.svg          # 12 technical architecture diagrams
│   ├── favicon.svg                 # Neural research node favicon
│   ├── robots.txt                  # Search engine crawler policies
│   └── sitemap.xml                 # Canonical XML sitemap
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BrandIcons.tsx      # Vector GitHub & LinkedIn icons
│   │   │   ├── Footer.tsx          # Academic footer & contact links
│   │   │   └── Navbar.tsx          # Sticky glass navigation & drawer
│   │   └── home/
│   │       ├── AboutSection.tsx    # Research profile & philosophy
│   │       ├── AchievementsSection.tsx # SemEval #3, Hackathon, NCC, Yoga Conf
│   │       ├── ContactSection.tsx  # Direct mail dispatcher & collaboration
│   │       ├── EducationSection.tsx# MCA Data Science, BSc CS, Beersheba
│   │       ├── ExperienceSection.tsx# SRHU & CAIR appointments
│   │       ├── FeaturedProjects.tsx# 12 filterable projects with live search
│   │       ├── Hero.tsx            # High-impact hero with interactive canvas
│   │       ├── InteractiveResearchVisual.tsx # Signature 8-node topology
│   │       ├── PublicationsSection.tsx # Papers, BibTeX drawer, timeline
│   │       ├── ResearchAtAGlance.tsx # Resume-verified highlights
│   │       ├── ResearchDomains.tsx # 8 technical domain cards
│   │       └── ResearchPipeline.tsx# 9-stage research-to-deployment pipeline
│   ├── content/
│   │   ├── achievements.json       # Honors & recognitions
│   │   ├── certifications.json     # HackerRank SQL Specialization
│   │   ├── domains.json            # 8 core research domains
│   │   ├── education.json          # Academic degrees & coursework
│   │   ├── experience.json         # Professional appointments
│   │   ├── profile.json            # Bio, affiliations, social links
│   │   ├── projects.json           # 12 verified projects with architectures
│   │   ├── publications.json       # 5 verified publications & BibTeX
│   │   ├── settings.json           # Site title, SEO description, keywords
│   │   └── skills.json             # Skill categories & technologies
│   ├── pages/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx  # Admin CMS console & Git sync
│   │   ├── HomePage.tsx            # Main research portfolio page
│   │   └── ProjectDetailPage.tsx   # Dynamic technical detail breakdown
│   ├── services/
│   │   └── contentService.ts       # Content service & Git commit engine
│   ├── types/
│   │   └── content.ts              # Strongly-typed data interfaces
│   ├── App.tsx                     # Main client router
│   ├── index.css                   # Global research tokens & glow utilities
│   └── main.tsx                    # React root entry
├── index.html                      # SEO metadata, OpenGraph, JSON-LD Schema
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💻 Local Development

### Prerequisites
- Node.js (v18 or higher recommended; v20/v22 tested)
- npm (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎛️ Content Management System (CMS)

Access the CMS at:
```
/#/admin
```
or click the **Sliders icon** in the top navigation bar.

### Features
1. **Projects**: Add new projects, edit problem statements, reorder display hierarchy, and toggle featured status.
2. **Publications**: Add new papers, edit abstracts, update DOIs, and generate BibTeX citations.
3. **Profile & Identity**: Update bio, affiliations, and configure your **Google Scholar Profile URL**.
4. **Git Sync Engine**:
   - **Direct GitHub Commit**: Enter a GitHub Personal Access Token (PAT) with `repo` scope to commit updated content files directly to branch `main` on `prakharxai/prakharxai.github.io`.
   - **JSON Export**: Download single or all `.json` files to commit locally via Git.

---

## 🚀 GitHub Pages Deployment

The repository is configured for automated deployment via GitHub Actions:

1. **Branch**: `main`
2. **Workflow File**: `.github/workflows/deploy.yml`
3. **Trigger**: Any push to `main` triggers a build and deploys `dist/` to GitHub Pages.
4. **Target URL**: `https://prakharxai.github.io/`

### Configuring GitHub Pages in Repository Settings:
1. On GitHub, navigate to **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main` to trigger your first automated deployment!

---

## 🔒 Security & Environment Variables

- **Zero Credentials in Git**: Never commit API keys or private tokens.
- **Volatile Token Storage**: GitHub Personal Access Tokens used in the browser CMS are held exclusively in component state or session memory and are never persisted to disk or git.
- **Refer to `.env.example`** for optional local environment parameters.

---

## 📄 License & Attribution

© 2026 Prakhar Joshi. All research projects, publications, and professional affiliations are documented strictly according to verified curriculum vitae credentials.
