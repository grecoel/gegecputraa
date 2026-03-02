import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useMotionValue } from 'framer-motion';
import ParticleSphere from './components/ParticleSphere';

// MagneticCursor removed — cursor uses system default


// --- VISUAL ASSETS ---

const CodeDecoration = () => {
  const codeString = `const create = Object.create;
const define = Object.defineProperty
  , props = Object.defineProperties
  , desc = Object.getOwnPropertyDescriptor
  , descs = Object.getOwnPropertyDescriptors`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.015] select-none flex items-center justify-center">
      <pre className="text-xs md:text-sm font-mono leading-relaxed text-black dark:text-white text-left whitespace-pre-wrap max-w-6xl w-full p-8 grayscale">
        {codeString}
      </pre>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] dark:from-[#000000] via-transparent to-[#FAFAFA] dark:to-[#000000]" />
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
    color: "#FF6B00",
    icon: "trophy",
  },
  {
    title: "LokaLoka",
    category: "SME Marketplace",
    desc: "Empowering small businesses with a comprehensive digital storefront. Led the system architecture design, focusing on scalable product management and secure payment gateways.",
    tech: ["System Architecture", "Lead Dev"],
    color: "#F97316", // Coral
    icon: "storefront",
  },
  {
    title: "Project Lunpia",
    category: "AI & GIS",
    desc: "Mapping urban vegetation in real-time. Utilizes Satellite Imagery (NDVI) and Machine Learning to provide actionable environmental insights for city planning.",
    tech: ["Python Flask", "ML", "Google Earth Engine"],
    color: "#1B3A6B", // Navy
    icon: "satellite_alt",
  },
  {
    title: "GEMAS",
    category: "Student Ecosystem",
    desc: "A dedicated marketplace for university students. Managed the entire project lifecycle using ICONIX methodology, from rigorous use-case modeling to deployment.",
    tech: ["Spring Boot", "ICONIX", "React"],
    color: "#5B21B6", // Violet
    icon: "school",
  },
  {
    title: "JDT System",
    category: "Corporate Management",
    desc: "A comprehensive digital dashboard tailored for POD, Trainers, and Recruitment tracking. Designed for enterprise-level visibility and seamless user flow.",
    tech: ["Next.js", "Enterprise", "UI/UX"],
    color: "#FF6B00",
    icon: "dashboard",
  }
];

