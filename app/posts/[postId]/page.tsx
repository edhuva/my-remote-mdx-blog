import getFormattedDate from "@/lib/getFormattedDate";
import { getPostByName, getPostsMeta } from "@/lib/post";
import Link from "next/link";
import { notFound } from "next/navigation";
import TableOfContents from "@/app/components/TableOfContents";
import "highlight.js/styles/github-dark.css";
import { FaBookOpen } from "react-icons/fa6";


export const revalidate = 86400
// export const revalidate = 10

type Props = {
    params: Promise<{
        postId: string
    }>
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped

     if (!posts) return []

    return posts.map((post) => ({
         postId: post.id
    }))
}

export async function generateMetadata({ params }: Props) {
    const { postId } = await params
  const post = await getPostByName(`${postId}.mdx`);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return { title: post.meta.title };
}

export default async function page({ params }: Props) {
  const { postId } = await params
  const post = await getPostByName(`${postId}.mdx`);
  if (!post) notFound();

  const {
    meta: { title, date, author, tags, readingTime },
    content,
  } = post;

  const formattedPubDate = getFormattedDate(date);

  return (
   
    
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10 my-20">

      {/* TOC */}

      <aside className="hidden lg:block sticky top-24 h-fit">
      <TableOfContents />
      </aside>

      {/* ARTICLE */}

       <main className="max-w-3xl mx-auto px-6 pt-8">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 ">{title}</h1>
        <p className="text-sm text-gray-500 mb-3 mt-4">Author: {author}</p>
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <p >
          {formattedPubDate} </p>
          <span className="mx-2"> * </span> 
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-blue-500"/> {readingTime}
          </div>
        </div>

        {/* MDX Content */}
        <article className="space-y-6 leading-relaxed text-slate-800 
        [&_ul]:list-disc [&_ul]:ml-6
        [&_ol]:list-decimal [&_ol]:ml-6
        [&_li]:my-1   
        
        
        [&_blockquote]:border-l-4
        [&_blockquote]:border-blue-500
        [&_blockquote]:pl-4
        [&_blockquote]:italic
        [&_blockquote]:bg-slate-800
        [&_blockquote]:rounded-md
        [&_blockquote]:py-2
      "> 
          {content} ✅ NOT content()
        </article>

        <hr className="my-8" />

        {/* Related */}
        <h3 className="font-semibold mb-2">Related</h3>
        <ul className="flex gap-4">
          {tags.map((tag, i) => (
            <li key={i}>
              <Link
                href={`/tags/${tag}`}
                className="text-blue-500 hover:underline"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to home
          </Link>
        </p>
      </main>

      </section>
  );
}

{/* [&_pre]:bg-slate-900
      [&_pre]:rounded-xl
      [&_pre]:p-4
      [&_pre]:overflow-x-auto
      [&_pre]:text-sm
      [&_code]:text-blue-300 */}