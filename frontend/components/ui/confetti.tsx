'use client';

import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  gravity?: number;
  ticks?: number;
  zIndex?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({
  particleCount = 150,
  spread = 180,
  origin = { x: 0.5, y: 0.3 },
  colors = ['#06B6D4', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
  gravity = 0.1,
  ticks = 200,
  zIndex = 1000
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particles: any[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width * origin.x,
        y: canvas.height * origin.y,
        size: Math.random() * 10 + 2,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * -15 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        life: ticks
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let particlesAlive = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.life <= 0) continue;

        particlesAlive++;

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += gravity;
        p.rotation += p.rotationSpeed;
        p.life--;

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      if (particlesAlive > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, spread, origin, colors, gravity, ticks]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex
      }}
    />
  );
};