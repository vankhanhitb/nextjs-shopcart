import { BriefcaseBusiness, Code, Play, Users, type LucideIcon } from "lucide-react";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from './ui/tooltip';
import { cn } from "@/lib/utils";
import Link from "next/link"

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink: {
  title: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/",
    icon: Play,
  },
  {
    title: "Github",
    href: "https://github.com/",
    icon: Code,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/",
    icon: BriefcaseBusiness,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    icon: Users,
  }
]

export default function SocialMedia({ className, iconClassName, tooltipClassName }: Props) {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {
          socialLink.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger
                  render={
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("p-2 border rounded-full hover:text-white hover:border-shop-light-green hoverEffect", iconClassName)}
                    >
                      <Icon className={cn("w-5 h-5", iconClassName)} />
                    </Link>
                  }
                />
                <TooltipContent className={tooltipClassName}>
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          })
        }
      </div>
    </TooltipProvider>
  )
}
