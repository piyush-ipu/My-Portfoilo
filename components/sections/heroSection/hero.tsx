"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Text Animations
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// Image Animations
const imageAnimationVariants = {
  light: {
    hidden: { x: -300, rotate: -30, opacity: 0 },
    visible: {
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
    },
  },
  dark: {
    hidden: { x: 300, rotate: 30, opacity: 0 },
    visible: {
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
    },
  },
  profile: {
    hidden: { y: 400, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 1.1, duration: 0.8, ease: "easeOut" },
    },
    float: {
      y: [0, -6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

const Hero = () => {
  return (
    <section className="relative flex hero flex-row items-center z-20 mx-auto lg:gap-[37px] lg:mx-10">
      {/* Text Section */}
      <div className="flex flex-col gap-[13px] items-center md:gap-[34px] md:my-[58px] md:items-start pl-10 sm:pl-0 leadingsnugtext">
        <motion.h1
          className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug lg:w-[480px]"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          <span className="inline-block -ml-2">✌️</span> Hello, I&apos;m Piyush
          Kumar Singh, I&apos;m a{" "}
          <span className="md:inline block text-[27px] md:text-[35px] lg:text-[45px] highlight mt-3 md:mt-0">
            Software Engineer
          </span>
        </motion.h1>

        <motion.p
          className="text-center text-sm mx-auto w-3/4 md:text-start md:mx-0 md:text-[22px]"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
        >
          I&apos;m passionate about building cool stuff, helping others, and
          always exploring new tech and ideas.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
          className="flex items-center md:items-start flex-col z-10"
        >
          <Link href="mailto:a661piyush@gmail.com">
            <Button
              className="group self-center z-10 bg-gradient-to-br from-[#6748FF] via-[#5a3ee0] to-[#4c32c7]
             text-white p-2.5 flex gap-2.5 items-center text-sm md:self-start 
             md:text-xl/6 transition-all shadow-lg hover:brightness-110"
            >
              Let&apos;s connect
              <Image
                width={20}
                height={20}
                src="/svg/arrow_right_icon.svg"
                alt="Arrow right"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </Link>
          <p className="mt-4 text-center md:text-left text-sm md:text-base text-muted-foreground">
            <span className="text-sm text-primary filter brightness-110">
              Curious to know more?
            </span>
            <br />
            <span>Check out my resume for more details.</span>
          </p>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="relative min-w-[300px] main-image-div md:min-w-[360px] h-[380px] md:h-[430px] z-10 mr-[6px] my-[8px] rounded-xl flex items-center justify-center">

        {/* PROFILE CONTAINER */}
        <div className="relative block w-[220px] h-[280px] md:w-[360px] md:h-[430px] z-10 mr-[6px] my-[8px] rounded-xl">
          {/* Light BG */}
          <motion.div
            className="absolute right-0"
            initial="hidden"
            animate="visible"
            variants={imageAnimationVariants.light}
          >
            <Image
              src="/images/profile_light_purple.png"
              alt="Light Profile"
              width={372}
              height={430}
              className="w-[220px] image-div h-[280px] md:w-[372px] md:h-[430px]"
              priority
            />
          </motion.div>

          {/* Dark BG */}
          <motion.div
            className="absolute right-0"
            initial="hidden"
            animate="visible"
            variants={imageAnimationVariants.dark}
          >
            <Image
              src="/images/profile_dark_purple.png"
              alt="Dark Profile"
              width={372}
              height={430}
              className="w-[220px] image-div h-[280px] md:w-[372px] md:h-[430px]"
              priority
            />
          </motion.div>

          {/* Main Profile */}
          <motion.div
            initial="hidden"
            animate={["visible", "float"]}
            variants={imageAnimationVariants.profile}
          >
            <Image
              src="/images/profile_picture.png"
              alt="Profile Image"
              width={357}
              height={417}
              className="w-[220px] image-div h-[280px] md:w-[360px] md:h-[412px] rounded-xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
