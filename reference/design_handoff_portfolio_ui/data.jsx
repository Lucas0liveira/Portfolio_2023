/* ============================================================
   Content — Lucas Freitas
   Edit freely; this is the single source of truth for all 3 layouts.
   ============================================================ */
const PORTFOLIO = {
  name: 'Lucas Freitas',
  role: 'Senior Full Stack Software Engineer',
  location: 'Remote · Brazil / Canada',
  // anchor = which scene object the camera frames for this section
  sections: [
    { id: 'hello',    label: 'Hello',     num: '01', anchor: 'room' },
    { id: 'about',    label: 'About',     num: '02', anchor: 'shelf' },
    { id: 'projects', label: 'Projects',  num: '03', anchor: 'monitors' },
    { id: 'work',     label: 'Experience',num: '04', anchor: 'desk' },
    { id: 'contact',  label: 'Contact',   num: '05', anchor: 'door' },
  ],

  hello: {
    greeting: 'Hi, I’m Lucas',
    headline: ['Full-stack', 'engineer building', 'things that ship.'],
    sub: 'I design, build, test and deploy scalable web applications — from internal platforms and e-commerce to data-rich industrial software.',
    quickTags: ['Python · Django', 'React · TypeScript', 'PostgreSQL · AWS'],
  },

  about: {
    eyebrow: 'About me',
    title: 'I own the full lifecycle — from architecture to deploy.',
    body: [
      'Full Stack Software Engineer with experience across web applications, internal platforms, e-commerce, industrial software and data-driven solutions. Strong on both frontend and backend.',
      'I’ve shipped production software for real business challenges: performance optimization, deployment automation, database design, auth systems and multi-client SaaS architecture — work that cut infrastructure cost and streamlined delivery.',
      'Earlier, I helped build a healthcare research project on 3D spine-curvature analysis that grew into an internationally funded startup, and taught digital literacy to elderly students.',
    ],
    stats: [
      { k: '5+', v: 'years shipping production software' },
      { k: '6', v: 'roles across web, data & industrial' },
      { k: '∞', v: 'curiosity for new stacks' },
    ],
    stack: ['Python', 'Django', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD', 'C++', 'Plotly Dash'],
  },

  projects: {
    eyebrow: 'Selected projects',
    title: 'Things I’ve built recently.',
    items: [
      {
        name: 'Protetoras Três Lagoas',
        blurb: 'A platform supporting an independent animal-protection group — adoptions, donations and volunteer coordination.',
        tags: ['Django', 'PostgreSQL'],
        url: 'https://github.com/Lucas0liveira/protetoras-tres-lagoas',
        tint: 'var(--teal)',
      },
      {
        name: 'Fornecedores',
        blurb: 'Supplier management system to register, track and organise vendor relationships for a business workflow.',
        tags: ['Python', 'React'],
        url: 'https://github.com/Lucas0liveira/fornecedores',
        tint: 'var(--lav)',
      },
      {
        name: 'adote.me',
        blurb: 'A pet-adoption web app connecting animals in need with new homes through a clean, friendly flow.',
        tags: ['React', 'REST API'],
        url: 'https://github.com/Lucas0liveira/adote.me',
        tint: 'var(--coral)',
      },
      {
        name: 'GitPeep',
        blurb: 'A focused tool for peeking into GitHub profiles and surfacing the signal from a developer’s public work.',
        tags: ['JavaScript', 'GitHub API'],
        url: 'https://github.com/Lucas0liveira/gitpeep',
        tint: 'var(--navy)',
      },
    ],
  },

  work: {
    eyebrow: 'Work experience',
    title: 'Where I’ve been building.',
    items: [
      {
        role: 'Fullstack Software Engineer',
        org: 'Icetek', place: 'Québec, Canada (Remote)', period: 'Mar 2025 — Present',
        tech: ['Python', 'AWS', 'PostgreSQL', 'C++', 'Plotly Dash', 'CI/CD'],
        points: [
          'Refactored legacy systems for cleaner architecture and lower technical debt.',
          'Built interactive data dashboards in Python & Plotly Dash.',
          'Migrated legacy C++ config into PostgreSQL; built a pooled connection manager with failover across AWS + local replicas.',
          'Automated deploy pipelines with GitHub Actions.',
        ],
      },
      {
        role: 'Fullstack Software Engineer',
        org: 'Mercos', place: 'Joinville, Brazil (Remote)', period: 'Jan 2024 — Mar 2025',
        tech: ['Python/Django', 'React'],
        points: [
          'Built end-to-end features with a focus on scalability and performance.',
          'Wrote unit & integration tests across the Django + React stack.',
          'Ran code reviews and mentored teammates to raise code quality.',
        ],
      },
      {
        role: 'Front-End Engineer → Team Lead',
        org: 'Before TI', place: 'Campo Grande, Brazil', period: 'Mar 2021 — Jan 2024',
        tech: ['Vue.js', 'JavaScript', 'Docker', 'Cypress'],
        points: [
          'Maintained a high-volume telecom sales system handling daily transactions.',
          'Upgraded legacy codebases; built Cypress automation for QA.',
          'Promoted to Front-End Team Lead — owned code quality, timelines & new product work.',
        ],
      },
      {
        role: 'Front-End Developer (Internship)',
        org: 'Absolutier', place: 'Campo Grande, Brazil', period: 'Aug 2020 — Feb 2021',
        tech: ['Vue.js', 'Quasar', 'Docker'],
        points: [
          'Built an educational platform with responsive layouts.',
          'Translated UI/UX designs into production-ready features in a startup environment.',
        ],
      },
      {
        role: 'BackSCNR — Founding Developer',
        org: 'UFMS Research', place: 'Campo Grande, Brazil', period: 'Jan 2019 — Jun 2020',
        tech: ['Python', 'Blender 3D'],
        points: [
          'Initial developer on a research project that became BackSCNR, an internationally funded startup.',
          'Built a Python app inside Blender to analyse torso scans and automate scoliosis detection & quantification.',
        ],
      },
    ],
    education: {
      degree: 'B.Sc. Software Engineering',
      school: 'Universidade Federal do Mato Grosso do Sul',
      year: '2021',
    },
  },

  contact: {
    eyebrow: 'Contact me',
    title: 'Let’s build something.',
    sub: 'Open to senior full-stack roles and interesting problems. Drop a line — the mailbox is right there.',
    email: 'hello@lucasfreitas.dev',
    links: [
      { label: 'GitHub', handle: '@Lucas0liveira', url: 'https://github.com/Lucas0liveira' },
      { label: 'LinkedIn', handle: '/in/lucas-freitas', url: '#' },
      { label: 'Résumé', handle: 'Download PDF', url: '#' },
    ],
  },
};

window.PORTFOLIO = PORTFOLIO;
