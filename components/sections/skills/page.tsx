"use client";

import React, { useEffect, useState, useRef } from "react";
import skillsData from "@/data/skills.json";
import { SectionContainer } from "../SectionContainer";
import { SectionHeader } from "../SectionHeader";
import Image from "next/image";
import { Skill } from "./skill";
import { motion, useInView } from "framer-motion";

type SkillType = {
  name: string;
  icon: string;
};

type AnimatedSkill = SkillType & {
  direction: "left" | "right";
};

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState<AnimatedSkill[]>([]);
  const sectionRef = useRef(null);
  const [amount, setAmount] = useState(1.0); // Default for large screens

  useEffect(() => {
    const handleResize = () => {
      setAmount(window.innerWidth < 768 ? 0.5 : 1.0);
    };

    handleResize(); // Initial run
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isInView = useInView(sectionRef, {
    once: false,
    amount,
  });

  useEffect(() => {
    if (isInView && animatedSkills.length === 0) {
      const randomized: AnimatedSkill[] = skillsData.map((skill) => ({
        ...skill,
        direction: Math.random() < 0.5 ? "left" : "right",
      }));
      setAnimatedSkills(randomized);
    }
  }, [isInView, animatedSkills.length]);

  const getMotionProps = (direction: "left" | "right", delay: number) => ({
    initial: { x: direction === "left" ? "-100%" : "100%", opacity: 0 },
    animate: isInView ? { x: 0, opacity: 1 } : {},
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      delay,
    },
  });

  return (
    <SectionContainer id="skills">
      <div
        className="section-contents mx-[22px] md:mx-[116px] relative"
        ref={sectionRef}
      >
        <SectionHeader plainText="" highlightText="👨‍💻 Tech Stacks" />

        <div className="card w-full px-[33px] py-[27px] flex flex-wrap justify-center items-center z-10 gap-[19px] md:gap-[33px] overflow-hidden">
          {animatedSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              {...getMotionProps(skill.direction, idx * 0.05)}
            >
              <Skill name={skill.name} icon={skill.icon} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background images */}
      <>
        <Image
          src="/svg/tech_stack_grid_dark.svg"
          alt="Background grid"
          width={569}
          height={373}
          className="hidden dark:md:block z-1 absolute -left-[135px]"
        />
        <Image
          src="/svg/tech_stack_grid.svg"
          alt="Background grid"
          width={569}
          height={373}
          className="hidden dark:hidden md:block z-1 absolute -left-[125px]"
        />
      </>
    </SectionContainer>
  );
};

export default Skills;