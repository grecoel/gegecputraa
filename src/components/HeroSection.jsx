import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-16">

            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] google-glow rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] google-glow rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-google-text-secondary mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Online
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="block text-white mb-2">Build the</span>
                    <span className="text-gradient">Future Standard</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-google-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Architecting advanced digital ecosystems with precision and foresight.
                    Turning complex problems into elegant, scalable solutions.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a href="#ecosystem" className="group relative px-8 py-4 rounded-full bg-white text-google-base font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                        Explore Ecosystem
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a href="#mission" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95">
                        Mission Brief
                    </a>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-google-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest opacity-50">Scroll</span>
                    <ChevronDown className="w-5 h-5 animate-bounce opacity-75" />
                </div>
            </motion.div>

        </section>
    );
};

export default HeroSection;
