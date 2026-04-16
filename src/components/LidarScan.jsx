import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scan, ShieldCheck } from 'lucide-react';

const LidarScan = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Lidar Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-unimed-cyan rounded-full opacity-50"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="absolute inset-4 border-2 border-unimed-cyan rounded-full opacity-30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
        <div className="relative z-10 p-6 bg-unimed-navy/20 rounded-full border border-unimed-cyan/30">
          <Scan className="w-16 h-16 text-unimed-cyan" />
        </div>

        {/* Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128" cy="128" r="120"
            stroke="rgba(0, 212, 255, 0.2)" strokeWidth="4" fill="transparent"
          />
          <circle
            cx="128" cy="128" r="120"
            stroke="#00D4FF" strokeWidth="4" fill="transparent"
            strokeDasharray={753.98}
            strokeDashoffset={753.98 - (753.98 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-100 ease-linear"
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <p className="text-white font-medium text-lg tracking-wide">Scanning...</p>
        <p className="text-unimed-cyan/70 text-xs uppercase tracking-widest">Please look directly at your device</p>
      </div>
    </div>
  );
};

export default LidarScan;
