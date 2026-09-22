'use client';

import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import styles from './ParticleNetwork.module.css';

interface ParticleNetworkProps {
  /** Densidad de la red. `soft` para fondos de sección, `rich` para el hero. */
  density?: 'soft' | 'rich';
  /** Si las partículas reaccionan al puntero. Se ignora en dispositivos táctiles. */
  interactive?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Edad en segundos. Gobierna el fundido de entrada y de salida. */
  age: number;
  life: number;
  /** 1 de cada seis nodos es dorado: el acento no se reparte, se reserva. */
  gold: boolean;
}

/** Área de lienzo por partícula. Más alto = red más dispersa. */
const AREA_PER_PARTICLE = { soft: 26000, rich: 15000 } as const;
const MAX_PARTICLES = { soft: 48, rich: 96 } as const;

/** Distancia máxima de conexión, en píxeles CSS. */
const LINK_DISTANCE = 132;
const POINTER_RADIUS = 150;

/** Tiempo de fundido en los extremos de la vida de una partícula. */
const FADE = 1.1;

function readColor(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/**
 * La red de conexiones: el motivo visual transversal de la landing.
 *
 * Significa una cosa concreta —personas, escuelas, conocimiento y territorio
 * enlazándose— y por eso las partículas NACEN Y MUEREN con fundido en vez de
 * rebotar eternamente contra los bordes: una red viva gana y pierde nodos.
 *
 * Presupuesto de rendimiento, en orden de impacto:
 *
 * - **Se detiene cuando no se ve.** Un `IntersectionObserver` corta el bucle al
 *   salir de pantalla y `visibilitychange` lo corta en pestañas de fondo. Un
 *   `requestAnimationFrame` corriendo bajo tres secciones de scroll es la forma
 *   más cara de no mostrar nada.
 * - **DPR tope 2.** En una pantalla a 3x el lienzo dibujaría 9 veces los
 *   píxeles para una diferencia que nadie percibe en un fondo difuminado.
 * - **O(n²) con n acotado.** 96 nodos son 4.560 pares por cuadro: barato. Lo
 *   que no es barato es no poner el tope, y por eso `MAX_PARTICLES` existe.
 * - **Sin puntero en táctil.** `hover: none` desactiva el seguimiento: en un
 *   teléfono solo agregaría trabajo por evento sin nada que mostrar.
 *
 * Con `prefers-reduced-motion` se dibuja UN cuadro y se corta el bucle. La red
 * es identidad, no información: se congela, no desaparece.
 */
export function ParticleNetwork({
  density = 'soft',
  interactive = true,
  className = '',
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    const palette = {
      node: readColor('--net-node', 'rgba(127,178,255,0.8)'),
      gold: readColor('--net-4', '#e6be73'),
      line: readColor('--net-line', 'rgba(127,178,255,0.26)'),
    };

    const pointerEnabled =
      interactive && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let last = 0;
    let onScreen = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const spawn = (seeded: boolean): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14,
      r: 1 + Math.random() * 1.7,
      // Al sembrar la red por primera vez las edades se reparten al azar; si
      // todas arrancaran en cero, la red entera pulsaría al unísono y se vería
      // como un parpadeo, no como un organismo.
      age: seeded ? Math.random() * 12 : 0,
      life: 10 + Math.random() * 12,
      gold: Math.random() < 0.17,
    });

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const narrow = width < 720;
      const perParticle = AREA_PER_PARTICLE[density] * (narrow ? 1.9 : 1);
      const cap = Math.round(MAX_PARTICLES[density] * (narrow ? 0.42 : 1));
      const target = Math.max(10, Math.min(cap, Math.round((width * height) / perParticle)));

      if (particles.length > target) {
        particles.length = target;
      } else {
        while (particles.length < target) particles.push(spawn(true));
      }
    };

    /** Opacidad de una partícula según su edad: entra, vive, se va. */
    const alphaOf = (p: Particle): number => {
      if (p.age < FADE) return p.age / FADE;
      const remaining = p.life - p.age;
      if (remaining < FADE) return Math.max(0, remaining / FADE);
      return 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Conexiones primero: los nodos tienen que quedar POR ENCIMA de las
      // líneas, o cada nodo aparece cortado por su propia conexión.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        const alphaA = alphaOf(a);
        if (alphaA <= 0.02) continue;

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

          // La raíz cuadrada se calcula SOLO para los pares que ya pasaron el
          // filtro: es la diferencia entre 4.560 raíces por cuadro y unas pocas.
          const dist = Math.sqrt(distSq);
          const strength = (1 - dist / LINK_DISTANCE) * alphaA * alphaOf(b);
          if (strength <= 0.02) continue;

          ctx.globalAlpha = strength * 0.85;
          ctx.strokeStyle = palette.line;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS) {
            ctx.globalAlpha = (1 - dist / POINTER_RADIUS) * alphaA * 0.5;
            ctx.strokeStyle = palette.gold;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const alpha = alphaOf(p);
        if (alpha <= 0.02) continue;
        ctx.globalAlpha = alpha * (p.gold ? 0.95 : 0.75);
        ctx.fillStyle = p.gold ? palette.gold : palette.node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      // Delta en segundos y acotado: al volver de una pestaña en segundo plano
      // el primer delta puede valer varios segundos y teletransportaría toda la
      // red de un cuadro al siguiente.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.age += dt;

        if (p.age >= p.life) {
          particles[i] = spawn(false);
          continue;
        }

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 0.001) {
            // Repulsión muy suave: el nodo se aparta unos pocos píxeles. Una
            // fuerza mayor convierte el fondo en un juguete que compite con el
            // texto que tiene encima.
            const push = (1 - dist / POINTER_RADIUS) * 26;
            p.x -= (dx / dist) * push * dt;
            p.y -= (dy / dist) * push * dt;
          }
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Envoltura toroidal en vez de rebote: un rebote marca los bordes del
        // lienzo y delata la caja rectangular que el difuminado intenta ocultar.
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame || reducedMotion) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw();
    });
    resizeObserver.observe(parent);

    const screenObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    screenObserver.observe(parent);

    document.addEventListener('visibilitychange', onVisibility);
    if (pointerEnabled && !reducedMotion) {
      parent.addEventListener('pointermove', onPointerMove);
      parent.addEventListener('pointerleave', onPointerLeave);
    }

    if (reducedMotion) {
      // Un único cuadro: la red queda dibujada y quieta.
      draw();
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      screenObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [density, interactive, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
}
