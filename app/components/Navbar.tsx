"use client"

import Link from "next/link"
import { FaYoutube, FaLinkedin, FaGithub, FaXTwitter, FaBriefcase } from "react-icons/fa6"
import { useState, useEffect, useRef } from "react"

function TooltipLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="text-black/70 hover:text-black/40 transition"
        target="_blank"
      >
        {children}
      </Link>

      {/* Tooltip */}
      <span
        className="
          absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded-md bg-black/80 px-2 py-1 text-xs text-white whitespace-nowrap
          shadow-lg
        "
      >
        {label}
      </span>
    </div>
  )
}

export default function Navbar() {
  const [show, setShow] = useState<boolean>(true)
  const lastScroll = useRef<number>(0)

  useEffect(() => {
    const handleScrolling = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        setShow(false)
      } else {
        setShow(true)
      }

      lastScroll.current = currentScroll
    }

    window.addEventListener("scroll", handleScrolling, { passive: true })
    return () => window.removeEventListener("scroll", handleScrolling)
  }, [])

  return (
    <nav
      className={`bg-zinc-100 p-4 drop-shadow-xl z-50 fixed w-full top-0 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col md:flex-row max-w-2xl">
        <Link
          href="/"
          className="text-black/70 font-bold no-underline hover:text-black/40 flex justify-center mb-3 md:mb-0"
        >
          Edwin Matema
        </Link>

        <div className="flex flex-row justify-center gap-5 text-3xl">
          <TooltipLink href="https://edwin-portfolio.onrender.com/" label="Portfolio">
            <FaBriefcase />
          </TooltipLink>

          <TooltipLink href="https://www.youtube.com/@EdhuvaTechCode" label="YouTube">
            <FaYoutube />
          </TooltipLink>

          <TooltipLink href="https://github.com/edhuva" label="GitHub">
            <FaGithub />
          </TooltipLink>

          <TooltipLink href="https://x.com/EdwinMatema" label="Twitter / X">
            <FaXTwitter />
          </TooltipLink>

          <TooltipLink
            href="https://www.linkedin.com/in/edwin-matema-68101516a"
            label="LinkedIn"
          >
            <FaLinkedin />
          </TooltipLink>
        </div>
      </div>
    </nav>
  )
}





// "use client"
// import Link from "next/link"
// import { FaYoutube, FaLinkedin, FaGithub, FaXTwitter, FaBriefcase } from "react-icons/fa6"
// import { useState, useEffect, useRef } from "react"

// export default function Navbar() {
//     const [show, setShow] = useState<boolean>(false)
//     const lastScroll = useRef<number>(0)

//     useEffect(() => {
//         const handleScrolling = () => {
//             const currentScroll = window.scrollY

//             if (currentScroll > lastScroll.current && currentScroll > 100) {
//                 setShow(false)
//             } else {
//                 setShow(true)
//             }

//             lastScroll.current = currentScroll
//         }

//         window.addEventListener('scroll', handleScrolling, { passive: true })

//         return () => window.removeEventListener('scroll', handleScrolling)
//     }, [lastScroll])

//   return (
//     <nav className={`bg-zinc-100 p-4 drop-shadow-xl z-50 fixed  w-full top-0 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
//     >
        
//         <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col md:flex-row max-w-2xl
//         ">
//             <Link href="/" className="text-black/70 font-bold no-underline hover:text-black/40 flex justify-center mb-3 md:mb-0">
//                 Edwin Matema
//             </Link>
//             <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-black/70 text-3xl">
//                 <Link className="text-black/70 hover:text-black/40" href="https://edwin-portfolio.onrender.com/">
//                     <FaBriefcase />
//                 </Link>
//                 <Link className="text-black/70 hover:text-black/40" href="https://www.youtube.com/@EdhuvaTechCode">
//                     <FaYoutube />
//                 </Link>
//                 <Link className="text-black/70 hover:text-black/40" href="https://github.com/edhuva">
//                     <FaGithub />
//                 </Link>
//                 <Link className="text-black/70 hover:text-black/40" href="https://x.com/EdwinMatema">
//                     <FaXTwitter />
//                 </Link>
//                 <Link className="text-black/70 hover:text-black/40" href="https://www.linkedin.com/in/edwin-matema-68101516a">
//                     <FaLinkedin />
//                 </Link>
//             </div>
//         </div>
//     </nav>
//   )
// }

