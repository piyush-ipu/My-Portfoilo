"use client";
import { Clock, Send } from "lucide-react";
import Location from "../location/location";
import Contactlink from "./contact-link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeInOut", duration: 0.6 } },
};

const Info = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-10 w-full lg:w-1/2 mt-28 sm:mt-48 text-white"
    >
      {/* Top Info Boxes */}
      <motion.div
        variants={childVariants}
        className="bg-gray-200/50 dark:bg-gray-500/50 backdrop-blur-lg border border-gray-400 shadow-xl p-3 w-full flex flex-col sm:flex-row gap-3 md:gap-10 rounded-lg"
      >
        <div className="flex items-center gap-4 w-full sm:w-1/2">
          <div className="bg-indigo-700 p-2 rounded-full">
            <Clock size={24} />
          </div>
          <div className="leading-1 text-black dark:text-white">
            <h1 className="font-bold text-sm">Working Hours</h1>
            <span className="text-xs">Mon-Fri 9:00am to 6:00pm</span>
          </div>
        </div>
        <div className="h-px w-full bg-white opacity-40 border-t border-violet-200 block sm:hidden" />
        <div className="w-px bg-white opacity-40 h-12 self-center hidden sm:block" />
        <div className="flex items-center gap-4 w-full sm:w-1/2">
          <div className="bg-indigo-700 p-2 rounded-full">
            <Send size={24} />
          </div>
          <div className="leading-1 text-black dark:text-white">
            <h1 className="font-bold text-sm">Location</h1>
            <span className="text-xs">New Delhi</span>
          </div>
        </div>
      </motion.div>

      {/* Contact Buttons with Motion */}
      <motion.div variants={childVariants}>
        <Contactlink />
      </motion.div>

      {/* Location Map */}
      <motion.div variants={childVariants}>
        <Location />
      </motion.div>
    </motion.section>
  );
};

export default Info;
