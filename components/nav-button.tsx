"use client";
import React, { useState, useEffect, useCallback } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbutton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Detects active section on scroll
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

  // Scroll to section when clicking a menu item
  const scrollToSection = useCallback((href: string) => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
    setIsOpen(false);
  }, []);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col justify-end items-end gap-1 bg-transparent backdrop-blur-md p-2 rounded-md border border-gray-100 drop-shadow-xl"
        aria-label="Open navigation menu"
      >
        <div className="w-4 h-[2px] bg-black rounded" />
        <div className="w-3 h-[2px] bg-black rounded" />
        <div className="w-2 h-[2px] bg-black rounded" />
      </button>

      {/* Dropdown Slide-in Menu */}
      <main
        className={`absolute top-0 right-0 w-36 bg-white shadow-xl rounded-lg py-4 px-3 z-50 transition-all duration-300 ease-in-out 
          transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-between items-start">
          {/* Left side: Navigation Links */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-2 py-1 w-fit text-left rounded-sm sm:rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-violet-500 text-white"
                      : "text-violet-500 hover:text-white hover:bg-black"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right side: Cancel Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="relative w-6 h-6 flex items-center justify-center ml-2"
            aria-label="Close navigation menu"
          >
            <span className="absolute w-5 h-[2px] bg-black transform rotate-45" />
            <span className="absolute w-5 h-[2px] bg-black transform -rotate-45" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Navbutton;
