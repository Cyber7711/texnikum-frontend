import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const SectionHeader = ({
  badge,
  titlePart1,
  titlePart2,
  description,
  center = false,
  variant = "blue",
}) => {
  const badgeClass =
    variant === "emerald"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : "bg-blue-500/10 text-blue-400 border-blue-500/20";

  const spanClass =
    variant === "emerald" ? "text-emerald-500" : "text-blue-500";

  return (
    <div className={`mb-16 ${center ? "text-center mx-auto" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${badgeClass} text-[10px] font-black uppercase tracking-[0.3em] mb-8`}
      >
        <Zap size={14} fill="currentColor" /> {badge}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-4xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-tight"
      >
        {titlePart1} <br />
        <span className={`${spanClass} not-italic`}>{titlePart2}</span>
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-6 text-slate-400 max-w-2xl mx-auto font-medium text-lg italic"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
