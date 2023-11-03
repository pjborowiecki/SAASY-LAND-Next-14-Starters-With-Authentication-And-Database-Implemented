import Link from "next/link"
import { techStack } from "@/data/constants"

import { Icons } from "@/components/icons"

export function TechSection() {
  return (
    <section
      id="tech-section"
      aria-label="tech section"
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500/80 py-8"
    >
      <div
        className="container grid w-full max-w-[56rem] animate-fade-up grid-cols-2 flex-wrap place-items-center items-center justify-center gap-6 opacity-0 sm:flex sm:gap-x-12 sm:gap-y-10"
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
