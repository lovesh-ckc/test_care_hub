'use client'
import { memo, useEffect, useRef,  HTMLAttributes } from "react";

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  // Add any additional props you need here
}

const LiquidGlass = memo(({ className, ...props }: LiquidGlassProps) => {
const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
      if (!canvas) return;

    const gl = canvas?.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision highp float;

      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for(int i = 0; i < 4; i++) {
          value += amplitude * noise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 m = mouse / resolution;

        float dist = distance(uv, m);

        float flow1 = fbm(uv * 3.0 + time * 0.15);
        float flow2 = fbm(uv * 2.5 - time * 0.12 + vec2(100.0));

        vec2 distortion = vec2(
          sin(uv.y * 8.0 + time * 0.5 + flow1 * 3.0) * 0.015,
          cos(uv.x * 8.0 - time * 0.4 + flow2 * 3.0) * 0.015
        );

        float interaction = smoothstep(0.5, 0.0, dist);
        vec2 mouseDistortion = normalize(uv - m) * interaction * 0.04;

        vec2 finalUV = uv + distortion + mouseDistortion;

        float layer1 = fbm(finalUV * 4.0 + time * 0.08);
        float layer2 = fbm(finalUV * 6.0 - time * 0.05);

        float grain = hash(finalUV * 150.0 + time * 0.1) * 0.02;

        vec2 center = vec2(0.5);
        float radialGrad = 1.0 - length(uv - center) * 0.8;

        float shimmer = sin(time * 2.0 + finalUV.x * 10.0) *
                       cos(time * 1.5 + finalUV.y * 10.0) * 0.05;

        float brightness = (layer1 * 0.4 + layer2 * 0.3 + radialGrad * 0.5) + shimmer;
        brightness = clamp(brightness + grain, 0.0, 1.0);

        vec3 glassColor = vec3(0.95, 0.96, 0.98);
        vec3 finalColor = glassColor * brightness;

        float alpha = 0.25 + interaction * 0.1;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

     const compileShader = (
      type: number,
      source: string
    ): WebGLShader => {
      const shader = gl.createShader(type);
      if (!shader) {
        throw new Error('Failed to create shader');
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");
    const uMouse = gl.getUniformLocation(program, "mouse");

    let mouse = [0, 0];

    const onMove = (e : MouseEvent) => {
      mouse = [e.clientX, window.innerHeight - e.clientY];
    };

    window.addEventListener("mousemove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const draw = () => {
      gl.uniform1f(uTime, (performance.now() - start) * 0.001);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
 if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
});

export default function LiquidMorph({
  variant = "pill",
  className = "",
  onClick,
  children,
} : {
  variant?: "pill" | "panel" | "wide";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const classes = `liquid-morph liquid-morph--${variant} ${className}`.trim();

  return (
    <div className={classes} onClick={onClick}>
      <LiquidGlass className="liquid-morph__canvas" />
      {children}
      <style>{`
        .liquid-morph {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow:
            0 14px 40px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -6px 14px rgba(255, 255, 255, 0.12),
            inset 0 0 18px rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .liquid-morph--pill {
          height: 42px;
          padding: 0 14px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .liquid-morph--panel {
          display: flex;
          gap: 20px;
          padding: 16px 20px;
          border-radius: 16px;
          animation: liquidMorphIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .liquid-morph--wide {
          padding: 0 18px;
          gap: 14px;
        }

        .liquid-morph:hover {
          border: 1px solid rgba(255, 255, 255, 0.32);
          transform: translateY(-1px) scale(1.01);
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            inset 0 -6px 14px rgba(255, 255, 255, 0.16),
            inset 0 0 22px rgba(255, 255, 255, 0.12);
        }

        .liquid-morph:active {
          transform: translateY(1px) scale(0.98);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 4px 12px rgba(0, 0, 0, 0.25),
            inset 0 -2px 8px rgba(255, 255, 255, 0.15),
            inset -2px -2px 6px rgba(0, 0, 0, 0.15),
            inset 2px 2px 6px rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .liquid-morph__canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          mix-blend-mode: soft-light;
          opacity: 0;
          pointer-events: none;
        }

        .liquid-morph > * {
          z-index: 1;
        }

        @keyframes liquidMorphIn {
          0% {
            opacity: 0;
            transform: scale(0.1) translateY(-20px);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.7) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .liquid-morph--pill:hover {
          transform: translateY(-1px);
        }

        .liquid-morph--pill:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
}
