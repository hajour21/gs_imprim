import React, { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; life: number; color: string };

const COLORS = ['#00AEEF', '#EC008C', '#FFD100'];

export const TouchInkLayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let ratio = 1;
    let lastX = -1000;
    let lastY = -1000;
    let colorIndex = 0;
    let frame = 0;

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const addInk = (x: number, y: number, amount: number, radius = 7) => {
      if (reducedMotion) return;
      for (let index = 0; index < amount; index += 1) {
        particles.push({ x, y, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2, radius: radius + Math.random() * radius * 1.8, life: 1, color: COLORS[colorIndex++ % COLORS.length] });
      }
      if (particles.length > 260) particles.splice(0, particles.length - 260);
    };
    const pointerMove = (event: PointerEvent) => {
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance > 12) addInk(event.clientX, event.clientY, Math.min(3, Math.ceil(distance / 34)), 3.5);
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const pointerDown = (event: PointerEvent) => addInk(event.clientX, event.clientY, 12, 5);
    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += .008;
        particle.radius *= .994;
        particle.life -= .009;
        if (particle.life <= 0) return;
        context.globalAlpha = Math.max(0, particle.life) * .16;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      for (let index = particles.length - 1; index >= 0; index -= 1) if (particles[index].life <= 0) particles.splice(index, 1);
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', pointerMove, { passive: true });
    window.addEventListener('pointerdown', pointerDown, { passive: true });
    frame = window.requestAnimationFrame(draw);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', pointerMove); window.removeEventListener('pointerdown', pointerDown); };
  }, []);

  return <canvas ref={canvasRef} className="touch-ink-layer" aria-hidden="true" />;
};
