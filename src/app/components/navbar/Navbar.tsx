"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMenu, 
  FiX,
  FiHome,
  FiPhone
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiCarLine, RiShipLine } from "react-icons/ri";
import { IoAirplaneOutline } from "react-icons/io5";
import "../../styles/globals.css";

const navList = [
  {
    name: "Home",
    href: "/",
    icon: <FiHome className="w-5 h-5" />,
  },
  {
    name: "Car Rentals",
    href: "/car-rentals",
    icon: <RiCarLine className="w-5 h-5" />,
  },
  {
    name: "Flights",
    href: "/flights",
    icon: <IoAirplaneOutline className="w-5 h-5" />,
  },
  {
    name: "Hotels",
    href: "/hotels",
    icon: <HiOutlineBuildingOffice2 className="w-5 h-5" />,
  },
  {
    name: "Cruise",
    href: "/cruise",
    icon: <RiShipLine className="w-5 h-5" />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Simplified scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close navbar when clicking outside
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (isOpen && !(e.target as HTMLElement).closest("#navbar-menu")) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, handleOutsideClick]);

  // Custom Logo Component
  const Logo = () => (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2"
    >
      <div className="relative">
        {/* Logo Icon */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        {/* Animated Ping Dot */}
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0 right-0"></div>
        </div>
      </div>
      

      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          mybookinghelp
        </span>
        <span className="text-[10px] text-gray-500 font-medium -mt-1">
          Travel Simplified
        </span>
      </div>
    </motion.div>
  );

  // Mobile Logo Component
  const MobileLogo = () => (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-900">mybookinghelp</span>
        <span className="text-[10px] text-gray-500 font-medium -mt-1">
          Travel Simplified
        </span>
      </div>
    </div>
  );

  // Optimized NavLink component to prevent unnecessary re-renders
  const NavLink = ({ item }: { item: typeof navList[0] }) => (
    <motion.div 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          pathname === item.href
            ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <span className={pathname === item.href ? "text-white" : "text-blue-600"}>
          {item.icon}
        </span>
        <span>{item.name}</span>
      </Link>
    </motion.div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 items-center">
            {navList.map((item, index) => (
              <NavLink key={index} item={item} />
            ))}
            
            {/* Contact Section */}
            <motion.div 
              className="hidden lg:flex items-center gap-3 ml-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex cursor-pointer border-l-2 pl-4 justify-center items-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xl p-2 text-blue-600"
                >
                  <FiPhone />
                </motion.div>
                <span className="flex flex-col">
                  <span className="text-xs pl-1 text-gray-500">
                    Call 24/7 for deals
                  </span>
                  <a
                    href="tel:+18449545425"
                    className="text-lg text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    +1 (844) 954-5425
                  </a>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl p-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu"
          >
            <FiMenu />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="navbar-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 border-l border-gray-200"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <MobileLogo />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl p-2 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-2 flex-grow">
                {navList.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-lg transition-colors ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-md"
                        : "hover:bg-blue-100 text-gray-700"
                    }`}
                  >
                    <span className={`${pathname === item.href ? "text-white" : "text-blue-600"}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Contact Section */}
              <div className="mt-auto pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Contact Us</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+18449545425"
                    className="flex items-center gap-3 p-3 bg-blue-100 rounded-lg text-blue-600 font-medium hover:bg-blue-200 transition-colors"
                  >
                    <FiPhone className="text-blue-500" />
                    <span>+1 (844) 954-5425</span>
                  </a>
                  
                  <a
                    href="https://wa.me/18449545425"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-100 rounded-lg text-green-600 font-medium hover:bg-green-200 transition-colors"
                  >
                    <FaWhatsapp className="text-green-500" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                
                {/* Tagline */}
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 text-center font-medium">
                    Your Travel, Our Expertise
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;