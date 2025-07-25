"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Power } from "lucide-react";
import { logout } from "@/app/actions/auth";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Invités", href: "/dashboard#guests" },
  { name: "Tables", href: "/dashboard#tables" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full bg-white/80 dark:bg-background/80 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <h2>Who's Invited ?</h2>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name} className="flex items-center h-full">
              <a
                href={link.href}
                className="relative flex items-center h-full px-3 py-2 text-gray-700 dark:text-foreground font-medium transition-colors duration-200 hover:text-primary"
              >
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                {link.name}
              </a>
            </li>
          ))}

          <Button variant="destructive" onClick={logout}>
            <Power /> Quitter
          </Button>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 group"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-primary transition-transform duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-primary transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-primary transition-transform duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-background shadow-lg transition-all duration-500 overflow-hidden ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        <ul className="flex flex-col py-2 px-6 gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="block px-2 py-2 rounded-md text-gray-700 dark:text-foreground font-medium transition-colors duration-200 hover:bg-primary/10"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <Button>
          <LogOut /> Quitter
        </Button>
      </div>
    </nav>
  );
}
