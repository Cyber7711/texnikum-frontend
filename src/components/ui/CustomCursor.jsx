import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  // 1. Sichqoncha koordinatalari
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Halqa uchun fizikani biroz tezlashtiramiz (bir-biridan qochib ketmasligi uchun)
  const springConfig = {
    damping: 28, // Tebranishni kamaytiradi
    stiffness: 400, // Yetib olish tezligini oshiradi
    mass: 0.5, // Og'irlikni kamaytiradi
  };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      if (e.target.closest("button, a, input, [role='button']")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block">
      {/* 1. ORQA HALQA (Endi u nuqtadan uzoqlashib ketmaydi) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          width: isHovered ? 50 : 35,
          height: isHovered ? 50 : 35,
          backgroundColor: isHovered
            ? "rgba(16, 185, 129, 0.1)"
            : "transparent",
          borderColor: isHovered
            ? "rgba(16, 185, 129, 0.5)"
            : "rgba(16, 185, 129, 0.3)",
        }}
        className="fixed top-0 left-0 rounded-full border border-emerald-500/30 flex items-center justify-center transition-colors duration-300"
      >
        {/* 2. MARKAZIY NUQTA (Halqaning ichida joylashgan) */}
        <motion.div
          animate={{
            scale: isHovered ? 0.5 : 1,
            backgroundColor: isHovered ? "#10b981" : "#10b981",
          }}
          className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
