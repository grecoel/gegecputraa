import fs from 'fs';
let content = fs.readFileSync('src/App.jsx', 'utf8');

const t1 = `  const toggleDark = () => setIsDark(prev => !prev);`;
const r1 = `  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const toggleDark = () => {
    if (themeTransitioning) return;
    setThemeTransitioning(true);
    setTimeout(() => {
      setIsDark(prev => !prev);
    }, 400);
    setTimeout(() => {
      setThemeTransitioning(false);
    }, 1200);
  };`;

const t2 = `  return (
    <div className={\`\${isDark ? 'bg-[#000000] text-[#F5F5F7]' : 'bg-[#FAFAFA] text-[#1D1D1F]'} min-h-screen relative selection:bg-[#FF6B00] selection:text-white transition-colors duration-500\`}>


      {/* Entrance loader */}`;

const r2 = `  return (
    <div className={\`\${isDark ? 'bg-[#000000] text-[#F5F5F7]' : 'bg-[#FAFAFA] text-[#1D1D1F]'} min-h-screen relative selection:bg-[#FF6B00] selection:text-white transition-colors duration-500\`}>

      {/* Theme Transition Overlay */}
      <AnimatePresence>
        {themeTransitioning && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)', opacity: 1 }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 40px)', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none shimmer-bg"
          />
        )}
      </AnimatePresence>

      {/* Entrance loader */}`;

if (content.includes('const toggleDark = () => setIsDark(prev => !prev);')) {
    content = content.replace(t1, r1);
    content = content.replace(t2, r2);
    fs.writeFileSync('src/App.jsx', content, 'utf8');
    console.log('App.jsx updated');
} else {
    console.log('toggleDark not found in App.jsx');
}
