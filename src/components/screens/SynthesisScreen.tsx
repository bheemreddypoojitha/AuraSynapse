import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SynthesisScreenProps {
  onComplete: () => void;
}

export function SynthesisScreen({ onComplete }: SynthesisScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    const colors = [
      "rgba(139, 92, 246, ",
      "rgba(59, 130, 246, ",
      "rgba(6, 182, 212, ",
      "rgba(167, 139, 250, ",
      "rgba(236, 72, 153, ",
    ];

    function createParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;

      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      });
    }

    let frame = 0;
    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (frame % 2 === 0) {
        for (let i = 0; i < 3; i++) createParticle();
      }

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `${particle.color}${particle.life})`);
        gradient.addColorStop(1, `${particle.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      if (frame < 180) requestAnimationFrame(animate);
    }

    animate();

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Call onComplete after synthesis is done
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="relative size-full bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      {/* Center content */}
      <div className="relative z-10 text-center">
        <motion.h2
          className="text-4xl text-white tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontWeight: 300,
            textShadow: "0 0 30px rgba(139, 92, 246, 0.8)",
          }}
        >
          Synthesizing Your Style DNA
        </motion.h2>

        {/* Progress bar */}
        <motion.div
          className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Status text */}
        <motion.p
          className="text-white/50 text-sm tracking-wide mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {progress < 30 && "Analyzing preferences..."}
          {progress >= 30 && progress < 60 && "Generating moodboard..."}
          {progress >= 60 && progress < 90 && "Curating collection..."}
          {progress >= 90 && "Finalizing your aura..."}
        </motion.p>

        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${ring * 150}px`,
                height: `${ring * 150}px`,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: 10 + ring * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SynthesisScreen;
