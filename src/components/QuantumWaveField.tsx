
import { useEffect, useRef } from 'react';

const QuantumWaveField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    // Wave parameters
    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.01, phase: 0, color: '#3FFFA8' },
      { amplitude: 25, frequency: 0.025, speed: 0.015, phase: Math.PI / 3, color: '#8B5CF6' },
      { amplitude: 35, frequency: 0.018, speed: 0.008, phase: Math.PI / 2, color: '#06B6D4' },
      { amplitude: 20, frequency: 0.03, speed: 0.012, phase: Math.PI, color: '#FFFFFF' }
    ];

    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(15, 15, 29, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;

      // Draw quantum wave interference patterns
      waves.forEach((wave, waveIndex) => {
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;

        // Horizontal waves
        for (let y = 0; y < canvas.height; y += 60) {
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 2) {
            const waveY = y + wave.amplitude * Math.sin(
              wave.frequency * x + 
              wave.speed * time + 
              wave.phase
            );
            
            if (x === 0) {
              ctx.moveTo(x, waveY);
            } else {
              ctx.lineTo(x, waveY);
            }
          }
          ctx.stroke();
        }

        // Vertical waves for interference
        ctx.globalAlpha = 0.2;
        for (let x = 0; x < canvas.width; x += 80) {
          ctx.beginPath();
          for (let y = 0; y < canvas.height; y += 2) {
            const waveX = x + wave.amplitude * 0.7 * Math.sin(
              wave.frequency * y + 
              wave.speed * time + 
              wave.phase + Math.PI / 4
            );
            
            if (y === 0) {
              ctx.moveTo(waveX, y);
            } else {
              ctx.lineTo(waveX, y);
            }
          }
          ctx.stroke();
        }
      });

      // Add quantum interference dots at intersections
      ctx.globalAlpha = 0.6;
      for (let x = 0; x < canvas.width; x += 120) {
        for (let y = 0; y < canvas.height; y += 120) {
          const intensity = Math.sin(time * 0.01 + x * 0.01 + y * 0.01);
          if (intensity > 0.5) {
            const size = (intensity - 0.5) * 4;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = '#3FFFA8';
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(63, 255, 168, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
          zIndex: 2
        }}
      />
    </>
  );
};

export default QuantumWaveField;
