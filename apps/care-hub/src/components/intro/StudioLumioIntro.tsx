"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LETTER_ANIM_DURATION = 0.28;
const LETTER_DELAY_RANGE = 0.35;
const LETTER_EXIT_DURATION = 0.24;
const LETTER_EXIT_REPLAY_DURATION = 0.36;
const EXIT_HOLD = 0.08;

type LetterDef = {
  char: string;
  delay: number;
  dim: number;
};

const buildLetters = (word: string): LetterDef[] => {
  const chars = word.split("");
  return chars.map((char, index) => {
    const ratio = chars.length > 1 ? index / (chars.length - 1) : 0;
    return {
      char,
      delay: ratio * LETTER_DELAY_RANGE,
      dim: 0.15 + ratio * 0.35,
    };
  });
};

const LEFT_LETTERS = buildLetters("Lemnyscate");
const RIGHT_LETTERS = buildLetters("Eumetise");
const MAX_DELAY = Math.max(
  ...LEFT_LETTERS.map((letter) => letter.delay),
  ...RIGHT_LETTERS.map((letter) => letter.delay)
);
const LETTER_CYCLE = MAX_DELAY + LETTER_ANIM_DURATION;
const LETTER_EXIT_CYCLE = MAX_DELAY + LETTER_EXIT_REPLAY_DURATION;
const EXIT_REPLAY_TOTAL = 2 * MAX_DELAY + 2 * LETTER_EXIT_REPLAY_DURATION;

type StudioLumioIntroProps = {
  onComplete?: (withSound: boolean) => void;
};

