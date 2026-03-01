import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Cpu } from 'lucide-react';

const projects = [
    {
        title: 'Neural Nexus',
        description: 'Autonomous agent orchestration platform built for high-throughput data processing.',
        tech: ['Python', 'TensorFlow', 'React'],
        icon: <Terminal className="w-6 h-6 text-google-blue" />,
        link: '#',
    },
    {
        title: 'Quantum Core',
        description: 'Next-generation state management system for distributed applications.',
        tech: ['Rust', 'WASM', 'WebGL'],
        icon: <Cpu className="w-6 h-6 text-google-purple" />,
        link: '#',
    },
    {
        title: 'Starlight UI',
        description: 'A component library focusing on glassmorphism and advanced animations.',
        tech: ['TypeScript', 'Tailwind', 'Framer Motion'],
        icon: <ExternalLink className="w-6 h-6 text-pink-400" />,
        link: '#',
    },
];

const FeatureGrid = () => {
    return (
        <section id="ecosystem" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="mb-16">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-google-blue font-medium tracking-wider text-sm uppercase mb-4 block"
                >
                    Ecosystem
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    Active Directives
                </motion.h2>
                <div className="h-1 w-20 bg-gradient-to-r from-google-blue to-google-purple rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-8 rounded-3xl bg-google-surface/30 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 hover:bg-google-surface/50 overflow-hidden"
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-google-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit border border-white/5 backdrop-blur-sm">
                                {project.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-google-blue transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-google-text-secondary mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 text-xs font-medium text-google-text-secondary bg-white/5 rounded-full border border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <a href={project.link} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-google-blue transition-colors">
                                View Protocol <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
