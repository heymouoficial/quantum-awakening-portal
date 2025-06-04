
import { useEffect, useRef } from 'react';

const QuantumWaveField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

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
      ctx.fillStyle = 'rgba(15, 15, 29, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;
      const mouseInfluence = 0.001; // Increased from 0.0002 to make mouse effect more visible

      // Draw quantum wave interference patterns
      waves.forEach((wave, waveIndex) => {
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.05; // Reduced from 0.2 to 0.05

        // Horizontal waves with stronger mouse influence
        for (let y = 0; y < canvas.height; y += 60) {
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 2) {
            const distanceToMouse = Math.sqrt(
              Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2)
            );
            const mouseEffect = Math.exp(-distanceToMouse * mouseInfluence) * 50; // Increased from 15 to 50
            
            const waveY = y + wave.amplitude * Math.sin(
              wave.frequency * x + 
              wave.speed * time + 
              wave.phase
            ) + mouseEffect * Math.sin(time * 0.02);
            
            if (x === 0) {
              ctx.moveTo(x, waveY);
            } else {
              ctx.lineTo(x, waveY);
            }
          }
          ctx.stroke();
        }

        // Vertical waves for interference with stronger mouse influence
        ctx.globalAlpha = 0.03; // Reduced from 0.1 to 0.03
        for (let x = 0; x < canvas.width; x += 80) {
          ctx.beginPath();
          for (let y = 0; y < canvas.height; y += 2) {
            const distanceToMouse = Math.sqrt(
              Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2)
            );
            const mouseEffect = Math.exp(-distanceToMouse * mouseInfluence) * 30; // Increased from 10 to 30
            
            const waveX = x + wave.amplitude * 0.7 * Math.sin(
              wave.frequency * y + 
              wave.speed * time + 
              wave.phase + Math.PI / 4
            ) + mouseEffect * Math.cos(time * 0.02);
            
            if (y === 0) {
              ctx.moveTo(waveX, y);
            } else {
              ctx.lineTo(waveX, y);
            }
          }
          ctx.stroke();
        }
      });

      // Add quantum interference dots at intersections with stronger mouse influence
      ctx.globalAlpha = 0.08; // Reduced from 0.4 to 0.08
      for (let x = 0; x < canvas.width; x += 120) {
        for (let y = 0; y < canvas.height; y += 120) {
          const distanceToMouse = Math.sqrt(
            Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2)
          );
          const mouseProximity = Math.exp(-distanceToMouse * 0.002); // Increased from 0.0008 to make more responsive
          
          const intensity = Math.sin(time * 0.01 + x * 0.01 + y * 0.01) + mouseProximity;
          if (intensity > 0.3) { // Lowered threshold from 0.5 to 0.3 to make dots appear more frequently
            const size = (intensity - 0.3) * 6; // Adjusted for new threshold
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
      window.removeEventListener('mousemove', handleMouseMove);
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
      
      {/* Reduced gradient overlay opacity to 5% */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(63, 255, 168, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
          `,
          zIndex: 2
        }}
      />
    </>
  );
};

export default QuantumWaveField;