const certifications = [
  {
    name: "CS50's Introduction to AI with Python",
    issuer: "Harvard University",
    year: "2025",
    color: "#FF6B00",
    skills: "Deep Learning · Neural Networks · Python"
  },
  {
    name: "CS50's Web Programming with Python & JS",
    issuer: "Harvard University",
    year: "2025",
    color: "#1B3A6B",
    skills: "Django · React · CI/CD"
  },
  {
    name: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2025",
    color: "#5B21B6",
    skills: "C · Python · SQL · Algorithms"
  },
  {
    name: "Belajar Penerapan AI Generatif untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#F59E0B",
    skills: "Artificial Intelligence (AI)"
  },
  {
    name: "API Testing and Development with Postman",
    issuer: "Apollo GraphQL",
    year: "2025",
    color: "#FF6B00",
    skills: "API · API Testing"
  },
  {
    name: "Belajar Penggunaan Generative AI",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#1B3A6B",
    skills: "Generative AI"
  },
  {
    name: "GraphQL: Associate",
    issuer: "Apollo GraphQL",
    year: "2025",
    color: "#5B21B6",
    skills: "GraphQL · Apollo GraphQL"
  },
  {
    name: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#F59E0B",
    skills: "RESTful APIs · JavaScript"
  },
  {
    name: "Belajar Pengembangan Machine Learning dengan AWS",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#FF6B00",
    skills: "AWS Cloud · Generative AI"
  },
  {
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2025",
    color: "#1B3A6B",
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

// --- INTERACTIVE: 3D Tilt Card Header ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30, bounce: 0 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    // Only apply hover effects on devices with pointing cursors
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group/tilt ${className || ''}`}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        <div style={{ transform: "translateZ(20px)" }} className="w-full h-full relative z-10 block pointer-events-auto">
          {children}
        </div>
        {/* Subtle dynamic glow that follows the mouse inside the card */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit z-0 opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [springX, springY],
              ([latestX, latestY]) => `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(255, 107, 0, 0.08) 0%, transparent 60%)`
            )
          }}
        />
      </motion.div>
    </motion.div>
  );
};

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
    <div ref={containerRef} className={`relative h-[300vh] ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F7]'}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-[var(--page-margin)] grid grid-cols-1 md:grid-cols-2 gap-16 items-center h-full max-h-[800px]">

          {/* LEFT: Text Content */}
          <div className="relative z-10 w-full">
            <div className={`h-px w-12 mb-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
            <h2 className={`heading-2 mb-12 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{text.title}</h2>

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
                  <h3 className={`heading-3 mb-6 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{project.title}</h3>
                  <p className={`body ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} mb-8 text-lg leading-relaxed max-w-lg`}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`px-3 py-1 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/8'} border rounded-full text-sm ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>
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
          <TiltCard className="w-full">
            <div className={`relative h-[400px] w-full ${isDark ? 'bg-[#1C1C1E] border-white/8' : 'bg-white border-black/5'} rounded-[32px] shadow-2xl border overflow-hidden flex items-center justify-center`}>
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

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                <div className={`h-1.5 w-28 ${isDark ? 'bg-white/10' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                  <motion.div
                    className="h-full rounded-full shimmer-bg"
                    animate={{ width: `${((activeCard + 1) / projects.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-400 tabular-nums">0{activeCard + 1} / 0{projects.length}</span>
              </div>
            </div>
          </TiltCard>

        </div>
      </div>
    </div>
  );
};

const MobileProjectList = ({ lang, isDark }) => {
  const text = TRANSLATIONS[lang].work;
  return (
    <div className={`py-[var(--space-2xl)] ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F7]'}`}>
      <div className="grid-container">
        <h2 className={`heading-2 mb-8 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{text.mobileTitle}</h2>
        <div className="space-y-8">
          {projects.map((project, i) => (
            <TiltCard key={i} className="rounded-2xl">
              <div className={`${isDark ? 'bg-[#1C1C1E] border-white/8' : 'bg-white border-black/5'} rounded-2xl p-6 border shadow-sm relative overflow-hidden h-full`}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className={`symbol text-[80px]`} style={{ color: project.color }}>{project.icon}</span>
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: project.color }}>
                    {project.category}
                  </span>
                  <h3 className={`heading-4 mb-2 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{project.title}</h3>
                  <p className={`body ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} mb-4 text-sm leading-relaxed`}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t, k) => (
                      <span key={k} className={`px-2 py-1 ${isDark ? 'bg-white/5 border-white/8' : 'bg-gray-50 border-black/5'} border rounded text-xs ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <WIPButton color={project.color} lang={lang} />
                </div>
              </div>
            </TiltCard>
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
    { label: "Full Stack Dev", color: "#FF6B00", x: "7%", y: "24%", delay: 2.0 },
    { label: "Data Engineer", color: "#5B21B6", x: "78%", y: "18%", delay: 2.3 },
    { label: "AI Researcher", color: "#1B3A6B", x: "82%", y: "66%", delay: 2.6 },
    { label: "Harvard CS50", color: "#F59E0B", x: "5%", y: "70%", delay: 2.9 },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-[var(--page-margin)] overflow-hidden">
      <CodeDecoration />

      {/* Ambient soft light blobs — tri-color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-[#FF6B00] opacity-[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-[#5B21B6] opacity-[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-[-5%] w-[450px] h-[450px] bg-[#1B3A6B] opacity-[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Floating keyword badges — parallax to mouse */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-white/5 border-white/8' : 'bg-white/70 border-black/5'} backdrop-blur-md rounded-full border shadow-sm text-xs font-bold tracking-wide pointer-events-none select-none z-10`}
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
                className={`inline-block pb-3 text-transparent bg-clip-text ${isDark ? 'bg-gradient-to-br from-[#ffffff] via-[#F5F5F7] to-[#A1A1A6]' : 'bg-gradient-to-br from-[#1D1D1F] via-[#1D1D1F] to-[#6E6E73]'} drop-shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${char === ' ' ? 'w-[0.3em]' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Accent gradient bar */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, #FF6B00, #F97316, #F59E0B)' }}
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
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
                const c = isDark ? '#F5F5F7' : '#1D1D1F';
                const bg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
                const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-sm"
                    style={{ color: c, backgroundColor: bg, border: `1px solid ${border}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#FF6B00' }} />
                    {part}
                  </span>
                );
              })}
            </div>
            <p className={`heading-4 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} font-semibold leading-snug max-w-xl text-center`}>
              {text.subtitle2.split('real-world').map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>{part}<span className="shimmer-text">real-world</span></span>
                ) : <span key={i}>{part}</span>
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Social links + interactive typing role */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Social icon row */}
        <div className="flex items-center gap-3">
          {[
            {
              href: 'https://github.com/grecoel',
              label: 'GitHub',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )
            },
            {
              href: 'https://linkedin.com/in/gegecputra',
              label: 'LinkedIn',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )
            },
            {
              href: 'https://www.researchgate.net/profile/Gege-Putra?ev=hdr_xprf',
              label: 'ResearchGate',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M14.793 12.098c.785-.246 1.37-.624 1.756-1.134.384-.51.576-1.14.576-1.89 0-.62-.14-1.17-.42-1.648-.28-.48-.71-.859-1.292-1.14-.58-.28-1.32-.42-2.22-.42H8.66v9.876h1.89V12.5h2.25l2.51 3.242h2.25l-2.77-3.644zm-4.243-.96V8.726h2.18c.76 0 1.318.158 1.674.474.356.316.534.77.534 1.36 0 .59-.178 1.038-.534 1.344-.356.306-.914.459-1.674.459h-2.18zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              )
            },
          ].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-sm transition-colors duration-200 ${isDark
                ? 'bg-white/6 border-white/12 text-[#A1A1A6] hover:text-white hover:border-white/25'
                : 'bg-black/4 border-black/8 text-[#6E6E73] hover:text-[#1D1D1F] hover:border-black/20'
                }`}
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
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
        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} opacity-50 group-hover:opacity-100 transition-opacity`}>
          Scroll
        </span>
        <motion.div className={`w-5 h-9 rounded-full border-2 ${isDark ? 'border-white/15' : 'border-black/10'} flex justify-center pt-2 group-hover:border-[#FF6B00]/50 transition-colors`}>
          <motion.div
            className={`w-0.5 h-2 rounded-full ${isDark ? 'bg-white/30' : 'bg-black/20'} group-hover:bg-[#FF6B00] transition-colors`}
            animate={{ y: [0, 7, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- LEADERSHIP SECTION COMPONENT ---
const ORG_COLORS = ['#FF6B00', '#1B3A6B', '#5B21B6', '#F59E0B', '#FF6B00', '#1B3A6B', '#5B21B6', '#F59E0B'];

const LeadershipSection = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F7]'}`}>
      <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* EDUCATION */}
          <div className="lg:col-span-4 transition-all duration-700">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} mb-8`}>{t.edu.title}</h3>
            <div className={`${isDark ? 'bg-[#1C1C1E] border-white/8' : 'bg-white border-black/5'} p-8 rounded-3xl border shadow-sm hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center gap-4 mb-8">
                <span className="symbol text-5xl text-[#FF6B00]">school</span>
                <div>
                  <h4 className={`heading-4 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>Undip</h4>
                  <p className="text-sm text-gray-500 font-medium">Semarang, Indonesia</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-bold ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} mb-1`}>Bachelor of Informatics</h4>
                  <p className={`text-sm font-mono ${isDark ? 'text-[#A1A1A6] bg-white/5' : 'text-[#86868B] bg-gray-50'} inline-block px-2 py-1 rounded`}>2023 – Present</p>
                  <p className="text-sm text-gray-500 mt-2">Specializing in Artificial Intelligence and Deep Learning systems.</p>
                </div>
                <div className={`border-t ${isDark ? 'border-white/10' : 'border-gray-100'} pt-6`}>
                  <h4 className={`text-base font-bold ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} mb-1`}>SMA Negeri 1 Bandar</h4>
                  <p className="text-sm text-[#FF6B00] font-medium">Natural Sciences (94.6/100)</p>
                </div>
              </div>
            </div>
          </div>

          {/* LEADERSHIP — stable list */}
          <div className="lg:col-span-8">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} mb-8 transition-all duration-700`}>
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
                    <p className={`text-sm font-semibold ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} leading-snug mb-0.5
                                  group-hover:text-[#FF6B00] transition-colors duration-200`}>
                      {item.role}
                    </p>
                    <p className={`text-xs font-bold ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} mb-1`}>{item.org}</p>
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
const SKILL_COLORS = ['#FF6B00', '#1B3A6B', '#5B21B6', '#F59E0B', '#FF6B00', '#1B3A6B', '#5B21B6'];

const SkillsSection = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];
  const entries = Object.entries(skills);

  return (
    <section id="skills" className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#000000]' : 'bg-white'}`}>
      <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">

        {/* Heading */}
        <div className="mb-16 transition-all duration-700">
          <div className={`h-px w-12 mb-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
          <h2 className={`heading-2 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{t.skills.title}</h2>
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
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>
                  {category}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>{items.length}</span>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-sm rounded-lg border ${isDark ? 'border-white/8 text-[#A1A1A6] bg-transparent hover:border-[#FF6B00]/50 hover:text-[#FF6B00] hover:bg-[#FF6B00]/8' : 'border-black/8 text-[#86868B] bg-white hover:border-[#FF6B00]/50 hover:text-[#FF6B00] hover:bg-[#FF6B00]/5'}
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

const StatsCounterBar = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];
  const stats = [
    { value: 5, suffix: '+', label: t.stats.internships, color: '#FF6B00' },
    { value: certifications.length, suffix: '+', label: t.stats.certs, color: '#1B3A6B' },
    { value: 10, suffix: '+', label: t.stats.projects, color: '#5B21B6' },
    { value: Object.keys(skills).length, suffix: '+', label: t.stats.skillAreas, color: '#F59E0B' },
  ];
  return (
    <div className={`py-12 md:py-16 ${isDark ? 'bg-[#000000] border-white/5' : 'bg-white border-black/5'} border-y`}>
      <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const { count, ref } = useAnimatedCounter(stat.value);
            return (
              <div key={i} ref={ref} className="text-center group">
                <div className={`counter-number text-4xl md:text-5xl font-bold ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} mb-2 transition-colors group-hover:text-[var(--hover-color)]`} style={{ '--hover-color': stat.color }}>
                  {count}{stat.suffix}
                </div>
                <div className={`text-xs md:text-sm font-semibold uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>{stat.label}</div>
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
  { id: 'work', color: '#FF6B00' },
  { id: 'about', color: '#1B3A6B' },
  { id: 'certs', color: '#5B21B6' },
  { id: 'skills', color: '#F59E0B' },
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

// --- CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose, isDark, lang }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/20'} backdrop-blur-sm`}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDark ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/5'} border`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
            >
              <span className="symbol text-sm">close</span>
            </button>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>Let's Connect</h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully!"); onClose(); }}>
              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Name</label>
                <input required type="text" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all bg-transparent ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} placeholder="John Doe" />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Email</label>
                <input required type="email" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all bg-transparent ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} placeholder="john@example.com" />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 uppercase tracking-widest ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Message</label>
                <textarea required rows={4} className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all bg-transparent ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'} resize-none`} placeholder="Hello Gege..." />
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-[#FF6B00] text-white font-bold tracking-wide hover:bg-[#F97316] active:scale-[0.98] transition-all shadow-md mt-6">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- APP COMPONENT ---
const App = () => {
  const [lang, setLang] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const [themeTransitioning, setThemeTransitioning] = useState(false);

  const toggleDark = () => {
    if (themeTransitioning) return;
    setThemeTransitioning(true);

    // Switch the logical theme right in the middle of the cover-up animation (at 500ms)
    setTimeout(() => {
      setIsDark(prev => !prev);
    }, 600);

    // Release the animation lock after all staggered layers finish (1.5s total)
    setTimeout(() => {
      setThemeTransitioning(false);
    }, 1500);
  };

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
    <div className={`${isDark ? 'bg-[#000000] text-[#F5F5F7]' : 'bg-[#FAFAFA] text-[#1D1D1F]'} min-h-screen relative selection:bg-[#FF6B00] selection:text-white transition-colors duration-500`}>

      {/* Staggered Colorful Theme Transition Overlay */}
      <AnimatePresence>
        {themeTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #FF6B00 0%, #F97316 25%, #1B3A6B 75%, #5B21B6 100%)',
              backgroundSize: '400% 400%'
            }}
            initial={{ clipPath: 'circle(0% at center)', opacity: 0 }}
            animate={{
              clipPath: 'circle(150% at center)',
              opacity: 1,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.32, 0.72, 0, 1]
            }}
          />
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        isDark={isDark}
        lang={lang}
      />

      {/* Entrance loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className={`fixed inset-0 z-[200] ${isDark ? 'bg-[#000000]' : 'bg-[#FAFAFA]'} flex items-center justify-center`}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-10 h-10">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{ borderTopColor: '#2997FF', borderRightColor: '#BF5AF2' }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border-2 border-transparent"
                style={{ borderBottomColor: '#AC8FFF', borderLeftColor: '#64D2FF' }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar — inside navbar, below its bottom edge, follows island shape */}

      <ParticleSphere />

      {/* Navbar */}
      <motion.nav
        className="fixed z-50"
        style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
        initial={{ y: -80, opacity: 0 }}
        animate={isScrolled ? {
          y: 0, opacity: 1,
          top: 12, left: '50%', right: 'auto', x: '-50%',
          width: 'auto', minWidth: 520,
          paddingLeft: 20, paddingRight: 20,
          height: 48, borderRadius: 999,
          backgroundColor: isDark ? 'rgba(20,20,22,0.82)' : 'rgba(255,255,255,0.78)',
          boxShadow: isDark
            ? '0 4px 30px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.06)'
            : '0 2px 20px rgba(0,0,0,0.08), inset 0 0.5px 0 rgba(255,255,255,0.9)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
        } : {
          y: 0, opacity: 1,
          top: 0, left: 0, right: 0, x: '0%',
          width: '100%',
          paddingLeft: 48, paddingRight: 48,
          height: 60, borderRadius: 0,
          backgroundColor: isDark ? 'rgba(0,0,0,0.80)' : 'rgba(250,250,250,0.88)',
          boxShadow: isDark ? '0 1px 0 rgba(255,255,255,0.04)' : '0 1px 0 rgba(0,0,0,0.05)',
          borderWidth: 0, borderColor: 'transparent',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], borderRadius: { duration: 0.6 } }}
      >
        {/* Inner: 3 sections */}
        <div className="flex items-center justify-between h-full gap-4">

          {/* LEFT: Logo / Brand */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 shrink-0 group focus:outline-none"
            aria-label="Back to top"
          >
            <div className="flex items-center gap-[3px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#FF6B00] group-hover:scale-110 transition-transform duration-200" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#F97316] group-hover:scale-110 transition-transform duration-200 delay-[30ms]" />
              <span className="w-[7px] h-[7px] rounded-full bg-[#F59E0B] group-hover:scale-110 transition-transform duration-200 delay-[60ms]" />
            </div>
            <span className={`text-sm font-semibold tracking-tight hidden sm:block ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} group-hover:opacity-70 transition-opacity`}>
              GCP
            </span>
          </button>

          {/* CENTER: Nav Links — desktop only */}
          <div className={`hidden md:flex items-center gap-1 text-sm font-medium ${isDark ? 'text-[#A1A1A6]' : 'text-[#6E6E73]'}`}>
            {[
              { href: '#work', label: t.nav.work },
              { href: '#about', label: t.nav.exp },
              { href: '#certs', label: t.nav.certs },
              { href: '#skills', label: t.nav.skills },
              { isContact: true, label: t.nav.contact },
            ].map((link, idx) => (
              link.isContact ? (
                <button
                  key={idx}
                  onClick={() => setIsContactModalOpen(true)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap hover:bg-[#FF6B00]/10 ${isDark ? 'hover:text-white' : 'hover:text-[#1D1D1F]'} focus:outline-none`}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap hover:bg-[#FF6B00]/10 ${isDark ? 'hover:text-white' : 'hover:text-[#1D1D1F]'} focus:outline-none`}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* RIGHT: Utility actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* CV Button */}
            <a
              href="mailto:gegecentianaputra@students.undip.ac.id?subject=Request%20CV"
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 ${isDark
                ? 'bg-[#FF6B00] text-white hover:bg-[#F97316]'
                : 'bg-[#FF6B00] text-white hover:bg-[#F97316]'
                } shadow-sm hover:shadow-[0_2px_12px_rgba(255,107,0,0.4)]`}
            >
              {t.cv}
            </a>

            {/* Dark/Light toggle */}
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none ${isDark ? 'text-[#A1A1A6] hover:text-white hover:bg-white/8' : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'}`}
              aria-label="Toggle Dark Mode"
            >
              <span className="symbol text-[18px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none ${isDark ? 'text-[#A1A1A6] hover:text-white hover:bg-white/8' : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'}`}
              aria-label="Toggle Language"
            >
              {lang === 'en' ? 'EN' : 'ID'}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 rounded-full transition-all duration-200 focus:outline-none ${isDark ? 'text-[#A1A1A6] hover:text-white hover:bg-white/8' : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="symbol text-xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Progress bar — directly attached inside the navbar, hugs the bottom border */}
        <motion.div
          className="absolute overflow-hidden pointer-events-none"
          style={{ bottom: isScrolled ? -1 : 0 }}
          animate={isScrolled ? {
            left: 24, right: 24, // Inset to avoid sticking out of the 999px rounded pill corners
            height: 3,
            borderRadius: '999px',
          } : {
            left: 0, right: 0,
            height: 2,
            borderRadius: 0,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], borderRadius: { duration: 0.6 } }}
        >
          <motion.div
            className="h-full origin-left shimmer-bg"
            style={{ scaleX }}
          />
        </motion.div>
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
            style={{ background: isDark ? 'rgba(0,0,0,0.96)' : 'rgba(250,250,250,0.96)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}
          >
            <div className="flex flex-col px-8 pt-8 gap-2">
              {[
                { id: '#work', label: t.nav.work, color: '#FF6B00' },
                { id: '#about', label: t.nav.exp, color: '#F97316' },
                { id: '#certs', label: t.nav.certs, color: '#F59E0B' },
                { id: '#skills', label: t.nav.skills, color: '#EAB308' },
              ].map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`menu-item-enter w-full flex items-center gap-4 text-3xl font-bold text-left py-4 border-b transition-all duration-300 ${isDark
                    ? 'text-[#F5F5F7] border-white/10 hover:bg-white/5 hover:pl-4'
                    : 'text-[#1D1D1F] border-black/5 hover:bg-black/5 hover:pl-4'
                    }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="w-3 h-3 rounded-full shrink-0 shadow-[0_0_8px_rgba(255,107,0,0.5)]" style={{ backgroundColor: link.color }} />
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:gegecentianaputra@students.undip.ac.id"
                className="menu-item-enter flex items-center gap-4 text-3xl font-bold text-[#FF6B00] text-left py-4"
                style={{ animationDelay: '320ms' }}
              >
                <span className="w-3 h-3 rounded-full shrink-0 bg-[#FF6B00]" />
                {t.nav.contact}
              </a>
            </div>

            {/* Mobile menu footer */}
            <div className="px-8 pb-8">
              <a
                href="mailto:gegecentianaputra@students.undip.ac.id?subject=Request%20CV"
                className={`menu-item-enter flex items-center justify-center gap-2 w-full py-4 bg-[#FF6B00] text-white hover:bg-[#F97316] font-bold rounded-2xl transition-all duration-300 mb-6`}
                style={{ animationDelay: '400ms' }}
              >
                <span className="symbol text-lg">download</span>
                {t.cv}
              </a>
              <div className={`menu-item-enter flex justify-center gap-6 text-sm ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`} style={{ animationDelay: '480ms' }}>
                <a href="https://linkedin.com/in/gegecputra" target="_blank" rel="noreferrer" className="hover:text-[#FF6B00] transition-colors">LinkedIn</a>
                <a href="https://github.com/grecoel" target="_blank" rel="noreferrer" className={`${isDark ? 'hover:text-white' : 'hover:text-[#1D1D1F]'} transition-colors`}>GitHub</a>
                <a href="https://instagram.com/ggeantra" target="_blank" rel="noreferrer" className="hover:text-[#BF5AF2] transition-colors">Instagram</a>
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
            className={`fixed bottom-8 right-8 z-[100] p-4 ${isDark ? 'bg-[#1C1C1E] border-white/8 text-[#A1A1A6]' : 'bg-white border-black/5 text-[#86868B]'} shadow-xl rounded-full border hover:text-[#FF6B00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00]`}
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
          {isMobile ? (
            <MobileProjectList lang={lang} isDark={isDark} />
          ) : (
            <StickyScrollSection lang={lang} isDark={isDark} />
          )}
        </section>

        {/* STATS COUNTER BAR */}
        <StatsCounterBar lang={lang} isDark={isDark} />

        {/* EXPERIENCE - Minimalist Timeline */}
        <section id="about" className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#000000] border-white/5' : 'bg-white border-black/5'} border-t`}>
          <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
            <div className="mb-16 section-reveal">
              <div className={`h-px w-12 mb-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
              <h2 className={`heading-2 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{t.exp.title}</h2>
            </div>

            <div className={`border-l ${isDark ? 'border-white/10' : 'border-gray-200'} ml-4 md:ml-0 md:border-none space-y-12`}>
              {experience.map((job, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 relative pl-8 md:pl-0 ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} rounded-2xl p-6 md:p-8 transition-all duration-300 md:-mx-8 group section-reveal border-l-4 md:border-l-0`}
                  style={{ borderLeftColor: ['#FF6B00', '#F97316', '#F59E0B', '#EAB308'][i % 4] }}
                >
                  {/* Timeline Dot (Mobile) */}
                  <div className="absolute left-[-5px] top-10 w-2.5 h-2.5 rounded-full bg-gray-300 md:hidden group-hover:bg-[#FF6B00] transition-colors"></div>

                  <div className="col-span-12 md:col-span-3">
                    <div className={`text-sm font-mono ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} py-1 border-l-2 border-transparent md:group-hover:border-[#FF6B00] md:pl-4 transition-all flex flex-col gap-2`}>
                      <span>{job.time}</span>
                      {job.type && (
                        <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500 bg-white/5' : 'text-gray-400 bg-gray-100'} px-2 py-0.5 rounded-full w-fit`}>
                          {job.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-9">
                    <h3 className={`heading-4 mb-1 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{job.role}</h3>
                    <div className="heading-6 text-[#FF6B00] mb-4">{job.org}</div>
                    {job.desc && <p className={`body ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} leading-relaxed`}>{job.desc}</p>}

                    {/* Sub-roles (for grouped positions) */}
                    {job.subRoles && (
                      <div className={`mt-6 space-y-4 border-l-2 ${isDark ? 'border-white/10' : 'border-gray-100'} pl-5`}>
                        {job.subRoles.map((sub, j) => (
                          <div key={j} className="flex flex-col gap-0.5 group/sub">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-semibold ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{sub.role}</span>
                              {sub.type && <span className="text-[11px] text-gray-400 font-mono">· {sub.type}</span>}
                            </div>
                            <span className="text-xs font-mono text-gray-400">{sub.time}</span>
                            {sub.desc && <p className={`text-sm ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} mt-0.5`}>{sub.desc}</p>}
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
        <section id="certs" className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F7]'}`}>
          <div className="container mx-auto px-[var(--page-margin)] max-w-6xl">
            <div className="mb-16 section-reveal">
              <div className={`h-px w-12 mb-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
              <h2 className={`heading-2 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>{t.certs.title}</h2>
            </div>

            <div className={`border-l ${isDark ? 'border-white/10' : 'border-gray-200'} ml-4 md:ml-0 md:border-none space-y-2`}>
              {certifications.map((cert, i) => (
                <TiltCard key={i} className="mb-2">
                  <div
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative pl-6 md:pl-0 ${isDark ? 'hover:bg-white/5' : 'hover:bg-white'} rounded-2xl px-6 md:px-8 py-4 md:py-5 transition-all duration-300 md:-mx-8 group border-l-3 md:border-l-0 border-transparent shadow-[0_2px_12px_rgba(0,0,0,0)] hover:shadow-lg`}
                    style={{ borderLeftColor: cert.color }}
                  >
                    {/* Timeline Dot (Mobile) */}
                    <div
                      className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full md:hidden transition-colors group-hover:scale-125"
                      style={{ backgroundColor: cert.color }}
                    />

                    {/* Issuer + Year */}
                    <div className="col-span-12 md:col-span-3 flex flex-col justify-center">
                      <div className={`text-xs font-mono ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} py-1 border-l-2 border-transparent md:group-hover:border-[#FF6B00] md:pl-4 transition-all`}>
                        <p className={`font-bold ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} opacity-70 text-xs uppercase tracking-widest mb-0.5`}>{cert.issuer}</p>
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
                        <h3 className={`text-base font-semibold ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} leading-snug mb-1 transition-colors`}>{cert.name}</h3>
                        <p className="text-sm text-gray-400">{cert.skills}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>


        {/* SKILLS SECTION */}
        <SkillsSection lang={lang} isDark={isDark} />


        {/* EDUCATION & LEADERSHIP */}
        <LeadershipSection lang={lang} isDark={isDark} />

        {/* FOOTER */}
        <footer className={`py-[var(--space-7xl)] ${isDark ? 'bg-[#000000]' : 'bg-white'} text-center relative overflow-hidden`}>
          {/* Subtle gradient accent at top of footer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />

          <div className="section-reveal px-[var(--page-margin)]">
            <h2 className={`font-[450] leading-[1.1] tracking-[-2px] text-[clamp(42px,5.5vw,110px)] mb-6 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
              {t.footer.cta.split(/(remarkable\?|luar biasa\?)/i).map((part, i) =>
                /^(remarkable\?|luar biasa\?)$/i.test(part)
                  ? <span key={i} className="shimmer-text">{part}</span>
                  : <span key={i}>{part}</span>
              )}
            </h2>
            <div className="mx-auto mb-12 w-32 h-[2px] rounded-full bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#F59E0B]" />

            {/* CTA button */}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className={`group relative inline-flex items-center gap-4 px-10 md:px-16 py-5 md:py-7 ${isDark ? 'bg-white text-[#1D1D1F]' : 'bg-[#1D1D1F] text-white'} text-xl md:text-3xl rounded-full font-bold hover:shadow-[0_8px_40px_rgba(255,107,0,0.3)] transition-all duration-500 hover:scale-105 active:scale-95`}
            >
              <span className="shimmer-text relative z-10">{t.footer.btn}</span>
              <span className={`symbol text-3xl group-hover:translate-x-2 transition-transform duration-300 shimmer-text relative z-10`}>arrow_forward</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <div className={`mt-12 md:mt-16 ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'} text-sm flex justify-center gap-6 md:gap-8 flex-wrap`}>
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/gegecputra', color: '#FF6B00' },
                { label: 'GitHub', href: 'https://github.com/grecoel', color: isDark ? '#F5F5F7' : '#1D1D1F' },
                { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Gege-Putra?ev=hdr_xprf', color: '#F97316' },
                { label: 'Instagram', href: 'https://instagram.com/ggeantra', color: '#F59E0B' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative group/link ${isDark ? 'hover:text-white' : 'hover:text-[#1D1D1F]'} transition-colors py-1 font-medium`}
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

            {/* Gradient divider */}
            <div className="mt-10 mb-4 flex justify-center">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />
            </div>
            <p className={`text-xs ${isDark ? 'text-[#6E6E73]' : 'text-gray-400'}`}>© 2026 Gege Centiana Putra</p>
          </div>
        </footer>

      </main>
    </div >
  );
};

export default App;
