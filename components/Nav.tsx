"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
} from "react-icons/fi";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import SearchBar from "./Search";

/**
 * Desktop dropdown approach:
 * - Uses `group` + `group-hover` to show dropdown on hover.
 * - Also supports click toggling for accessibility (keyboard/tap).
 * - Dropdown is absolutely positioned with `top-full left-0` so it appears directly under trigger.
 */

const Nav: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false); // mobile sheet
  const [shopOpen, setShopOpen] = useState(false); // click toggle desktop
  const [orderOpen, setOrderOpen] = useState(false); // click toggle desktop

  // Dummy counts (replace with real logic)
  const [cart] = useState<number>(2);
  const [wishlist] = useState<number>(1);

  const shopRef = useRef<HTMLDivElement | null>(null);
  const orderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      const current = window.scrollY;
      setIsVisible(current < lastScrollY || current < 10);
      setLastScrollY(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // close dropdowns on outside click
    const onClickOutside = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderOpen(false);
      }
    };

    document.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClickOutside);
    };
  }, [lastScrollY]);

  if (!mounted) return null;

  return (
    <nav
      className={`bg-white dark:bg-black dark:text-white shadow-md md:px-6 px-2 py-4 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* LEFT DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="font-bold text-gray-800 dark:text-white hover:text-gray-600"
          >
            HOME
          </Link>

          <Link
            href="/allproducts"
            className="font-bold text-gray-800 dark:text-white hover:text-gray-600"
          >
            WINTER 24/25
          </Link>

          {/* SHOP - hover + click dropdown */}
          <div
            ref={shopRef}
            className="relative group"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setShopOpen((s) => !s);
                setOrderOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={shopOpen}
              className="font-bold text-gray-800 dark:text-white hover:text-gray-600 inline-flex items-center gap-2"
            >
              SHOP
              <svg
                className="w-3 h-3 mt-0.5"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown content - positioned directly under trigger */}
            <div
              className={`absolute left-0 top-full  w-56 bg-white dark:bg-black rounded-lg shadow-lg ring-1 ring-black/5 z-50 transform origin-top transition-opacity duration-150 ${
                shopOpen ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-95"
              } group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto`}
            >
              <ul className="p-4 space-y-2">
                <li>
                  <Link href="/mens" className="block px-2 py-1 hover:text-gray-600">
                    Men&apos;s Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/womens" className="block px-2 py-1 hover:text-gray-600">
                    Women&apos; Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/kids" className="block px-2 py-1 hover:text-gray-600">
                    Kids&apos; Fashion
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* HOW TO ORDER - hover + click dropdown */}
          <div
            ref={orderRef}
            className="relative group"
            onMouseEnter={() => setOrderOpen(true)}
            onMouseLeave={() => setOrderOpen(false)}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setOrderOpen((s) => !s);
                setShopOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={orderOpen}
              className="font-bold text-gray-800 dark:text-white hover:text-gray-600 inline-flex items-center gap-2"
            >
              HOW TO ORDER
              <svg
                className="w-3 h-3 mt-0.5"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div
              className={`absolute left-0 top-full  w-56 bg-white dark:bg-black rounded-lg shadow-lg ring-1 ring-black/5 z-50 transform origin-top transition-opacity duration-150 ${
                orderOpen ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-95"
              } group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto`}
            >
              <ul className="p-4 space-y-2">
                <li>
                  <Link href="/order" className="block px-2 py-1 hover:text-gray-600">
                    Ordering Process
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="block px-2 py-1 hover:text-gray-600">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="block px-2 py-1 hover:text-gray-600">
                    Returns & Refunds
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* LOGO in center */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="rounded-full overflow-hidden">
            <h1 className="font-bold text-lg md:text-xl">Betichrome Plus</h1>
          </Link>
        </div>

        {/* RIGHT SECTION (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="mx-5">
            <SearchBar />
          </div>

          {/* CART */}
          <div className="relative">
            <Link href="/cart" className="inline-block">
              <FiShoppingCart size={22} className="cursor-pointer" />
              <span className="w-5 h-5 bg-black text-white rounded-full absolute left-3 -top-5 text-xs flex items-center justify-center">
                {cart}
              </span>
            </Link>
          </div>

          {/* WISHLIST */}
          <div className="relative">
            <Link href="/wishlist" className="inline-block">
              <FiHeart size={22} className="cursor-pointer" />
              <span className="w-5 h-5 bg-black text-white rounded-full absolute left-3 -top-5 text-xs flex items-center justify-center">
                {wishlist}
              </span>
            </Link>
          </div>

          <Link href="/account">
            <FiUser size={22} className="cursor-pointer" />
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden flex items-center">
          {/* Search popup */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <FiSearch size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4">
              <SearchBar />
            </SheetContent>
          </Sheet>

          {/* Wishlist */}
          <div className="relative mx-2">
            <Link href="/wishlist" className="inline-block">
              <FiHeart size={22} />
              <span className="w-5 h-5 bg-black text-white rounded-full absolute left-3 -top-5 text-xs flex items-center justify-center">
                {wishlist}
              </span>
            </Link>
          </div>

          {/* Cart */}
          <div className="relative mx-2">
            <Link href="/cart" className="inline-block">
              <FiShoppingCart size={22} />
              <span className="w-5 h-5 bg-black text-white rounded-full absolute left-3 -top-5 text-xs flex items-center justify-center">
                {cart}
              </span>
            </Link>
          </div>

          {/* Mobile Sheet Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 ml-2">
                <FiMenu size={26} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-6">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">betichrom fashion</SheetTitle>
                <SheetDescription className="text-sm">
                  Explore our collections
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-4 flex flex-col">
                <Link href="/">HOME</Link>  
                <Link href="/allproducts">WINTER 24/25</Link>

                <div>
                  <Button variant="ghost" className="w-full text-left">
                    Shop
                  </Button>
                  <div className=" space-y-2 mt-2 flex flex-col">
                    <Link href="/mens">Men&apos;s Fashion</Link>
                    <Link href="/womens">Women&apos; Fashion</Link>
                    <Link href="/kids">Kids&apos; Fashion</Link>
                  </div>
                </div>

                <div>
                  <Button variant="ghost" className="w-full text-left">
                    HOW TO ORDER
                  </Button>
                  <div className="space-y-2 mt-2 flex flex-col">
                    <Link href="/order">Ordering Process</Link>
                    <Link href="/order">Shipping Info</Link>
                    <Link href="/order">Returns & Refunds</Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
