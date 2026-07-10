"use client"

import { useState } from "react";
import HomeTabBar from "./ui/HomeTabBar";
import { productType } from "@/constants/data";

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(productType[0].title || "")

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabselect={() => setSelectedTab} />
    </div>
  )
}
