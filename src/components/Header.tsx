"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import ShinyButton from "./ui/shiny-button";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const[sidebarOpen,setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className= {`bg-gray-50 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 ${isScrolled ? "shadow-sm" : "shadow-0 bg-transparent"}`}>
        <div className="container mx-auto flex justify-between items-center p-2">

          <Link href={"/"}>
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Image
                src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1735976619/Screenshot_2025-01-04_131130-removebg-preview_vd8xei.png"
                width={600}
                height={600}
                alt="logo"
                className="w-8 h-8 rounded-full"
              />
              Nutron
            </div>
          </Link>

          <div className="md:hidden block">
            <div className="flex">
            <button
              onClick={toggleDarkMode}
              className="md:hidden p-2 hover:bg-gray-50 dark:hover:bg-gray-700 w-8 h-8 rounded-full focus:outline-none flex justify-center items-center"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-gray-50 dark:hover:bg-gray-700 w-8 h-8 rounded-full focus:outline-none flex justify-center items-center"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
          </div>


          <nav className="hidden md:flex space-x-6 text-gray-800 dark:text-gray-200">
            <Link href="#about" className="hover:underline">
              About
            </Link>
            <Link href="#contact" className="hover:underline">
              Contact
            </Link>
            <Link href="#resources" className="hover:underline">
              Resources
            </Link>
          </nav>
 
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 w-8 h-8 rounded-full focus:outline-none flex justify-center items-center"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link href={"/auth/login"}>
              <ShinyButton
                text="Login"
                className="bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none"
              />
            </Link>
          </div>
        </div>
      </header>
 
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar}>
          <div
            className="fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 shadow-lg p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing on sidebar click
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200">Nutron</div>

            </div>

            <nav className="space-y-4">
              <Link
                href="/auth/login"
                className="block text-gray-800 dark:text-gray-200 hover:underline"
                onClick={toggleSidebar}
              >
                Login
              </Link>

              <Link
                href="#about"
                className="block text-gray-800 dark:text-gray-200 hover:underline"
                onClick={toggleSidebar}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="block text-gray-800 dark:text-gray-200 hover:underline"
                onClick={toggleSidebar}
              >
                Contact
              </Link>
              <Link
                href="#resources"
                className="block text-gray-800 dark:text-gray-200 hover:underline"
                onClick={toggleSidebar}
              >
                Resources
              </Link>

            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
