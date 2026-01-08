import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      // Mobilda blurni butunlay olib tashlaymiz
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Video kartani ishga tushirish (Juda muhim!)
      style={{ willChange: "transform, opacity" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
