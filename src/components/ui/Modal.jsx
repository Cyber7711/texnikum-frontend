import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-4xl" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Orqa fon (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md"
          />

          {/* Modal Kontenti */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`bg-white w-full ${maxWidth} rounded-[3rem] overflow-hidden relative shadow-2xl z-10`}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-slate-100 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all z-20"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
