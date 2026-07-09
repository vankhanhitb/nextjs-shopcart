import React from 'react'
import { Title } from './ui/text';
import Link from 'next/link';
import { banner_1 } from '@/images';
import Image from "next/image";

export default function HomeBanner() {
  return (
    <div className="py-16 md:py-0 bg-shop-light-pink rounded-lg lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title className="mb-5">
          Grab Upto 50% off on <br/> Selected headphone
        </Title>
        <Link href={"/shop"} className="bg-shop-dark-green/90 text-white/90 px-5 py-2 rounded-md font-semibold hover:text-white">
          By Now
        </Link>
      </div>
      <div>
        <Image src={banner_1} alt="banner-home" className="hidden md:inline-flex w-96" />
      </div>
    </div>
  )
}
