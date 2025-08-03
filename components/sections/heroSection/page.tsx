import Image from "next/image";
import React from "react";
import Hero from "./hero";
import { motion } from "framer-motion";
import { Vortex } from "@/components/ui/vortex";

export const HeroSection = () => {
  return (
    <section id="home" className="w-full relative overflow-hidden z-10 ">
      {/* Background Decorations */}
      {/* <div className="absolute top-0 left-0 w-full h-[795px] bg-repeat-x bg-[url('/top_bg_light.svg')] bg-[auto_auto] dark:hidden hidden md:block z-0" />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-repeat-x bg-[url('/top_bg_mobile_light.svg')] bg-[auto_auto] dark:hidden md:hidden block z-0" />
      <div className="absolute top-0 left-0 w-full h-[795px] bg-repeat-x bg-[url('/top_bg_dark.svg')] bg-[auto_auto] hidden md:dark:block z-0" />
      <div className="absolute top-0 left-0 w-full min-h-[600px] bg-repeat-x bg-[url('/top_bg_mobile_dark.svg')] bg-[auto_auto] hidden dark:block dark:md:hidden z-0" /> */}
      <div className="w-full mx-auto rounded-md h-full overflow-hidden pt-10 md:pt-40">
        <Vortex
          backgroundColor="black"
          className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full border-none shadow-lg"
        >
          <main className="flex flex-col gap-[142px] relative max-w-screen-lg mx-auto z-10">
            <Hero />
          </main>
        </Vortex>
      </div>

      {/* <img
src="hero.svg"
        alt="Top dark mode background highlights"
        width={809}
        height={877}
        className="absolute top-0 left-0 w-full h-[600px] bg-repeat-x bg-[auto_auto] dark:hidden md:hidden block z-0 pointer-events-none"
      /> */}

      {/* Highlight SVGs */}
      <img
        src="/svg/top_highlight.svg"
        alt="Top dark mode background highlights"
        width={809}
        height={877}
        className="absolute top-[-515px] hidden dark:md:block left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      />
      <img
        src="/svg/top_highlight_mobile.svg"
        alt="Top dark mode mobile highlights"
        width={429}
        height={465}
        className="absolute top-[-229px] hidden dark:block dark:md:hidden left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      />

      {/* Icon Decorations */}
      <div className="relative max-w-screen-lg mx-auto z-10">
        {/* Icon 1: Rocket (from the left) */}
        <motion.div
          className="circle-icon absolute z-10 -top-40 left-[180px] hidden sm:flex sm:-top-140 sm:left-72"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/svg/rocket_icon.svg"
            alt="Rocket Icon"
            height={30}
            width={30}
          />
        </motion.div>

        {/* Icon 2: Merge (from the top) */}
        <motion.div
          className="circle-icon absolute z-10 bg-opacity-[12%] hidden sm:flex top-[10px] left-2 sm:-top-100 md:-top-140 lg:-top-124 xl:-top-128 sm:left-[610px]"
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/svg/merge_icon.svg"
            alt="Merge Icon"
            height={30}
            width={30}
          />
        </motion.div>

        {/* Icon 3: Bracket (from the bottom) */}
        <motion.div
          className="circle-icon absolute z-10 bg-opacity-[12%] hidden sm:flex top-[160px] left-2 sm:-top-82 sm:-left-20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/svg/bracket_icon.svg"
            alt="Bracket Icon"
            height={30}
            width={30}
          />
        </motion.div>

        {/* Icon 4: GitHub (from the right) */}
        <motion.div
          className="circle-icon absolute z-10 bg-opacity-[12%] hidden sm:flex -top-[40px] left-4 sm:-top-32 sm:left-80"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/svg/github_icon.svg"
            alt="Github Icon"
            height={30}
            width={30}
          />
        </motion.div>

        {/* Icon 5: Electricity (from bottom) */}
        <motion.div
          className="circle-icon absolute z-10 bg-opacity-[12%] hidden sm:flex  sm:-top-28 sm:left-[570px]"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/svg/electricity_icon.svg"
            alt="Electricity Icon"
            height={30}
            width={30}
          />
        </motion.div>

        {/* Icon 6: Stack (from right) */}
        <motion.div
          className="circle-icon absolute z-10 bg-opacity-[12%] hidden sm:flex sm:-top-[170px] sm:left-[960px]"
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/svg/stack_icon.svg"
            alt="Stack Icon"
            height={30}
            width={30}
          />
        </motion.div>
      </div>
    </section>
  );
};
