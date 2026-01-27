import React from "react"
import Link from "next/link"
import AnimatedNewsTicker from "./AnimatedNewsTicker"

const newsItems = [
  { title: "Next.js 15 Released", href: "#" },
  { title: "Why Server Components Matter", href: "#" },
  { title: "Tailwind Tips for Clean UI", href: "#" },
]

export default function RightPanel() {
  return (
    <aside className="w-full md:w-80 flex-shrink-0 space-y-6">

      {/* AD / PROMO CARD */}
      <section className="rounded-xl border border-black/20 bg-white dark:bg-zinc-900 p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">Sponsored</h3>
        <div className="text-sm text-black/70 dark:text-white/70">
          <p className="mb-3">
            Build modern websites with Next.js & Tailwind.
          </p>
          <Link
            href="https://nextjs.org/"
            className="inline-block rounded-md bg-black text-white px-4 py-2 text-sm hover:opacity-80 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      <AnimatedNewsTicker />

      {/* RELATED NEWS */}
      <section className="rounded-xl border border-black/20 bg-white dark:bg-zinc-900 p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3">Related News</h3>
        <ul className="space-y-3 text-sm">
          {newsItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="hover:underline text-black/80 dark:text-white/80"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA PANEL */}
      <section className="rounded-xl border bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">Follow My Work</h3>
        <p className="text-sm mb-3 text-black/70 dark:text-white/70">
          Tutorials, projects & dev tips weekly.
        </p>
        <Link
          href="https://www.youtube.com/@EdhuvaTechCode"
          target="_blank"
          className="inline-block w-full rounded-md bg-red-600 text-white px-4 py-2 text-center text-sm hover:opacity-80 transition"
        >
          Subscribe on YouTube
        </Link>
      </section>

    </aside>
  )
}


//  <div className='bg-black/2 p-2 gap-2 flex flex-col '>
//             <h3 className="text-2xl font-bold  text-black/60 dark:text-white/90">Your Future self is watching.</h3>
//             <h3 className="text-2xl font-bold text-black/60 dark:text-white/90">Keep moving forwad.</h3>
//             <h3 className="text-2xl font-bold text-black/60 dark:text-white/90">The journey shapes you.</h3>
//             <h3 className="text-2xl font-bold text-black/60 dark:text-white/90">Today decides tomorrow.</h3>
//         </div>
