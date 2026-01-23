import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fizikani juda yumshoq qilamiz, kechikish sezilmasligi uchun
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
      style={{
        x,
        y,
        translateX: "-50%", // Markazlashtirish
        translateY: "-50%",
      }}
    >
      {/* Bu yerda kursorning o'zi yo'q, faqat NUR (GLOW) bor.
         Foydalanuvchi o'zining oddiy sichqonchasini ko'radi, 
         bu esa orqa fonda yashil aura hosil qiladi.
      */}
      <div className="w-[300px] h-[300px] -ml-[150px] -mt-[150px] bg-emerald-500/20 rounded-full blur-[80px]" />
    </motion.div>
  );
};

export default CustomCursor;