export default function StudioLumioIntro({ onComplete }: StudioLumioIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isExitSequence, setIsExitSequence] = useState(false);
  const [isExitFade, setIsExitFade] = useState(false);
  const [letterCycleKey, setLetterCycleKey] = useState(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const triggerHaptics = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([14, 24, 14]);
    }
  };

  const playEnterSound = () => {
    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextCtor();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(220, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.22);
    } catch {
      // Ignore audio failures in unsupported environments.
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0d0d, 1);
    rendererRef.current = renderer;

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float size;
      varying float vOpacity;
      uniform float uTime;
     
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
       
        float dist = length(mvPosition.xyz);
        vOpacity = smoothstep(50.0, 10.0, dist) * 0.6;
      }
    `;

    const fragmentShader = `
      varying float vOpacity;
      uniform float uTime;
     
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
       
        float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
        vec3 color = mix(vec3(0.2, 0.2, 0.2), vec3(0.4, 0.4, 0.4), alpha);
        gl_FragColor = vec4(color, alpha * 0.5);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const gradientGeometry = new THREE.PlaneGeometry(200, 200);
    const gradientMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
       
        void main() {
          vec2 center = vec2(0.5 + sin(uTime * 0.2) * 0.1, 0.5 + cos(uTime * 0.15) * 0.1);
          float dist = distance(vUv, center);
          float gradient = smoothstep(0.8, 0.0, dist) * 0.15;
          vec3 color = vec3(0.08, 0.08, 0.1) * gradient;
          gl_FragColor = vec4(color, gradient);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
    const gradientPlane = new THREE.Mesh(gradientGeometry, gradientMaterial);
    gradientPlane.position.z = -20;
    scene.add(gradientPlane);

    let time = 0;
    const animate = () => {
      time += 0.016;

      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        if (posArray[i3] > 50) posArray[i3] = -50;
        if (posArray[i3] < -50) posArray[i3] = 50;
        if (posArray[i3 + 1] > 50) posArray[i3 + 1] = -50;
        if (posArray[i3 + 1] < -50) posArray[i3 + 1] = 50;
        if (posArray[i3 + 2] > 25) posArray[i3 + 2] = -25;
        if (posArray[i3 + 2] < -25) posArray[i3 + 2] = 25;
      }
      geometry.attributes.position.needsUpdate = true;

      material.uniforms.uTime.value = time;
      gradientMaterial.uniforms.uTime.value = time;

      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.1) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      geometry.dispose();
      material.dispose();
      gradientGeometry.dispose();
      gradientMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 300);
    const timer2 = setTimeout(() => setAnimationPhase(2), 800);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1400);
    const timer4 = setTimeout(() => setAnimationPhase(4), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleEnter = (withSound: boolean) => {
    if (isExitSequence) return;
    setIsExitSequence(true);
    setIsExitFade(false);
    setAnimationPhase(1);
    setLetterCycleKey((prev) => prev + 1);

    if (withSound) {
      playEnterSound();
      triggerHaptics();
    }

    setTimeout(() => {
      setIsExitFade(true);
    }, (EXIT_REPLAY_TOTAL + EXIT_HOLD) * 1000);

    setTimeout(() => {
      setIsExiting(true);
      onComplete?.(withSound);
    }, (EXIT_REPLAY_TOTAL + LETTER_EXIT_DURATION + 0.7) * 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0d0d0d]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 transition-opacity duration-700 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1
            className={`text-4xl font-black tracking-wider transition-all duration-1000 ease-out md:text-6xl lg:text-7xl ${
              animationPhase >= 1 ? "text-white opacity-100" : "text-gray-600 opacity-40"
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              transform: `translateY(${isExitSequence ? "0px" : animationPhase >= 3 ? "-24px" : "0px"})`,
              opacity: isExitFade ? 0 : animationPhase >= 1 ? 1 : 0.4,
              transition:
                "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.6s ease, opacity 0.5s ease",
            }}
          >
            <span className="sr-only">Lemnyscate</span>
            <span
              key={`left-word-${letterCycleKey}`}
              className={`title-word ${isExitSequence ? "exit-seq" : ""} ${isExitFade ? "exit" : ""}`}
              aria-hidden="true"
              style={{
                ["--cycle" as string]: `${isExitSequence ? LETTER_EXIT_CYCLE : LETTER_CYCLE}s`,
                ["--duration" as string]: `${isExitSequence ? LETTER_EXIT_REPLAY_DURATION : LETTER_ANIM_DURATION}s`,
                ["--exit-duration" as string]: `${LETTER_EXIT_DURATION}s`,
                ["--replay-total" as string]: `${EXIT_REPLAY_TOTAL + EXIT_HOLD}s`,
              }}
            >
              {LEFT_LETTERS.map((letter, index) => (
                <span
                  key={`left-${index}-${letter.char}`}
                  className="title-letter"
                  style={{
                    ["--delay" as string]: `${letter.delay}s`,
                    ["--dim" as string]: letter.dim.toFixed(2),
                  }}
                >
                  {letter.char}
                </span>
              ))}
            </span>
          </h1>

          <div
            className={`flex items-center gap-2 overflow-hidden transition-all duration-700 ease-out ${
              animationPhase >= 3 ? "max-w-[400px] opacity-100" : "max-w-0 opacity-0"
            }`}
            style={{
              transition:
                "opacity 0.5s ease 0.3s, max-width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className={`enter-button flex items-center overflow-hidden rounded-sm border border-gray-700 ${
                animationPhase >= 4 ? "enter-ready" : ""
              }`}
            >
              <div className={`enter-button-inner ${animationPhase >= 3 ? "enter-stretch" : ""}`}>
                <button
                  onClick={() => handleEnter(true)}
                  className="flex items-center gap-2 bg-[#c8e972] px-4 py-2 text-xs font-medium tracking-wide text-black transition-colors duration-200 hover:bg-[#d4f080] md:text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Enter with sound
                  <span className="text-[10px]">{">>"}</span>
                </button>
              </div>
            </div>
          </div>

          <h1
            className={`text-4xl font-black tracking-wider transition-all duration-1000 ease-out md:text-6xl lg:text-7xl ${
              animationPhase >= 1 ? "text-white opacity-100" : "text-gray-600 opacity-40"
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              transform: `translateY(${isExitSequence ? "0px" : animationPhase >= 3 ? "24px" : "0px"})`,
              opacity: isExitFade ? 0 : animationPhase >= 1 ? 1 : 0.4,
              transition:
                "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.6s ease, opacity 0.5s ease",
            }}
          >
            <span className="sr-only">Eumetise</span>
            <span
              key={`right-word-${letterCycleKey}`}
              className={`title-word ${isExitSequence ? "exit-seq" : ""} ${isExitFade ? "exit" : ""}`}
              aria-hidden="true"
              style={{
                ["--cycle" as string]: `${isExitSequence ? LETTER_EXIT_CYCLE : LETTER_CYCLE}s`,
                ["--duration" as string]: `${isExitSequence ? LETTER_EXIT_REPLAY_DURATION : LETTER_ANIM_DURATION}s`,
                ["--exit-duration" as string]: `${LETTER_EXIT_DURATION}s`,
                ["--replay-total" as string]: `${EXIT_REPLAY_TOTAL + EXIT_HOLD}s`,
              }}
            >
              {RIGHT_LETTERS.map((letter, index) => (
                <span
                  key={`right-${index}-${letter.char}`}
                  className="title-letter"
                  style={{
                    ["--delay" as string]: `${letter.delay}s`,
                    ["--dim" as string]: letter.dim.toFixed(2),
                  }}
                >
                  {letter.char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div
          className={`mt-8 text-center transition-all duration-700 ease-out ${
            animationPhase >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DESIGN AND DEVELOPMENT IN HARMONY -
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DIGITAL EXPERIENCES CRAFTED WITH EMOTION,
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            INTENTION, AND PRECISION.
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.02]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />
    </div>
  );
}
