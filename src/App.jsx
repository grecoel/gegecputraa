import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import ParticleSphere from './components/ParticleSphere';

// --- VISUAL ASSETS ---

const CodeDecoration = () => {
  const codeString = `var j = Object.create;
var e = Object.defineProperty
  , k = Object.defineProperties
  , l = Object.getOwnPropertyDescriptor
  , m = Object.getOwnPropertyDescriptors`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] select-none flex items-center justify-center">
      <pre className="text-xs md:text-sm font-mono leading-relaxed text-black dark:text-white text-left whitespace-pre-wrap max-w-6xl w-full p-8 grayscale">
        {codeString}
      </pre>
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#0f0f10] via-transparent to-white dark:to-[#0f0f10]" />
    </div>
  );
};

// --- PARTICLE SPHERE ---



// --- LOCALIZATION DATA ---
const TRANSLATIONS = {
  en: {
    nav: { work: "WORK", exp: "EXPERIENCE", certs: "CERTS", skills: "SKILLS", contact: "CONTACT" },
    hero: {
      title: "Gege Centiana Putra",
      subtitle: "CS Student · Software Engineer · AI Researcher",
      subtitle2: "Turning ambitious ideas into scalable, real-world systems."
    },
    work: {
      title: "Featured Projects",
      mobileTitle: "Featured Projects"
    },
    exp: {
      title: "Experience",
      leadership: "Leadership & Organization"
    },
    certs: {
      title: "Certifications & Awards"
    },
    skills: {
      title: "Technical Proficiency"
    },
    edu: {
      title: "Education"
    },
    footer: {
      cta: "Ready to build something remarkable?",
      btn: "Get in Touch"
    },
    wip: {
      btn: "View Project",
      heading: "Link coming soon",
      body: "Still being connected · check back soon while things are polished up."
    },
    stats: {
      internships: "Internships",
      certs: "Certifications",
      projects: "Projects",
      skillAreas: "Skill Areas"
    },
    cv: "Download CV"
  },
  id: {
    nav: { work: "KARYA", exp: "PENGALAMAN", certs: "SERTIF", skills: "KEAHLIAN", contact: "KONTAK" },
    hero: {
      title: "Gege Centiana Putra",
      subtitle: "Mahasiswa Ilkom · Software Engineer · Peneliti AI",
      subtitle2: "Mengubah ide ambisius menjadi sistem yang berdampak nyata."
    },
    work: {
      title: "Karya Terpilih",
      mobileTitle: "Proyek Unggulan"
    },
    exp: {
      title: "Pengalaman",
      leadership: "Kepemimpinan & Organisasi"
    },
    certs: {
      title: "Sertifikasi & Penghargaan"
    },
    skills: {
      title: "Keahlian Teknis"
    },
    edu: {
      title: "Pendidikan"
    },
    footer: {
      cta: "Siap membangun sesuatu yang luar biasa?",
      btn: "Hubungi Saya"
    },
    wip: {
      btn: "Lihat Proyek",
      heading: "Tautan segera hadir",
      body: "Masih dalam proses penyambungan · kembali lagi sebentar lagi."
    },
    stats: {
      internships: "Magang",
      certs: "Sertifikasi",
      projects: "Proyek",
      skillAreas: "Bidang Keahlian"
    },
    cv: "Unduh CV"
  }
};


// --- DATA (Keep static for logic, only labels translate) ---
const projects = [
  {
    title: "Astroecomm",
    category: "Full Stack Platform",
    desc: "A Next-Gen diverse marketplace platform built for trust. Won 1st Best Project Award for its strictly verified seller system and robust security architecture.",
    tech: ["React", "Laravel", "PostgreSQL"],
    color: "#4285F4", // Google Blue
    icon: "trophy"
  },
  {
    title: "LokaLoka",
    category: "SME Marketplace",
    desc: "Empowering small businesses with a comprehensive digital storefront. Led the system architecture design, focusing on scalable product management and secure payment gateways.",
    tech: ["System Architecture", "Lead Dev"],
    color: "#34A853", // Google Green
    icon: "storefront"
  },
  {
    title: "Project Lunpia",
    category: "AI & GIS",
    desc: "Mapping urban vegetation in real-time. Utilizes Satellite Imagery (NDVI) and Machine Learning to provide actionable environmental insights for city planning.",
    tech: ["Python Flask", "ML", "Google Earth Engine"],
    color: "#EA4335", // Google Red
    icon: "satellite_alt"
  },
  {
    title: "GEMAS",
    category: "Student Ecosystem",
    desc: "A dedicated marketplace for university students. Managed the entire project lifecycle using ICONIX methodology, from rigorous use-case modeling to deployment.",
    tech: ["Spring Boot", "ICONIX", "React"],
    color: "#FBBC04", // Google Yellow
    icon: "school"
  }
];

