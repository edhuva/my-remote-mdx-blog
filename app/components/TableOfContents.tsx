"use client"

import { useEffect, useState } from "react"

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    )

    const newHeadings = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.replace("H", "")),
    }))

    setHeadings(newHeadings)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -60% 0px",
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="text-sm">
      <p className="font-semibold mb-3">On this page</p>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`transition ${
              activeId === heading.id
                ? "text-blue-500 font-medium"
                : "text-gray-500"
            }`}
            style={{
              marginLeft: heading.level === 3 ? "12px" : "0px",
            }}
          >
            <a href={`#${heading.id}`} className="hover:text-blue-400">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}