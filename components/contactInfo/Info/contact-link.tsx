"use client"
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const Contactlink = () => {
  const [showText, setShowText] = useState({
    phone: true,
    mail: false,
    linkedin: false,
  });

  const toggleText = (key: string) => {
    setShowText((prev) => {
      if (prev[key as keyof typeof prev]) {
        return prev;
      }

      return {
        phone: false,
        mail: false,
        linkedin: false,
        [key]: true,
      };
    });
  };

  const contactItems = [
    {
      key: "phone",
      icon: <Phone size={24} />,
      text: "+91 9871050277",
      url: "tel:+91 9871050277"
    },
    {
      key: "mail",
      icon: <Mail size={24} />,
      text: "a661piyush@gmail.com",
      url: "mailto:a661piyush@gmail.com"
    },
    {
      key: "linkedin",
      icon: <Linkedin size={24} />,
      text: "Piyush Kumar Singh",
      url: "www.linkedin.com/in/piyush-kumar-singh-39826a259"
    },
    {
      key: "GitHub",
      icon: <Github size={24} />,
      text: "piyush-ipu",
      url: "https://github.com/piyush-ipu/"
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {contactItems.map(({ key, icon, text, url }) => {
        const isVisible = showText[key as keyof typeof showText];
        return (
          <div
            key={key}
            onClick={() => toggleText(key)}
            className={`flex items-center bg-indigo backdrop-blur-lg border border-blue-900 shadow-xl w-fit p-1 rounded-full transition-all duration-300 ${
              isVisible ? "px-2" : "p-2 cursor-pointer"
            }`}
          >
            <div className="bg-indigo-700 p-2 rounded-full">{icon}</div>
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    href={url}
                    className="ml-2 text-indigo-600 hover:underline text-sm transform transition-transform duration-300 translate-x-0 opacity-100"
                  >
                    {text}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  )
}

export default Contactlink
