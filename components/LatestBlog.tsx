import React from 'react'
import { Title } from './ui/text';
import { getLatestBlogs } from '@/sanity/queries/index'
import type { Blog } from "@/sanity.types";
import { urlFor } from '@/sanity/lib/image';
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import dayjs from "dayjs";
import { title } from 'motion/react-client';

export default async function LatestBlog() {
  const blogs = await getLatestBlogs()
  console.log(blogs);
  return (
    <div className="mb-10 lg:mb-20">
      <Title>Latest Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {blogs?.length && blogs?.map((blog: Blog) => (
          <div key={blog._id} className="rounded-lg overflow-hidden">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`} className="block overflow-hidden rounded-[5px]">
                <Image 
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover hover:scale-105 hoverEffect"
                />
              </Link>
            )}
            <div className="bg-shop-light-bg p-5">
              <div className="text-xs flex items-center gap-5">
                <div className="flex items-center relative group cursor-pointer">
                   {blog?.blogcategories?.map((item, index) => (
                    <p key={index} className="font-semibold text-shop-btn-dark-green tracking-wide">
                      {item?.title}
                    </p>
                   ))}
                   <span className="absolute left-0 -bottom-1 bg-ligh-color/30 inline-block min-w-full w-full h-0.5
                    group-hover:bg-shop-btn-dark-green hover:cursor-pointer hoverEffect"/>
                </div>
                <p className="flex items-center gap-1 text-light-color relative group hover:cursor-pointer hover:text-shop-dark-green hoverEffect tracking-wide">
                  <Calendar size={15} />{" "}
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                  <span className="absolute left-0 -bottom-1 bg-light-color/30 inline-block w-full h-0.5 group-hover:bg-shop-dark-green hoverEffect" />
                </p>
              </div>
              <Link 
                href={`/blog/${blog?.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
              >
                {blog?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
