import React from "react"
import Link from "next/link"

const newsItems = [
  { title: "Next.js 15 introduces partial prerendering", href: "#" },
  { title: "React Compiler is now in beta", href: "#" },
  { title: "Tailwind CSS v4 performance boost", href: "#" },
  { title: "Why Server Actions are replacing APIs", href: "#" },
  { title: "AI tools every developer should use", href: "#" },
]

export default function AnimatedNewsTicker() {
  return (
    <section className="rounded-xl border border-black/20 bg-white dark:bg-zinc-900 p-4 shadow-md overflow-hidden">
      <h3 className="text-lg font-semibold mb-3">Tech News</h3>

      <div className="relative h-40 overflow-hidden group">
        <ul className="absolute w-full animate-ticker space-y-4 group-hover:pause-anim">
          {newsItems.concat(newsItems).map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block text-sm hover:underline text-black/80 dark:text-white/80"
              >
                • {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
