import Link from "next/link"

import { techStack } from "@/data/tech-stack"
import { Icons } from "@/components/icons"

export function TechSection(): JSX.Element {
  return (
    <section
      id="tech-section"
      aria-label="tech section"
      className="hidden w-full bg-background py-8 sm:grid"
    >
      <div
        className="container flex w-full max-w-[56rem] animate-fade-up flex-wrap place-items-center items-center justify-center gap-6 opacity-0 sm:gap-[38px] md:gap-[36px] lg:gap-x-12"
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
              className="transition-all duration-200 ease-out hover:opacity-70"
            >
              <Icon />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