const certifications = [
  {
    name: "CS50’s Introduction to AI with Python",
    issuer: "Harvard University",
    year: "2025",
    color: "#34A853", // Green
    skills: "Deep Learning · Neural Networks · Python"
  },
  {
    name: "CS50's Web Programming with Python & JS",
    issuer: "Harvard University",
    year: "2025",
    color: "#4285F4", // Blue
    skills: "Django · React · CI/CD"
  },
  {
    name: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2025",
    color: "#EA4335", // Red
    skills: "C · Python · SQL · Algorithms"
  },
  {
    name: "AI Praktis untuk Produktivitas",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#4285F4", // Blue
    skills: "Artificial Intelligence (AI)"
  },
  {
    name: "API Orchestration - Associate",
    issuer: "Apollo GraphQL",
    year: "2025",
    color: "#EA4335", // Red
    skills: "API · API Testing"
  },
  {
    name: "Belajar Penggunaan Generative AI",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#FBBC04", // Yellow
    skills: "Generative AI"
  },
  {
    name: "Graph Developer - Associate",
    issuer: "Apollo GraphQL",
    year: "2025",
    color: "#34A853", // Green
    skills: "GraphQL · Apollo GraphQL"
  },
  {
    name: "Belajar Back-End Pemula dengan JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#4285F4", // Blue
    skills: "RESTful APIs · JavaScript"
  },
  {
    name: "Belajar Dasar Cloud dan Gen AI di AWS",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#EA4335", // Red
    skills: "AWS Cloud · Generative AI"
  },
  {
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#FBBC04", // Yellow
    skills: "JavaScript Fundamentals"
  }
];

const experience = [
  {
    role: "Junior Data Engineer Intern",
    org: "GoTo",
    time: "Feb 2026 – Present",
    type: "Internship",
    desc: "Building and maintaining scalable data pipelines and infrastructure within Southeast Asia's largest tech ecosystem."
  },
  {
    role: "Software Engineer Intern",
    org: "Indivara Group",
    time: "Jan 2026 – Present",
    type: "Internship",
    desc: "Developing enterprise-scale web applications and contributing to the digital transformation initiatives of major clients."
  },
  {
    role: "Data Labeling & Recovery Analysis",
    org: "PT LEN Industri (Persero) x UNDIP",
    time: "Dec 2025 – Feb 2026",
    type: "",
    desc: "High-precision geospatial data labeling for Sumatra Post-Flood Recovery. Ensuring strict data consistency for predictive modeling."
  },
  {
    role: "Test Content Contributor of CS50x 2026",
    org: "Harvard University",
    time: "Oct 2025 – Dec 2025",
    type: "Seasonal • Remote",
    desc: ""
  },
  {
    role: "IT Specialist Intern",
    org: "Kementerian Sekretariat Negara",
    time: "Jun 2025 – Aug 2025",
    type: "Internship",
    desc: "Developed internal systems and provided technical support for government infrastructure and security compliance."
  },
  {
    role: "Head of Informatics Laboratory Assistant",
    org: "Diponegoro University",
    time: "Aug 2024 – Present",
    type: "Contract",
    desc: "Leading and managing the entire Informatics Laboratory Assistant division, overseeing all academic lab activities and assistant staff.",
    subRoles: [
      {
        role: "Head of Informatics Laboratory Assistant",
        type: "Contract",
        time: "Jan 2026 – Present"
      },
      {
        role: "Coordinator of Practice Assistant, Data Structure Labs",
        type: "Part-time",
        time: "Aug 2025 – Dec 2025"
      },
      {
        role: "Machine Learning Research Assistant",
        type: "Part-time",
        time: "Aug 2025 – Nov 2025",
        desc: "Built end-to-end pipelines for reckless driver detection. Validated object detection labels from traffic camera feeds."
      },
      {
        role: "Deep Learning Research Assistant",
        type: "Part-time",
        time: "Jul 2025 – Jan 2026",
        desc: "Developing Transformer-based models for audio processing. Evaluating experimental architectures like Linear Attention Convolution."
      },
      {
        role: "Practice Assistant, Programming & Algorithm Lab",
        type: "Part-time",
        time: "Jan 2025 – Jun 2025",
        desc: "C programming language, teaching algorithm fundamentals."
      },
      {
        role: "Practice Assistant, Basic Programming",
        type: "Part-time",
        time: "Aug 2024 – Dec 2024"
      },
      {
        role: "Coordinator of Practice Assistant, Programming Fundamentals Lab",
        type: "Part-time",
        time: "Aug 2024 – Dec 2024"
      }
    ]
  }
];
const leadership = [
  {
    role: "Expert Staff of Public Relations",
    org: "BEM FSM Undip",
    time: "Mar 2025 – Nov 2025",
    desc: "Managed organizational image through communication strategies and social media. Executed comparative study programs to 3 external institutions."
  },
  {
    role: "Event Coordinator, I-Gate 2024",
    org: "HMIF Undip",
    time: "Aug 2024 – Dec 2024",
    desc: "Designed, scripted, and directed the main faculty event."
  },
  {
    role: "Delegasi, AFL Summer Peak 2024",
    org: "AIESEC in Semarang",
    time: "Apr 2024 – Aug 2024",
    desc: "Participated in leadership training, global mindset development, and cross-cultural problem-solving challenges."
  },
  {
    role: "Coordinator, POSITIF 2024",
    org: "HMIF Undip",
    time: "Mar 2024 – May 2024",
    desc: "Managed match schedules and cross-division coordination."
  },
  {
    role: "Coordinator of Event Division, I-Rantai 2024",
    org: "HMIF Undip",
    time: "Jan 2024 – Feb 2024",
    desc: "Organized the event ensuring effective workflows and coordination between committees."
  },
  {
    role: "Member of Event Division",
    org: "ANFORCOM 2024 (HMIF Undip)",
    time: "Apr 2024 – Sep 2024",
    desc: ""
  },
  {
    role: "Member of Event Division",
    org: "I-Care 2024 (HMIF Undip)",
    time: "Apr 2024 – Jun 2024",
    desc: ""
  },
  {
    role: "Member of Event Division",
    org: "LKMMPD Informatika 2024 (HMIF Undip)",
    time: "Jun 2024 – Sep 2024",
    desc: ""
  }
];

