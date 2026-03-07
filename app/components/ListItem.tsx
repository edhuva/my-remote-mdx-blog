import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"
import { FaBookOpen } from "react-icons/fa6";

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
    const { id, title, date, readingTime } = post
    const formattedDate = getFormattedDate(date)

  return (
   <li className="mt-6">
    <Link
      href={`/posts/${id}`}
      className="block text-xl font-semibold text-black/90 dark:text-white/90 hover:underline hover:text-black/60 transition"
    >
      {title}
    </Link>

    <div className="flex items-center text-sm text-gray-400 mb-6">
      <p >
      {formattedDate} </p>
      <span className="mx-2"> * </span> 
      <div className="flex items-center gap-2">
        <FaBookOpen className="text-blue-500"/> {readingTime}
      </div>
    </div>
  </li>
  )
}