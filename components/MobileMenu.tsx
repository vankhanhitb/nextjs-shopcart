"use client"

import { AlignLeft } from 'lucide-react';
import React, { useState } from 'react'
import SideMenu from './SideMenu';
import { Button } from "./ui/button";

export default function MobileMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft className="hover:text-dark hoverEffect md:hidden hover:cursor-pointer" />
      </Button>
      <div className="md:hidden ">
        <SideMenu 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
         />
      </div>
    </>
  )
}
