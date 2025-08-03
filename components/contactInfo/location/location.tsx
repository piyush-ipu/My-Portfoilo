"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const locations = [
  {
    title: "Address",
    address: "G-52, Saurabh Vihar, Jaitpur, Badarpur, New Delhi, South Delhi, New Delhi - 110044",
    phone: "+91 9871050277",
    map: "/images/map.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeInOut", duration: 0.6 } },
};

const Location = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="grid gap-6">
        {locations.map((loc, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-6 p-4 border border-gray-200 rounded-xl shadow-xl backdrop-blur-lg bg-white/60"
          >
            <div className="w-full sm:w-fit lg:w-40 xl:w-full">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-indigo-900 mb-2">
                {loc.title}
              </h3>
              <p className="text-gray-600 lg:line-clamp-2">{loc.address}</p>
              <p className="text-gray-800 mt-2">{loc.phone}</p>
              <div className="border-t border-violet-200 my-4" />
              <Link
                target="_blank"
                href="https://www.google.com/maps/dir/?api=1&destination=28.5069223,77.3215536"
                className="text-primary font-medium flex items-center gap-1 hover:underline"
              >
                Get Directions <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Pulse Circle Effect */}
            <div className="relative flex justify-center items-center min-w-[120px] md:min-w-[150px] mx-auto sm:mx-0">
              <span className="pulse-ring pulse-ring-1 border-indigo-300" />
              <span className="pulse-ring pulse-ring-2 border-indigo-200" />
              <span className="pulse-ring pulse-ring-3 border-indigo-100" />
              <Image
              loading="lazy"
                height={100}
                width={100}
                src={loc.map}
                alt={`${loc.address} map`}
                className="relative z-10 rounded-full border-2 border-gray-200 py-2"
               
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Location;
