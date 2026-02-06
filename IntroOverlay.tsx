
import React, { useEffect, useState } from 'react';

const IntroOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden animate-out fade-out fill-mode-forwards duration-500 delay-[2300ms]">
      <div className="relative flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] text-red-600 animate-[netflix_2.5s_ease-in-out_forwards] drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          hunt<span className="text-white">tech</span>
        </h1>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-600/10 to-transparent h-full w-full opacity-20 animate-[scan_2s_linear_infinite]"></div>
      </div>
      
      <style>{`
        @keyframes netflix {
          0% {
            transform: scale(0.85);
            letter-spacing: -0.05em;
            opacity: 0;
            filter: blur(10px);
          }
          20% {
            opacity: 1;
            filter: blur(0);
          }
          80% {
            transform: scale(1.1);
            letter-spacing: 0.1em;
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            letter-spacing: 0.2em;
            opacity: 0;
          }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default IntroOverlay;
