"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#project" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (
          section &&
          section.getBoundingClientRect().top <= 150 &&
          section.getBoundingClientRect().bottom > 150
        ) {
          setActiveSection(item.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const scroll = () => {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(href);
      }
      setIsOpen(false);
    };
  
    // For sections like Projects, which load late, wait until next frame
    requestAnimationFrame(() => {
      setTimeout(scroll, 100); // Adjust delay if needed
    });
  }, []);
  

  return (
    <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}>
      
      <nav ref={navRef} className="w-fit backdrop-blur-lg mr-2 sm:mr-0 bg-gray-300/30 dark:bg-black/50 rounded-xl py-1 px-1 sm:px-2 sm:py-2 shadow-xl">
        {/* Desktop Navigation */}
        <div className="hidden sm:flex justify-center items-center gap-6 bg-transparent text-white rounded-md sm:rounded-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`sm:px-3 sm:py-1.5 px-1 py-1 rounded-sm sm:rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-primary filter brightness-120 hover:text-white hover:bg-primary"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col justify-end items-end gap-1 bg-transparent p-2 rounded-md drop-shadow-xl"
            aria-label="Open navigation menu"
          >
            <div className="w-4 h-[2px] bg-primary rounded" />
            <div className="w-2 h-[2px] bg-primary rounded" />
            <div className="w-3 h-[2px] bg-primary rounded" />
          </button>

          {/* Slide-in Mobile Menu */}
          <main
            className={`absolute top-0 right-0 w-36 shadow-xl backdrop-blur-xl rounded-md py-4 px-3 z-50 transition-all duration-300 ease-in-out 
              transform ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0 pointer-events-none"
              } bg-white dark:bg-black/90`}
            aria-hidden={!isOpen}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`px-2 py-1 w-fit text-left rounded-sm sm:rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-br from-[#6748FF] via-[#5a3ee0] to-[#4c32c7] hover:brightness-110 text-white"
                          : "text-primary hover:text-white hover:bg-black"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="relative w-6 h-6 flex items-center justify-center ml-2"
                aria-label="Close navigation menu"
              >
                <span className="absolute w-5 h-[2px] bg-black dark:bg-white transform rotate-45" />
                <span className="absolute w-5 h-[2px] bg-black dark:bg-white transform -rotate-45" />
              </button>
            </div>
          </main>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;