import Link from "next/link"
import { techStack } from "@/data/constants"

import { Icons } from "@/components/icons"

export function TechSection() {
  return (
    <section id="tech-section" aria-label="tech section" className="w-full">
      <div
        className="container hidden w-full max-w-[56rem] animate-fade-up flex-wrap place-items-center items-center justify-center gap-6 opacity-0 sm:flex sm:gap-x-12 sm:gap-y-10 md:gap-x-10 lg:gap-x-12"
        style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
      >
        {techStack.map((tech) => {
          const Icon = Icons[tech.icon as keyof typeof Icons]

          return (
            <Link
              key={tech.title}
              href={tech.href}
              target="_blank"
              rel="noreferer"
            >
              <Icon />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
