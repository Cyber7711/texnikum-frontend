import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // Progress barga "fizika" beramiz (siltanmaydi)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100000]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
