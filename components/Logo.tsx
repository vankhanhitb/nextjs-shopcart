import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({className, spanDesign}: {className?: string, spanDesign?: string}){
  return(
    <Link href={"/"}>
      <h2 className={
        cn(
          "text-2xl text-shop-dark-green font-black tracking-wide uppercase hover:text-shop-light-green hoverEffect group", 
        className)}
      >
        Shopcar<span className={cn("text-shop-light-green group-hover:text-shop-dark-green", spanDesign)}>t</span>
      </h2>
    </Link>
  )
}