const skills = {
  "Languages": ["Python", "C++", "C", "Java", "JavaScript", "SQL", "HTML/CSS"],
  "AI / Data Science": ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Data Labeling"],
  "Frameworks & Libs": ["Django", "Flask", "React", "Spring Boot", "Bootstrap", "OpenGL", "Leaflet.js"],
  "Databases": ["PostgreSQL", "SQLite", "Oracle Database"],
  "Tools & Platforms": ["Git", "GitHub", "Figma", "LaTeX", "Google Earth Engine", "AWS"],
  "Methodologies": ["ICONIX", "Repository Pattern", "Service Layer Architecture"],
  "Spoken Lang": ["Indonesian (Native)", "English (Fluent)", "Korea (Basic)", "German (Basic)"]
};
// --- COMPONENTS ---

// --- WIP BUTTON (used on unlinked project cards) ---
const WIPButton = ({ color, lang }) => {
  const [showing, setShowing] = useState(false);
  const timerRef = useRef(null);
  const t = TRANSLATIONS[lang].wip;

  const handleClick = () => {
    setShowing(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowing(false), 3200);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200
                   bg-white active:scale-95"
        style={{ color, borderColor: color }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = `${color}12`}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
      >
        <span className="symbol text-base leading-none" style={{ color }}>open_in_new</span>
        {t.btn}
      </button>

      {/* Toast popup */}
      <div
        className="absolute bottom-full left-0 mb-3 w-64 rounded-2xl border border-gray-100 bg-white shadow-xl
                   transition-all duration-300 pointer-events-none z-50"
        style={{
          opacity: showing ? 1 : 0,
          transform: showing ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
        }}
      >
        {/* Colored top stripe */}
        <div className="h-1 w-full rounded-t-2xl" style={{ backgroundColor: color }} />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="symbol text-base" style={{ color }}>construction</span>
            <p className="text-sm font-bold text-[#202124]">{t.heading}</p>
          </div>
          <p className="text-xs text-[#5F6368] leading-relaxed">{t.body}</p>
        </div>
      </div>
    </div>
  );
};

