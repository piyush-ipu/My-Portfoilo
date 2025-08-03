"use client";

import React, { useEffect, useRef, useState } from "react";
import { SectionContainer } from "../SectionContainer";
import { SectionHeader } from "../SectionHeader";
import rawProjects from "@/data/projects.json" assert { type: "json" };
import { Project } from "./project";
import { motion, useInView } from "framer-motion";

// Typing
type ProjectType = {
  thumbnail: string;
  title: string;
  link: {
    label: string;
    url: string;
  };
  description: string;
  languageIcons: string[];
  video: string;
};

export const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showProjects, setShowProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Load project data
  useEffect(() => {
    setProjects(rawProjects as unknown as ProjectType[]);
  }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Delay showing projects after intro animation
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowProjects(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Animation properties
  const getMotionProps = (delay: number) => {
    if (isMobile) {
      return {
        initial: { y: 50, opacity: 0 },
        animate: isInView ? { y: 0, opacity: 1 } : {},
        transition: { duration: 0.5, ease: "easeOut", delay },
      };
    }

    return {
      initial: { scale: 0.5, opacity: 0 },
      animate: isInView ? { scale: 1, opacity: 1 } : {},
      transition: { type: "spring", stiffness: 80, damping: 10, delay },
    };
  };

  return (
    <SectionContainer id="project" >
      <div className="section-contents gap-0 my-5 mx-6 md:mx-[64px]" ref={ref}>
        <SectionHeader className="px-16 py-2" plainText="" highlightText="👷‍♂️ Best Works" />

        {/* Section fade-in */}
        <div>
          {showProjects && (
            <motion.div 
            initial={
              isMobile ? { y: 50, opacity: 0 } : { scale: 0.8, opacity: 0 }
            }
            animate={isInView ? { y: 0, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
              {projects.map((project, idx) => {
                const delay = idx * 0.3;
                return (
                  <motion.div key={idx} {...getMotionProps(delay)}>
                    <Project
                      thumbnail={project.thumbnail}
                      video={project.video}
                      title={project.title}
                      link={project.link}
                      description={project.description}
                      languageIcons={project.languageIcons}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* Backgrounds */}
      {/* <>
        <Image
          src="/svg/projects_highlight.svg"
          alt="Background project"
          width={558}
          height={558}
          className="absolute -z-10 hidden md:block left-1/2 -translate-x-1/2 translate-y-1/2"
        />
        <Image
          src="/svg/projects_highlight_mobile.svg"
          alt="Mobile Background project"
          width={558}
          height={558}
          className="absolute -z-10 md:hidden left-1/2 -translate-x-1/2 translate-y-1/2"
        />
        
      </> */}
    </SectionContainer>
  );
};
