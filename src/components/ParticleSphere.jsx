import React, { useRef, useEffect } from 'react';

// --- Module-level constants (stable across re-renders) ---
// Google color palette — weighted toward blue
const PALETTE = [
    [66, 133, 244],  // Blue
    [66, 133, 244],  // Blue (extra weight)
    [234, 67, 53],   // Red
    [251, 188, 4],   // Yellow
    [52, 168, 83],   // Green
    [95, 99, 104],   // Gray accent
];

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 550;
const SPHERE_RADIUS = 1800;
const SPEED_BASE = 3.5;
const FISHEYE_STRENGTH = 0.9;
const MOUSE_GLOW_RADIUS = 400;

const ParticleSphere = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const cursor = useRef({ x: 0, y: 0 });
    const smoothCursor = useRef({ x: 0, y: 0 });
    const mouseActive = useRef(false);
    const scrollY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const initParticle = (reset = false) => {
            const spread = 2400;
            const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            return {
                x: (Math.random() - 0.5) * spread,
                y: (Math.random() - 0.5) * spread,
                z: reset
                    ? SPHERE_RADIUS + Math.random() * 300
                    : (Math.random() * 2 - 1) * SPHERE_RADIUS,
                phase: Math.random() * Math.PI * 2,
                orbitPhase: Math.random() * Math.PI * 2,
                orbitSpeed: 0.3 + Math.random() * 0.6,
                orbitRadius: 8 + Math.random() * 20,
                baseSize: Math.random() * 2.4 + 0.6,
                r: c[0], g: c[1], b: c[2],
                prevX: 0,
                prevY: 0,
                hasPrev: false,
                speedMult: 0.6 + Math.random() * 0.8,
            };
        };

        if (particles.current.length === 0) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.current.push(initParticle());
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (cursor.current.x === 0) {
                cursor.current = { x: canvas.width / 2, y: canvas.height / 2 };
                smoothCursor.current = { ...cursor.current };
            }
        };

        const mouseMove = (e) => {
            cursor.current = { x: e.clientX, y: e.clientY };
            mouseActive.current = true;
        };
        const mouseLeave = () => { mouseActive.current = false; };
        const onScroll = () => { scrollY.current = window.scrollY; };

        const render = () => {
            const time = Date.now() * 0.001;
            const width = canvas.width;
            const height = canvas.height;

            // Semi-transparent clear → warp streak trails
            const isDarkMode = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDarkMode ? 'rgba(15,15,16,0.82)' : 'rgba(255,255,255,0.82)';
            ctx.fillRect(0, 0, width, height);

            // Fade out as user scrolls past the hero
            const scrollFade = Math.max(0, 1 - scrollY.current / (height * 0.9));
            if (scrollFade < 0.01) { animationFrameId = requestAnimationFrame(render); return; }

            // Smooth cursor → vanishing point (snappier tracking)
            const lerp = mouseActive.current ? 0.08 : 0.015;
            const tx = mouseActive.current ? cursor.current.x : width / 2;
            const ty = mouseActive.current ? cursor.current.y : height / 2;
            smoothCursor.current.x += (tx - smoothCursor.current.x) * lerp;
            smoothCursor.current.y += (ty - smoothCursor.current.y) * lerp;
            const vpX = smoothCursor.current.x;
            const vpY = smoothCursor.current.y;

            particles.current.forEach((p, i) => {
                // ── WAVE SYNC ──
                const globalWave = Math.sin(time * 2 - p.z * 0.0025);
                const localWave = Math.sin(time * 3 + p.phase);
                const combinedWave = globalWave * 0.55 + localWave * 0.45;
                const speedMod = Math.max(0.15, 1 + combinedWave * 0.55);

                // ── Z MOTION → warp toward camera ──
                p.z -= SPEED_BASE * speedMod * p.speedMult;
                if (p.z < -1000) { Object.assign(p, initParticle(true)); return; }

                // ── PERSPECTIVE PROJECTION ──
                const cameraZ = 1000;
                const depth = p.z + cameraZ;
                if (depth < 15) return;

                const fov = 900;
                let projX = (p.x * fov) / depth;
                let projY = (p.y * fov) / depth;

                // Fisheye distortion
                const dist = Math.sqrt(projX * projX + projY * projY);
                const normalizedDist = Math.min(1, dist / (width / 1.5));
                const distortion = 1 + Math.pow(normalizedDist, 3) * FISHEYE_STRENGTH;
                projX *= distortion;
                projY *= distortion;

                // ── ORBITAL DRIFT → organic floating feel ──
                const orbitX = Math.sin(time * p.orbitSpeed + p.orbitPhase) * p.orbitRadius * (fov / depth) * 0.3;
                const orbitY = Math.cos(time * p.orbitSpeed * 0.7 + p.orbitPhase) * p.orbitRadius * (fov / depth) * 0.3;
                const finalX = vpX + projX + orbitX;
                const finalY = vpY + projY + orbitY;

                // ── SIZE ──
                const scale = fov / depth;
                const sizePulse = 1 + 0.2 * Math.sin(time * 4 + i * 0.06);
                let size = Math.max(0.3, p.baseSize * scale * sizePulse);

                // ── ALPHA ──
                const alphaIn = Math.min(1, (SPHERE_RADIUS - p.z) / 600);
                const alphaOut = Math.min(1, (depth - 40) / 280);
                let alpha = Math.min(alphaIn, alphaOut) * 0.6 * scrollFade;

                // Mouse proximity → brighter, larger, color shift
                let { r, g, b } = p;
                if (mouseActive.current) {
                    const mdx = finalX - cursor.current.x;
                    const mdy = finalY - cursor.current.y;
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mDist < MOUSE_GLOW_RADIUS) {
                        const proximity = 1 - mDist / MOUSE_GLOW_RADIUS;
                        alpha = Math.min(1, alpha + proximity * 0.55);
                        size = size * (1 + proximity * 0.6);
                        // Shift color brighter near cursor
                        r = Math.min(255, r + proximity * 40);
                        g = Math.min(255, g + proximity * 30);
                        b = Math.min(255, b + proximity * 50);
                    }
                }

                if (alpha < 0.01) return;

                // ── WARP STREAK ──
                if (p.hasPrev && size > 0.7) {
                    const dx = finalX - p.prevX;
                    const dy = finalY - p.prevY;
                    const streakLen = Math.sqrt(dx * dx + dy * dy);
                    if (streakLen > 1.5 && streakLen < 120) {
                        const ta = alpha * 0.30 * Math.min(1, streakLen / 14);
                        ctx.strokeStyle = `rgba(${r},${g},${b},${ta})`;
                        ctx.lineWidth = size * 0.55;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(p.prevX, p.prevY);
                        ctx.lineTo(finalX, finalY);
                        ctx.stroke();
                    }
                }

                // ── GLOW HALO ──
                if (size > 1.0) {
                    const gr = size * 5;
                    const grd = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, gr);
                    grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.10})`);
                    grd.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.03})`);
                    grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
                    ctx.fillStyle = grd;
                    ctx.beginPath();
                    ctx.arc(finalX, finalY, gr, 0, Math.PI * 2);
                    ctx.fill();
                }

                // ── CORE DOT ──
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.beginPath();
                ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
                ctx.fill();

                p.prevX = finalX;
                p.prevY = finalY;
                p.hasPrev = true;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('mouseleave', mouseLeave);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mouseleave', mouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default ParticleSphere;
