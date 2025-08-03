"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Section from "@/components/sections/page";
import { Resume } from "@/components/Resume/page";

export default function Home() {
  return (
    <>
      <header className="flex justify-end sm:justify-center sticky top-2 z-[999]">
        <Resume />
        <Navbar />
      </header>

      <main className="-mt-11">
        <Section />
      </main>

      <footer className="w-full border-t border-gray-300 dark:border-white/20 mt-10 py-6 px-6 bg-gradient-to-r from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
  <div className="max-w-6xl mx-auto sm:ml-4 md:ml-12 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 dark:text-neutral-300">
          <div className="mb-3 sm:mb-0 text-center sm:text-left">
            © {new Date().getFullYear()} Piyush Kumar Singh — Full Stack Developer{" "}
            <br className="sm:hidden" />
            Blending functionality with beautiful UI to build seamless digital
            experiences.
          </div>
        </div>
      </footer>
    </>
  );
}