const StickyScrollSection = ({ lang, isDark }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeCard, setActiveCard] = useState(0);
  const text = TRANSLATIONS[lang].work;

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const step = 1 / projects.length;
      const index = Math.min(Math.floor(latest / step), projects.length - 1);
      setActiveCard(index);
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className={`relative hidden md:block h-[300vh] ${isDark ? 'bg-[#141416]' : 'bg-[#F8F9FA]'}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-[var(--page-margin)] grid grid-cols-1 md:grid-cols-2 gap-16 items-center h-full max-h-[800px]">

          {/* LEFT: Text Content */}
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
            </div>
            <h2 className={`heading-2 mb-12 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{text.title}</h2>

            <div className="relative min-h-[350px]">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="absolute top-0 left-0 w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    y: activeCard === index ? 0 : 30,
                    pointerEvents: activeCard === index ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: project.color }}>
                    {project.category}
                  </p>
                  <h3 className={`heading-3 mb-6 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{project.title}</h3>
                  <p className={`body ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} mb-8 text-lg leading-relaxed max-w-lg`}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`px-3 py-1 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-full text-sm ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <WIPButton color={project.color} lang={lang} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visuals */}
          <div className={`relative h-[400px] w-full ${isDark ? 'bg-[#1e1e22] border-white/10' : 'bg-white border-gray-100'} rounded-[32px] shadow-2xl border overflow-hidden flex items-center justify-center`}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 0.9
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 opacity-[0.04] transition-opacity duration-500" style={{ backgroundColor: project.color }} />
                {/* Animated ring behind icon */}
                <motion.div
                  className="absolute w-32 h-32 rounded-full border-2 opacity-10"
                  style={{ borderColor: project.color }}
                  animate={{
                    scale: activeCard === index ? [1, 1.4, 1] : 1,
                    opacity: activeCard === index ? [0.1, 0, 0.1] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                <motion.span
                  className="symbol text-[120px]"
                  style={{ color: project.color }}
                  animate={{
                    rotate: activeCard === index ? 0 : 15,
                    scale: activeCard === index ? [1, 1.05, 1] : 0.9,
                  }}
                  transition={{ duration: 0.8, scale: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                >
                  {project.icon}
                </motion.span>
              </motion.div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div className={`h-1.5 w-28 ${isDark ? 'bg-white/10' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)' }}
                  animate={{ width: `${((activeCard + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono text-gray-400 tabular-nums">0{activeCard + 1} / 0{projects.length}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const MobileProjectList = ({ lang, isDark }) => {
  const text = TRANSLATIONS[lang].work;
  return (
    <div className={`md:hidden py-[var(--space-2xl)] ${isDark ? 'bg-[#141416]' : 'bg-[#F8F9FA]'}`}>
      <div className="grid-container">
        <h2 className={`heading-2 mb-8 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{text.mobileTitle}</h2>
        <div className="space-y-8">
          {projects.map((project, i) => (
            <div key={i} className={`${isDark ? 'bg-[#1e1e22] border-white/10' : 'bg-white border-gray-100'} rounded-2xl p-6 border shadow-sm relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className={`symbol text-[80px]`} style={{ color: project.color }}>{project.icon}</span>
              </div>
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: project.color }}>
                  {project.category}
                </span>
                <h3 className={`heading-4 mb-2 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{project.title}</h3>
                <p className={`body ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} mb-4 text-sm leading-relaxed`}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t, k) => (
                    <span key={k} className={`px-2 py-1 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'} border rounded text-xs ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <WIPButton color={project.color} lang={lang} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


const ParallaxHero = ({ lang, isDark }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 250]);
  const y2 = useTransform(scrollY, [0, 600], [0, -180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.96]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const text = TRANSLATIONS[lang].hero;

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const nameChars = text.title.split('');

  const floatingBadges = [
    { label: "Full Stack Dev", color: "#4285F4", x: "8%", y: "26%", delay: 2.0 },
    { label: "Data Engineer", color: "#EA4335", x: "80%", y: "20%", delay: 2.3 },
    { label: "AI Researcher", color: "#34A853", x: "84%", y: "68%", delay: 2.6 },
    { label: "Harvard CS50", color: "#FBBC04", x: "6%", y: "72%", delay: 2.9 },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-[var(--page-margin)] overflow-hidden">
      <CodeDecoration />

      {/* Ambient soft light blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#4285F4] opacity-[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[550px] h-[550px] bg-[#34A853] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -translate-y-1/2 left-[-5%] w-[400px] h-[400px] bg-[#FBBC04] opacity-[0.03] rounded-full blur-[80px]" />
      </div>

      {/* Floating keyword badges — parallax to mouse */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-[#1e1e22]/80 border-white/10' : 'bg-white/80 border-gray-100'} backdrop-blur-sm rounded-full border shadow-sm text-xs font-bold tracking-wide pointer-events-none select-none z-10`}
          style={{
            left: badge.x,
            top: badge.y,
            color: badge.color,
            transform: `translate(${mousePos.x * -14 * (i % 2 === 0 ? 1 : -1)}px, ${mousePos.y * -10 * (i % 2 === 0 ? -1 : 1)}px)`,
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 0.75, scale: 1, y: 0 }}
          transition={{ delay: badge.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: badge.color, animation: 'pulse 2s infinite' }} />
          {badge.label}
        </motion.div>
      ))}

      {/* Main title — staggered character entrance */}
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="relative z-10 w-full max-w-7xl"
      >
        <motion.h1
          className="landing-main mb-1 tracking-tighter overflow-visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.028, delayChildren: 0.15 } }
          }}
          initial="hidden"
          animate="visible"
          style={{
            transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)`,
            transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="flex flex-nowrap justify-center whitespace-nowrap">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className={`inline-block pb-3 text-transparent bg-clip-text ${isDark ? 'bg-gradient-to-br from-[#ffffff] via-[#e8eaed] to-[#bdc1c6]' : 'bg-gradient-to-br from-[#0F0F11] via-[#202124] to-[#404040]'} drop-shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${char === ' ' ? 'w-[0.3em]' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Google-colored accent bar */}
        <div className="flex justify-center gap-1.5 mb-8">
          {['#4285F4', '#EA4335', '#FBBC04', '#34A853'].map((c, i) => (
            <motion.div
              key={c}
              className="h-1 rounded-full"
              style={{ backgroundColor: c }}
              initial={{ width: 0 }}
              animate={{ width: 36 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      </motion.div>

      {/* Subtitles with mouse parallax */}
      <motion.div style={{ y: y2, opacity }} className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Separate the mouse-parallax CSS transform from the framer-motion y animation
              to avoid framer-motion's transform system overriding the raw style.transform */}
          <div
            className="flex flex-col items-center gap-5"
            style={{
              transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)`,
              transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {text.subtitle.split(' · ').map((part, idx) => {
                const colors = ['#4285F4', '#EA4335', '#34A853', '#FBBC04'];
                const bgs = ['#EBF3FE', '#FCE8E6', '#E6F4EA', '#FEF7E0'];
                const c = colors[idx % colors.length];
                const bg = bgs[idx % bgs.length];
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
                    style={{ color: c, backgroundColor: bg, border: `1px solid ${c}35` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
                    {part}
                  </span>
                );
              })}
            </div>
            <p className={`heading-4 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'} font-semibold leading-snug max-w-xl text-center`}>
              {text.subtitle2}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — mouse-wheel style */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 flex flex-col items-center gap-3 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        onClick={() => {
          const el = document.getElementById('work');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} opacity-50 group-hover:opacity-100 transition-opacity`}>
          Scroll
        </span>
        <motion.div className="w-5 h-9 rounded-full border-2 border-[#5F6368]/20 flex justify-center pt-2 group-hover:border-[#4285F4]/50 transition-colors">
          <motion.div
            className="w-0.5 h-2 rounded-full bg-[#5F6368]/40 group-hover:bg-[#4285F4] transition-colors"
            animate={{ y: [0, 7, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- LEADERSHIP SECTION COMPONENT ---
const ORG_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#4285F4', '#EA4335', '#FBBC04', '#34A853'];

const LeadershipSection = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#141416]' : 'bg-[#F8F9FA]'}`}>
      <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* EDUCATION */}
          <div className="lg:col-span-4 transition-all duration-700">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} mb-8`}>{t.edu.title}</h3>
            <div className={`${isDark ? 'bg-[#1e1e22] border-white/10' : 'bg-white border-gray-100'} p-8 rounded-3xl border shadow-sm hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center gap-4 mb-8">
                <span className="symbol text-5xl text-[#4285F4]">school</span>
                <div>
                  <h4 className={`heading-4 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>Undip</h4>
                  <p className="text-sm text-gray-500 font-medium">Semarang, Indonesia</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-bold ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'} mb-1`}>Bachelor of Informatics</h4>
                  <p className={`text-sm font-mono ${isDark ? 'text-[#9aa0a6] bg-white/5' : 'text-[#5F6368] bg-gray-50'} inline-block px-2 py-1 rounded`}>2023 – Present</p>
                  <p className="text-sm text-gray-500 mt-2">Specializing in Artificial Intelligence and Deep Learning systems.</p>
                </div>
                <div className={`border-t ${isDark ? 'border-white/10' : 'border-gray-100'} pt-6`}>
                  <h4 className={`text-base font-bold ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'} mb-1`}>SMA Negeri 1 Bandar</h4>
                  <p className="text-sm text-[#34A853] font-medium">Natural Sciences (94.6/100)</p>
                </div>
              </div>
            </div>
          </div>

          {/* LEADERSHIP — stable list */}
          <div className="lg:col-span-8">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} mb-8 transition-all duration-700`}>
              {t.exp.leadership}
            </h3>

            <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-gray-200'}`}>
              {leadership.map((item, i) => (
                <div
                  key={i}
                  className={`py-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 group cursor-default
                             transition-all duration-700 ${isDark ? 'hover:bg-white/5' : 'hover:bg-white'} hover:px-4 hover:rounded-2xl hover:-mx-4`}
                >
                  {/* Colored dot + time */}
                  <div className="flex items-center gap-2 sm:w-40 shrink-0 pt-0.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: ORG_COLORS[i % ORG_COLORS.length] }}
                    />
                    <span className="text-xs font-mono text-gray-400 whitespace-nowrap">{item.time}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'} leading-snug mb-0.5
                                  group-hover:text-[#4285F4] transition-colors duration-200`}>
                      {item.role}
                    </p>
                    <p className={`text-xs font-bold ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} mb-1`}>{item.org}</p>
                    {item.desc && (
                      <p className="text-xs text-gray-400 leading-relaxed mt-1">{item.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- SKILLS SECTION COMPONENT ---
const SKILL_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#4285F4', '#EA4335', '#34A853'];

const SkillsSection = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];
  const entries = Object.entries(skills);

  return (
    <section id="skills" className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#0f0f10]' : 'bg-white'}`}>
      <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">

        {/* Heading */}
        <div className="mb-16 transition-all duration-700">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
          </div>
          <h2 className={`heading-2 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{t.skills.title}</h2>
        </div>

        {/* Row-based layout — one category per row */}
        <div className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
          {entries.map(([category, items], i) => (
            <div
              key={category}
              className="py-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group transition-all duration-700"
            >
              {/* Category label */}
              <div className="md:w-48 shrink-0 flex items-center gap-2.5 pt-0.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: SKILL_COLORS[i] }}
                />
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'}`}>
                  {category}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>{items.length}</span>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-sm rounded-lg border ${isDark ? 'border-white/10 text-[#9aa0a6] bg-transparent hover:border-[#8AB4F8] hover:text-[#8AB4F8] hover:bg-[#8AB4F8]/10' : 'border-gray-200 text-[#5F6368] bg-white hover:border-[#4285F4] hover:text-[#4285F4] hover:bg-[#EBF3FE]'}
                               hover:shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-default select-none`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- ANIMATED COUNTER HOOK ---
const useAnimatedCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
};

// --- STATS COUNTER BAR ---
const StatsCounterBar = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];
  const stats = [
    { value: 5, suffix: '+', label: t.stats.internships, color: '#4285F4' },
    { value: certifications.length, suffix: '+', label: t.stats.certs, color: '#EA4335' },
    { value: projects.length, suffix: '', label: t.stats.projects, color: '#FBBC04' },
    { value: Object.keys(skills).length, suffix: '+', label: t.stats.skillAreas, color: '#34A853' },
  ];
  return (
    <div className={`py-12 md:py-16 ${isDark ? 'bg-[#0f0f10] border-white/5' : 'bg-white border-gray-100'} border-y`}>
      <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const { count, ref } = useAnimatedCounter(stat.value);
            return (
              <div key={i} ref={ref} className="text-center group">
                <div className={`counter-number text-4xl md:text-5xl font-bold ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'} mb-2 transition-colors group-hover:text-[var(--hover-color)]`} style={{ '--hover-color': stat.color }}>
                  {count}{stat.suffix}
                </div>
                <div className={`text-xs md:text-sm font-semibold uppercase tracking-widest ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'}`}>{stat.label}</div>
                <div className="mx-auto mt-3 w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12" style={{ backgroundColor: stat.color, opacity: 0.6 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- SECTION PROGRESS DOTS ---
const SECTIONS = [
  { id: 'work', color: '#4285F4' },
  { id: 'about', color: '#EA4335' },
  { id: 'certs', color: '#FBBC04' },
  { id: 'skills', color: '#34A853' },
];

const SectionProgressDots = ({ activeSection, isDark }) => (
  <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
    {SECTIONS.map(s => (
      <button
        key={s.id}
        onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
        className={`progress-dot w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${activeSection === s.id
          ? 'scale-150 border-transparent'
          : `${isDark ? 'border-white/20 hover:border-white/40' : 'border-gray-300 hover:border-gray-500'} bg-transparent`
          }`}
        style={activeSection === s.id ? { backgroundColor: s.color, boxShadow: `0 0 0 3px ${s.color}33` } : {}}
        aria-label={`Go to ${s.id}`}
      />
    ))}
  </div>
);

// --- APP COMPONENT ---
const App = () => {
  const [lang, setLang] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const t = TRANSLATIONS[lang];

  // Dark Mode Toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(prev => !prev);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setShowBackToTop(sy > 500);
      setIsScrolled(sy > 80);
      // Track active section
      const sections = ['work', 'about', 'certs', 'skills'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(id); break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'id' : 'en');
  }

  const navigateTo = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${isDark ? 'bg-[#0f0f10] text-[#e8eaed]' : 'bg-white text-[#202124]'} min-h-screen relative selection:bg-[#4285F4] selection:text-white transition-colors duration-500`}>

      {/* Entrance loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className={`fixed inset-0 z-[200] ${isDark ? 'bg-[#0f0f10]' : 'bg-white'} flex items-center justify-center`}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex gap-3">
              {['#4285F4', '#EA4335', '#FBBC04', '#34A853'].map((c, i) => (
                <motion.span
                  key={c}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)',
        }}
      />

      <ParticleSphere />

      {/* Navbar — Framer Motion driven smooth attached→island transition */}
      <motion.nav
        className="fixed z-50 flex items-center justify-between"
        style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
        initial={{ y: -80, opacity: 0 }}
        animate={isScrolled ? {
          y: 0,
          opacity: 1,
          top: 12,
          left: '50%',
          right: 'auto',
          x: '-50%',
          width: 'max-content',
          paddingLeft: 28,
          paddingRight: 28,
          height: 52,
          borderRadius: 999,
          backgroundColor: isDark ? 'rgba(30,30,34,0.85)' : 'rgba(255,255,255,0.78)',
          boxShadow: isDark ? '0 4px 28px rgba(0,0,0,0.3), 0 1px 6px rgba(0,0,0,0.2)' : '0 4px 28px rgba(0,0,0,0.07), 0 1px 6px rgba(0,0,0,0.04)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
        } : {
          y: 0,
          opacity: 1,
          top: 0,
          left: 0,
          right: 0,
          x: '0%',
          width: '100%',
          paddingLeft: 40,
          paddingRight: 40,
          height: 64,
          borderRadius: 0,
          backgroundColor: isDark ? 'rgba(15,15,16,0.90)' : 'rgba(255,255,255,0.82)',
          boxShadow: isDark ? '0 1px 0 rgba(255,255,255,0.05)' : '0 1px 0 rgba(0,0,0,0.06)',
          borderWidth: 0,
          borderColor: 'transparent',
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          borderRadius: { duration: 0.8, ease: "easeInOut" },
        }}
      >
        <button
          onClick={scrollToTop}
          className="font-bold tracking-tight text-lg flex items-center gap-2.5 hover:opacity-70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4285F4] rounded-lg p-1 group shrink-0"
          aria-label="Back to top"
        >
          <div className="flex gap-1.5 group-hover:gap-2 transition-all duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] group-hover:scale-110 transition-transform"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] group-hover:scale-110 transition-transform" style={{ transitionDelay: '50ms' }}></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04] group-hover:scale-110 transition-transform" style={{ transitionDelay: '100ms' }}></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] group-hover:scale-110 transition-transform" style={{ transitionDelay: '150ms' }}></span>
          </div>
        </button>

        <div className="flex items-center gap-6 ml-10">
          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-7 text-sm font-medium tracking-wide ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'}`}>
            <a href="#work" className="relative hover:text-[#202124] transition-colors focus:outline-none rounded px-1 py-1 group whitespace-nowrap">{t.nav.work}<span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#4285F4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" /></a>
            <a href="#about" className="relative hover:text-[#202124] transition-colors focus:outline-none rounded px-1 py-1 group whitespace-nowrap">{t.nav.exp}<span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#EA4335] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" /></a>
            <a href="#certs" className="relative hover:text-[#202124] transition-colors focus:outline-none rounded px-1 py-1 group whitespace-nowrap">{t.nav.certs}<span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#FBBC04] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" /></a>
            <a href="#skills" className="relative hover:text-[#202124] transition-colors focus:outline-none rounded px-1 py-1 group whitespace-nowrap">{t.nav.skills}<span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#34A853] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" /></a>
            <a href="mailto:gegecentianaputra@students.undip.ac.id" className="relative hover:text-[#202124] transition-colors focus:outline-none rounded px-1 py-1 group whitespace-nowrap">{t.nav.contact}<span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#4285F4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" /></a>
          </div>

          {/* Download CV */}
          <a
            href="mailto:gegecentianaputra@students.undip.ac.id?subject=Request%20CV"
            className={`hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 ${isDark ? 'bg-white text-[#202124] hover:bg-[#8AB4F8]' : 'bg-[#202124] text-white hover:bg-[#4285F4]'} text-xs font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#4285F4]/20 active:scale-95 shrink-0 whitespace-nowrap`}
          >
            <span className="symbol text-sm">download</span>
            {t.cv}
          </a>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className={`p-2 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/15 text-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-[#5F6368]'} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4285F4] shrink-0`}
            aria-label="Toggle Dark Mode"
          >
            <span className="symbol text-lg">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 px-3 py-1.5 ${isDark ? 'bg-white/10 hover:bg-white/15 text-[#9aa0a6]' : 'bg-gray-100 hover:bg-gray-200 text-[#5F6368]'} rounded-full text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#4285F4] shrink-0`}
            aria-label="Toggle Language"
          >
            <span className={lang === 'en' ? (isDark ? 'text-white' : 'text-[#202124]') : 'opacity-40'}>EN</span>
            <span className="opacity-20">/</span>
            <span className={lang === 'id' ? (isDark ? 'text-white' : 'text-[#202124]') : 'opacity-40'}>ID</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${isDark ? 'text-[#9aa0a6] hover:text-white' : 'text-[#5F6368] hover:text-[#202124]'} focus:outline-none focus:ring-2 focus:ring-[#4285F4] rounded-lg`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="symbol text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full-screen Glassmorphism */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-between pt-16"
            style={{ background: isDark ? 'rgba(15,15,16,0.95)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-col px-8 pt-8 gap-2">
              {[
                { id: '#work', label: t.nav.work, color: '#4285F4' },
                { id: '#about', label: t.nav.exp, color: '#EA4335' },
                { id: '#certs', label: t.nav.certs, color: '#FBBC04' },
                { id: '#skills', label: t.nav.skills, color: '#34A853' },
              ].map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`menu-item-enter flex items-center gap-4 text-3xl font-bold ${isDark ? 'text-[#e8eaed] border-white/10' : 'text-[#202124] border-gray-100'} text-left py-4 border-b hover:pl-2 transition-all duration-300`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: link.color }} />
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:gegecentianaputra@students.undip.ac.id"
                className="menu-item-enter flex items-center gap-4 text-3xl font-bold text-[#4285F4] text-left py-4"
                style={{ animationDelay: '320ms' }}
              >
                <span className="w-3 h-3 rounded-full shrink-0 bg-[#4285F4]" />
                {t.nav.contact}
              </a>
            </div>

            {/* Mobile menu footer */}
            <div className="px-8 pb-8">
              <a
                href="mailto:gegecentianaputra@students.undip.ac.id?subject=Request%20CV"
                className={`menu-item-enter flex items-center justify-center gap-2 w-full py-4 ${isDark ? 'bg-white text-[#202124] hover:bg-[#8AB4F8]' : 'bg-[#202124] text-white hover:bg-[#4285F4]'} font-bold rounded-2xl transition-all duration-300 mb-6`}
                style={{ animationDelay: '400ms' }}
              >
                <span className="symbol text-lg">download</span>
                {t.cv}
              </a>
              <div className="menu-item-enter flex justify-center gap-6 text-sm text-[#5F6368]" style={{ animationDelay: '480ms' }}>
                <a href="https://linkedin.com/in/gegecputra" target="_blank" rel="noreferrer" className="hover:text-[#4285F4] transition-colors">LinkedIn</a>
                <a href="https://github.com/grecoel" target="_blank" rel="noreferrer" className="hover:text-[#202124] transition-colors">GitHub</a>
                <a href="https://instagram.com/ggeantra" target="_blank" rel="noreferrer" className="hover:text-[#EA4335] transition-colors">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[100] p-4 ${isDark ? 'bg-[#1e1e22] border-white/10 text-[#9aa0a6]' : 'bg-white border-gray-100 text-[#5F6368]'} shadow-xl rounded-full border hover:text-[#4285F4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4285F4]`}
            aria-label="Scroll to top"
          >
            <span className="symbol text-xl">arrow_upward</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Section Progress Dots */}
      <SectionProgressDots activeSection={activeSection} isDark={isDark} />

      <main className="relative z-10">
        <ParallaxHero lang={lang} isDark={isDark} />

        {/* PROJECTS - Responsive Split */}
        <section id="work">
          <StickyScrollSection lang={lang} isDark={isDark} />
          <MobileProjectList lang={lang} isDark={isDark} />
        </section>

        {/* STATS COUNTER BAR */}
        <StatsCounterBar lang={lang} isDark={isDark} />

        {/* EXPERIENCE - Minimalist Timeline */}
        <section id="about" className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#0f0f10] border-white/5' : 'bg-white border-gray-100'} border-t`}>
          <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
            <div className="mb-16 section-reveal">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              </div>
              <h2 className={`heading-2 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{t.exp.title}</h2>
            </div>

            <div className={`border-l ${isDark ? 'border-white/10' : 'border-gray-200'} ml-4 md:ml-0 md:border-none space-y-12`}>
              {experience.map((job, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 relative pl-8 md:pl-0 ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} rounded-2xl p-6 md:p-8 transition-all duration-300 md:-mx-8 group section-reveal border-l-4 md:border-l-0`}
                  style={{ borderLeftColor: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'][i % 4] }}
                >
                  {/* Timeline Dot (Mobile) */}
                  <div className="absolute left-[-5px] top-10 w-2.5 h-2.5 rounded-full bg-gray-300 md:hidden group-hover:bg-[#4285F4] transition-colors"></div>

                  <div className="col-span-12 md:col-span-3">
                    <div className={`text-sm font-mono ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} py-1 border-l-2 border-transparent md:group-hover:border-[#4285F4] md:pl-4 transition-all flex flex-col gap-2`}>
                      <span>{job.time}</span>
                      {job.type && (
                        <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500 bg-white/5' : 'text-gray-400 bg-gray-100'} px-2 py-0.5 rounded-full w-fit`}>
                          {job.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-9">
                    <h3 className={`heading-4 mb-1 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{job.role}</h3>
                    <div className="heading-6 text-[#4285F4] mb-4">{job.org}</div>
                    {job.desc && <p className={`body ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} leading-relaxed`}>{job.desc}</p>}

                    {/* Sub-roles (for grouped positions) */}
                    {job.subRoles && (
                      <div className={`mt-6 space-y-4 border-l-2 ${isDark ? 'border-white/10' : 'border-gray-100'} pl-5`}>
                        {job.subRoles.map((sub, j) => (
                          <div key={j} className="flex flex-col gap-0.5 group/sub">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-semibold ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{sub.role}</span>
                              {sub.type && <span className="text-[11px] text-gray-400 font-mono">· {sub.type}</span>}
                            </div>
                            <span className="text-xs font-mono text-gray-400">{sub.time}</span>
                            {sub.desc && <p className={`text-sm ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} mt-0.5`}>{sub.desc}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS - List Layout (like experience) */}
        <section id="certs" className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#141416]' : 'bg-[#F8F9FA]'}`}>
          <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
            <div className="mb-16 section-reveal">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
                <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>
              <h2 className={`heading-2 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{t.certs.title}</h2>
            </div>

            <div className={`border-l ${isDark ? 'border-white/10' : 'border-gray-200'} ml-4 md:ml-0 md:border-none space-y-2`}>
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative pl-6 md:pl-0 ${isDark ? 'hover:bg-white/5' : 'hover:bg-white'} rounded-2xl px-6 md:px-8 py-4 md:py-5 transition-all duration-300 md:-mx-8 group section-reveal border-l-3 md:border-l-0`}
                  style={{ borderLeftColor: cert.color }}
                >
                  {/* Timeline Dot (Mobile) */}
                  <div
                    className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full md:hidden transition-colors group-hover:scale-125"
                    style={{ backgroundColor: cert.color }}
                  />

                  {/* Issuer + Year */}
                  <div className="col-span-12 md:col-span-3 flex flex-col justify-center">
                    <div className={`text-xs font-mono ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} py-1 border-l-2 border-transparent md:group-hover:border-[#4285F4] md:pl-4 transition-all`}>
                      <p className={`font-bold ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} opacity-70 text-xs uppercase tracking-widest mb-0.5`}>{cert.issuer}</p>
                      <p className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{cert.year}</p>
                    </div>
                  </div>

                  {/* Name + Skills */}
                  <div className="col-span-12 md:col-span-9 flex items-center gap-4">
                    <div
                      className="hidden md:flex w-7 h-7 rounded-full items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${cert.color}18`, color: cert.color }}
                    >
                      <span className="symbol text-base">verified</span>
                    </div>
                    <div>
                      <h3 className={`text-base font-semibold ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'} leading-snug mb-1 transition-colors`}>{cert.name}</h3>
                      <p className="text-sm text-gray-400">{cert.skills}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SKILLS SECTION */}
        <SkillsSection lang={lang} isDark={isDark} />


        {/* EDUCATION & LEADERSHIP */}
        <LeadershipSection lang={lang} isDark={isDark} />

        {/* FOOTER */}
        <footer className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#0f0f10]' : 'bg-white'} text-center relative overflow-hidden`}>
          {/* Subtle gradient accent at top of footer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4285F4]/20 to-transparent" />

          <div className="section-reveal px-[var(--page-margin)]">
            <h2 className={`font-[450] leading-[1.1] tracking-[-2px] text-[clamp(42px,5.5vw,110px)] mb-6 ${isDark ? 'text-[#e8eaed]' : 'text-[#202124]'}`}>{t.footer.cta}</h2>
            <div className="mx-auto mb-12 w-32 h-1.5 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853]" />

            {/* CTA button with gradient border */}
            <a
              href="mailto:gegecentianaputra@students.undip.ac.id"
              className={`group relative inline-flex items-center gap-4 px-10 md:px-16 py-5 md:py-7 ${isDark ? 'bg-white text-[#202124]' : 'bg-[#202124] text-white'} text-xl md:text-3xl rounded-full font-bold hover:shadow-[0_8px_40px_rgba(66,133,244,0.35)] transition-all duration-500 hover:scale-105 active:scale-95`}
            >
              <span className="relative z-10">{t.footer.btn}</span>
              <span className="symbol text-xl relative z-10 group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              {/* Hover gradient overlay */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            <div className={`mt-12 md:mt-16 ${isDark ? 'text-[#9aa0a6]' : 'text-[#5F6368]'} text-sm flex justify-center gap-6 md:gap-8 flex-wrap`}>
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/gegecputra', color: '#4285F4' },
                { label: 'GitHub', href: 'https://github.com/grecoel', color: '#202124' },
                { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Gege-Putra?ev=hdr_xprf', color: '#34A853' },
                { label: 'Instagram', href: 'https://instagram.com/ggeantra', color: '#EA4335' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative group/link hover:text-[#202124] transition-colors py-1 font-medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left"
                    style={{ backgroundColor: link.color }}
                  />
                </a>
              ))}
            </div>

            {/* Color dots divider */}
            <div className="mt-10 mb-4 flex justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] opacity-40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] opacity-40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04] opacity-40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] opacity-40" />
            </div>
            <p className="text-xs text-gray-400">© 2026 Gege Centiana Putra</p>
          </div>
        </footer>

      </main>
    </div >
  );
};

export default App;
