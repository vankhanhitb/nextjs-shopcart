import { productType } from '@/constants/data';
import Link from 'next/link';
import React from 'react'

interface Props{
  selectedTab: string;
  onTabselect: (tab: string) => void;
}

export default function HomeTabBar({selectedTab, onTabselect}: Props) {
  return (
    <div className="flex items-center justify-around flex-wrap gap-5">
      <div className="flex flex-1 items-center gap-3 text-sm font-semibold">
        {
          productType?.map((item) => (
            <button
            onClick={() => onTabselect(item?.title)}
            key={item?.title}
            className={`border border-shop-light-green/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop-light-green hover:border-shop-light-green hover:text-white hoverEffect ${selectedTab === item?.value ? "bg-shop-light-green text-white border-shop-light-green": "bg-shop-light-green/20"}`}
            >
              {item?.title}
            </button>
          ))
        }
      </div>
      <Link href={"/shop"} className="border border-shop-light-green/30 px-4 py-1.5 md:px-6 md:py2 rounded-full hover:bg-shop-light-green hover:border-shop-light-green hover:text-white hoverEffect">
        See All
      </Link>
    </div>
  )
}
