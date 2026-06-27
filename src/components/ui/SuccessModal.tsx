import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, X, Clock, FileText } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  transactionId?: string;
  status?: string;
  actionText?: string;
  onAction?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  transactionId,
  status = 'pending',
  actionText,
  onAction,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card p-8 md:p-10 rounded-3xl flex flex-col items-center gap-6 max-w-md w-full text-center border-primary/40 shadow-[0_0_50px_rgba(77,142,255,0.2)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-tertiary"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-white transition-colors z-20"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(77,142,255,0.3)]">
                <CheckCircle2 className="text-primary" size={36} />
              </div>
            </motion.div>

            <div className="flex flex-col gap-2 relative z-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
              <p className="text-on-surface-variant leading-relaxed">
                {message}
              </p>
            </div>

            {transactionId && (
              <div className="w-full bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-mono uppercase tracking-widest">
                    <FileText size={14} className="text-primary" />
                    Transaction ID
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{transactionId}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-mono uppercase tracking-widest">
                    <Clock size={14} className="text-secondary" />
                    Status
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-tighter">
                    {status}
                  </span>
                </div>
              </div>
            )}

            {actionText && (
              <button
                onClick={onAction || onClose}
                className="gradient-btn-primary w-full py-4 rounded-xl text-lg font-bold flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all mt-2 relative z-10"
              >
                {actionText}
                <ArrowRight size={20} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
