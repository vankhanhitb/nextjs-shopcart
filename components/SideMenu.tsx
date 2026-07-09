"use client"

import { X } from "lucide-react";
import Logo from "./Logo";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";

import {useOutsideClick} from "@/hooks"

interface SidebarProps{
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      aria-label="Close menu"
      onClick={onClose}
      className={`fixed inset-y-0 h-screen text-white/70 left-0 z-50 w-full bg-black/50 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}
    >
      <div ref={sidebarRef} className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop-light-green flex flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button onClick={onClose} className="hover:text-shop-light-green">
            <X />
          </button>
        </div>
        <div className="flex flex-col space-x-3.5 font-semibold tracking-wide">
          {
            headerData?.map((item) =>
              <Link href={item?.href} key={item?.href} className={`hover:text-shop-light-green hoverEffect ${pathname === item.href && "text-white"}`}>{item?.title}</Link>
            )
          }
        </div>
        <SocialMedia />
      </div>
    </div>
  )
}
