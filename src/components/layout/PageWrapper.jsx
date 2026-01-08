import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  // Mobil qurilmani aniqlash
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      // Mobilda Blur o'rniga faqat Opacity ishlatish silliqlikni ta'minlaydi
      initial={{
        opacity: 0,
        y: isMobile ? 10 : 20,
        filter: isMobile ? "blur(0px)" : "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: isMobile ? -10 : -20,
        filter: isMobile ? "blur(0px)" : "blur(10px)",
      }}
      // Transition vaqti mobilda biroz tezroq bo'lishi kerak (0.4s)
      transition={{
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Video kartani ishga tushirish (GPU acceleration)
      style={{ willChange: "transform, opacity" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
