// ======= TWINKLING STAR FIELD =======
        const starCanvas = document.getElementById('starCanvas');
        const ctx = starCanvas.getContext('2d');
        const STAR_COUNT = 220;
        let stars = [];

        function resizeCanvas() {
            starCanvas.width = window.innerWidth;
            starCanvas.height = window.innerHeight;
        }

        function randomBetween(a, b) { return a + Math.random() * (b - a); }

        function initStars() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: randomBetween(0, starCanvas.width),
                    y: randomBetween(0, starCanvas.height),
                    radius: randomBetween(0.4, 1.8),
                    alpha: randomBetween(0.2, 1),
                    delta: randomBetween(0.003, 0.018) * (Math.random() < 0.5 ? 1 : -1),
                    color: Math.random() < 0.15 ? '#c2e9ff' : (Math.random() < 0.1 ? '#ffd1a9' : '#ffffff')
                });
            }
        }

        // ======= MOON SETUP =======
        const MOON_R = 70;
        let moonX, moonY;
        const craters = [
            { ox: -22, oy: -18, r: 9 }, { ox: 18, oy: -28, r: 6 },
            { ox: -5, oy: 20, r: 7 }, { ox: 28, oy: 10, r: 5 },
            { ox: -30, oy: 12, r: 4 }, { ox: 10, oy: -5, r: 4 },
            { ox: -12, oy: 35, r: 5 }, { ox: 35, oy: -15, r: 3 }
        ];

        // Clouds: each cloud is a row of overlapping circles drifting left→right across the moon
        const clouds = [
            { x: -MOON_R * 2, y: -12, speed: 0.18, scale: 1.0 },
            { x: -MOON_R, y: 18, speed: 0.11, scale: 0.75 },
            { x: MOON_R, y: -3, speed: 0.14, scale: 0.9 }
        ];

        function drawCloud(cx, cy, scale) {
            const s = scale;
            ctx.beginPath();
            ctx.arc(cx, cy, 18 * s, 0, Math.PI * 2);
            ctx.arc(cx + 18 * s, cy - 8 * s, 14 * s, 0, Math.PI * 2);
            ctx.arc(cx + 35 * s, cy, 16 * s, 0, Math.PI * 2);
            ctx.arc(cx + 52 * s, cy - 4 * s, 12 * s, 0, Math.PI * 2);
            ctx.arc(cx + 65 * s, cy, 14 * s, 0, Math.PI * 2);
        }

        function drawMoon() {
            const t = Date.now() / 1000;
            // Full-screen elliptical orbit — completes once every 30 seconds
            const angle = (t / 30) * Math.PI * 2;
            const cx = starCanvas.width * 0.5;
            const cy = starCanvas.height * 0.5;
            const rx = starCanvas.width * 0.44;   // nearly full width
            const ry = starCanvas.height * 0.40;  // nearly full height
            moonX = cx + Math.cos(angle) * rx;
            moonY = cy + Math.sin(angle) * ry;

            // --- Outer atmospheric glow ---
            const outerGlow = ctx.createRadialGradient(moonX, moonY, MOON_R * 0.7, moonX, moonY, MOON_R * 2.2);
            outerGlow.addColorStop(0, 'rgba(240,240,180,0.18)');
            outerGlow.addColorStop(0.4, 'rgba(220,220,140,0.08)');
            outerGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.beginPath();
            ctx.arc(moonX, moonY, MOON_R * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = outerGlow;
            ctx.fill();

            // --- Moon base disc with radial shading ---
            const moonGrad = ctx.createRadialGradient(
                moonX - MOON_R * 0.3, moonY - MOON_R * 0.3, MOON_R * 0.05,
                moonX, moonY, MOON_R
            );
            moonGrad.addColorStop(0, '#f5f0d8');
            moonGrad.addColorStop(0.45, '#ddd8b8');
            moonGrad.addColorStop(0.8, '#b8b090');
            moonGrad.addColorStop(1, '#807860');
            ctx.beginPath();
            ctx.arc(moonX, moonY, MOON_R, 0, Math.PI * 2);
            ctx.fillStyle = moonGrad;
            ctx.fill();

            // --- Craters ---
            craters.forEach(c => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(moonX + c.ox, moonY + c.oy, c.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(110,100,80,0.45)';
                ctx.fill();
                // Bright rim highlight
                ctx.beginPath();
                ctx.arc(moonX + c.ox - c.r * 0.3, moonY + c.oy - c.r * 0.3, c.r * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,230,0.22)';
                ctx.fill();
                ctx.restore();
            });

            // --- Dark limb shadow (crescent edge) ---
            const limbGrad = ctx.createRadialGradient(
                moonX + MOON_R * 0.4, moonY + MOON_R * 0.2, MOON_R * 0.3,
                moonX + MOON_R * 0.2, moonY, MOON_R * 1.1
            );
            limbGrad.addColorStop(0, 'rgba(0,0,0,0)');
            limbGrad.addColorStop(0.7, 'rgba(0,0,0,0.08)');
            limbGrad.addColorStop(1, 'rgba(0,0,0,0.45)');
            ctx.beginPath();
            ctx.arc(moonX, moonY, MOON_R, 0, Math.PI * 2);
            ctx.fillStyle = limbGrad;
            ctx.fill();

            // --- Animated clouds drifting across moon ---
            clouds.forEach(cl => {
                cl.x += cl.speed;
                if (cl.x > MOON_R * 2.5) cl.x = -MOON_R * 2.2;

                // Clip drawing to moon disc
                ctx.save();
                ctx.beginPath();
                ctx.arc(moonX, moonY, MOON_R, 0, Math.PI * 2);
                ctx.clip();

                // Draw cloud shape
                ctx.save();
                ctx.globalAlpha = 0.28 * cl.scale;
                ctx.fillStyle = '#ffffff';
                drawCloud(moonX + cl.x - 30, moonY + cl.y, cl.scale);
                ctx.fill();
                ctx.restore();
                ctx.restore();
            });

            // --- Subtle specular highlight ---
            const spec = ctx.createRadialGradient(
                moonX - MOON_R * 0.38, moonY - MOON_R * 0.38, 0,
                moonX - MOON_R * 0.2, moonY - MOON_R * 0.2, MOON_R * 0.65
            );
            spec.addColorStop(0, 'rgba(255,255,240,0.30)');
            spec.addColorStop(1, 'rgba(255,255,240,0)');
            ctx.beginPath();
            ctx.arc(moonX, moonY, MOON_R, 0, Math.PI * 2);
            ctx.fillStyle = spec;
            ctx.fill();
        }

        function drawStars() {
            ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);

            // Draw moon first (behind stars)
            drawMoon();

            stars.forEach(s => {
                // Twinkle: oscillate alpha
                s.alpha += s.delta;
                if (s.alpha >= 1) { s.alpha = 1; s.delta = -Math.abs(s.delta); }
                if (s.alpha <= 0.1) { s.alpha = 0.1; s.delta = Math.abs(s.delta); }

                // Glow effect for larger stars
                if (s.radius > 1.2) {
                    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3);
                    glow.addColorStop(0, `rgba(200,230,255,${s.alpha * 0.6})`);
                    glow.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
                    ctx.fillStyle = glow;
                    ctx.fill();
                }

                // Core star dot
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = s.color === '#c2e9ff'
                    ? `rgba(194,233,255,${s.alpha})`
                    : s.color === '#ffd1a9'
                        ? `rgba(255,209,169,${s.alpha})`
                        : `rgba(255,255,255,${s.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(drawStars);
        }

        resizeCanvas();
        initStars();
        drawStars();

        window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

        // ======= BOKEH LIGHT CANVAS (light mode) =======
        const lc = document.getElementById('lightCanvas');
        const lctx = lc.getContext('2d');
        const BOKEH_COUNT = 42;
        let bokehParticles = [];

        const bokehColors = [
            [102, 126, 234], [118, 75, 162], [246, 79, 89],
            [52, 211, 153], [251, 191, 36], [96, 165, 250],
            [244, 114, 182], [167, 139, 250]
        ];

        function resizeLightCanvas() {
            lc.width = window.innerWidth;
            lc.height = window.innerHeight;
        }

        function initBokeh() {
            bokehParticles = [];
            for (let i = 0; i < BOKEH_COUNT; i++) {
                const col = bokehColors[Math.floor(Math.random() * bokehColors.length)];
                bokehParticles.push({
                    x: randomBetween(0, lc.width),
                    y: randomBetween(0, lc.height),
                    r: randomBetween(18, 72),
                    alpha: randomBetween(0.04, 0.13),
                    alphaD: randomBetween(0.0003, 0.0012) * (Math.random() < 0.5 ? 1 : -1),
                    vx: randomBetween(-0.12, 0.12),
                    vy: randomBetween(-0.25, -0.08),  // drift upward
                    color: col
                });
            }
        }

        function drawBokeh() {
            lctx.clearRect(0, 0, lc.width, lc.height);
            bokehParticles.forEach(p => {
                // Float up, wrap when off top
                p.x += p.vx;
                p.y += p.vy;
                if (p.y + p.r < 0) { p.y = lc.height + p.r; p.x = randomBetween(0, lc.width); }
                if (p.x - p.r > lc.width) p.x = -p.r;
                if (p.x + p.r < 0) p.x = lc.width + p.r;

                // Twinkle alpha
                p.alpha += p.alphaD;
                if (p.alpha > 0.14) { p.alpha = 0.14; p.alphaD = -Math.abs(p.alphaD); }
                if (p.alpha < 0.02) { p.alpha = 0.02; p.alphaD = Math.abs(p.alphaD); }

                // Draw soft glowing circle
                const [r, g, b] = p.color;
                const grad = lctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                grad.addColorStop(0, `rgba(${r},${g},${b},${p.alpha})`);
                grad.addColorStop(0.5, `rgba(${r},${g},${b},${p.alpha * 0.5})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                lctx.beginPath();
                lctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                lctx.fillStyle = grad;
                lctx.fill();
            });
            requestAnimationFrame(drawBokeh);
        }

        resizeLightCanvas();
        initBokeh();
        drawBokeh();

        window.addEventListener('resize', () => { resizeLightCanvas(); initBokeh(); });

        // ======= FIREBASE AUTH STATE MANAGEMENT =======
