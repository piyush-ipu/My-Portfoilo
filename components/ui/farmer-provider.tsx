import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  initialX?: number;
  initialY?: number;
  duration?: number;
  delay?: number;
  className?: string; // 👈 Add this line
  children: React.ReactNode;
}

export const FarmerProvider = ({
  initialX = 0,
  initialY = 0,
  delay = 0,
  duration = 1,
  className = "", // 👈 Default to empty string
  children,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.span
      ref={ref}
      className={className} // 👈 Apply the className here
      variants={{
        hidden: { opacity: 0, x: initialX, y: initialY },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration, delay }}
    >
      {children}
    </motion.span>
  );
};
