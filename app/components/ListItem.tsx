import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
    const { id, title, date } = post
    const formattedDate = getFormattedDate(date)

  return (
   <li className="mt-6">
    <Link
      href={`/posts/${id}`}
      className="block text-xl font-semibold text-black/90 dark:text-white/90 hover:underline hover:text-black/60 transition"
    >
      {title}
    </Link>

    <p className="mt-1 text-sm text-black/50 dark:text-white/50">
      {formattedDate}
    </p>
  </li>
  )
}