import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingCard({ children, className = '', delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      }}
      style={{ borderRadius: '3rem' }}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
