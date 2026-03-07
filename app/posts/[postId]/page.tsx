import getFormattedDate from "@/lib/getFormattedDate";
import { getPostByName, getPostsMeta } from "@/lib/post";
import Link from "next/link";
import { notFound } from "next/navigation";
import TableOfContents from "@/app/components/TableOfContents";
import "highlight.js/styles/github-dark.css";
import { FaBookOpen } from "react-icons/fa6";

export const revalidate = 86400;

type Props = {
    params: Promise<{
        postId: string
    }>
}

export async function generateStaticParams() {
    const posts = await getPostsMeta();
    if (!posts) return [];
    return posts.map((post) => ({
        postId: post.id
    }));
}

export async function generateMetadata({ params }: Props) {
    const { postId } = await params;
    const post = await getPostByName(`${postId}.mdx`);
    if (!post) return { title: "Post Not Found" };
    return { title: post.meta.title };
}

export default async function page({ params }: Props) {
    const { postId } = await params;
    const post = await getPostByName(`${postId}.mdx`);
    if (!post) notFound();

    const {
        meta: { title, date, author, tags, readingTime },
        content,
    } = post;

    const formattedPubDate = getFormattedDate(date);

    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 lg:gap-10 my-26">
            {/* TOC - Hidden on mobile, visible on desktop */}
            <aside className="hidden lg:block sticky top-24 h-fit">
                <p className="mb-8">
                    <Link 
                        href="/" 
                        className="text-blue-600 hover:underline inline-flex items-center gap-2
                                 hover:text-blue-800 transition-colors duration-200"
                    >
                        <span aria-hidden="true">←</span> Back to home
                    </Link>
                </p>
                <TableOfContents />
            </aside>

            {/* ARTICLE */}
            <main className="w-full max-w-3xl mx-auto overflow-hidden">
              <p className="mt-4 mb-4 block sm:hidden">
                    <Link 
                        href="/" 
                        className="text-blue-600 hover:underline inline-flex items-center gap-2
                                 hover:text-blue-800 transition-colors duration-200"
                    >
                        <span aria-hidden="true">←</span> Back to home
                    </Link>
                </p>
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words hyphens-auto">
                    {title}
                </h1>
                
                <p className="text-sm text-gray-500 mb-3 mt-4">Author: {author}</p>
                
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-6">
                    <span>{formattedPubDate}</span>
                    <span className="hidden xs:inline">•</span>
                    <div className="flex items-center gap-2">
                        <FaBookOpen className="text-blue-500 flex-shrink-0" />
                        <span className="break-words">{readingTime}</span>
                    </div>
                </div>

                {/* MDX Content - Custom styles without prose */}
                <article className="
                    space-y-6 
                    text-slate-800 
                    text-base sm:text-lg
                    leading-relaxed
                    break-words
                    overflow-hidden
                    
                    /* Headings */
                    [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:break-words
                    [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:break-words
                    [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:break-words
                    [&_h4]:text-base [&_h4]:sm:text-lg [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:break-words
                    
                    /* Paragraphs and text */
                    [&_p]:mb-4 [&_p]:break-words [&_p]:overflow-hidden
                    [&_p:last-child]:mb-0
                    
                    /* Lists */
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:sm:pl-6 [&_ul]:mb-4 [&_ul]:break-words
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:sm:pl-6 [&_ol]:mb-4 [&_ol]:break-words
                    [&_li]:mb-1 [&_li]:break-words [&_li]:leading-relaxed
                    [&_li_ul]:mt-1 [&_li_ul]:mb-0 [&_li_ul]:pl-4
                    [&_li_ol]:mt-1 [&_li_ol]:mb-0 [&_li_ol]:pl-4
                    
                    /* Code blocks */
                    [&_pre]:bg-gray-900 [&_pre]:text-gray-100  [&_pre]:rounded-b-lg
                    [&_pre]:overflow-x-auto [&_pre]:overflow-y-hidden
                    [&_pre]:max-w-[calc(100vw-2rem)] [&_pre]:sm:max-w-full
                    [&_pre]:text-sm [&_pre]:sm:text-base
                    [&_pre]:mb-2 [&_pre]:mt-0
                    [&_pre::-webkit-scrollbar]:h-2
                    [&_pre::-webkit-scrollbar-thumb]:bg-red-600 [&_pre::-webkit-scrollbar-thumb]:rounded
                    
                    /* Inline code */
                    [&_code]:not([class*='language-']) {
                        @apply bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono break-words;
                    }
                    
                    /* Code blocks inner code */
                    [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0 
                    [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words
                    
                    /* Blockquotes */
                    [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500
                    [&_blockquote]:pl-4 [&_blockquote]:italic
                    [&_blockquote]:bg-slate-800 [&_blockquote]:bg-opacity-5
                    [&_blockquote]:rounded-md [&_blockquote]:py-3 [&_blockquote]:px-4
                    [&_blockquote]:my-4 [&_blockquote]:break-words
                    [&_blockquote_p:last-child]:mb-0
                    
                    /* Images */
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4
                    
                    /* Links */
                    [&_a]:text-blue-600 [&_a]:hover:underline [&_a]:break-words
                    
                    /* Tables */
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:text-sm sm:[&_table]:text-base
                    [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap [&_table]:sm:whitespace-normal
                    [&_table]:-webkit-overflow-scrolling-touch
                    [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-100 [&_th]:font-semibold
                    [&_td]:border [&_td]:border-gray-300 [&_td]:p-2
                    
                    /* Horizontal rules */
                    [&_hr]:my-8 [&_hr]:border-gray-300
                    
                    /* Footnotes/References */
                    [&_sup]:text-xs [&_sup]:text-blue-600
                ">
                    {content}
                </article>

                <hr className="my-8 border-gray-300" />

                {/* Related Tags */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-lg">Related Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <Link
                                key={i}
                                href={`/tags/${tag}`}
                                className="text-blue-600 hover:underline hover:text-blue-800 
                                         text-sm bg-blue-50 px-3 py-1 rounded-full
                                         transition-colors duration-200"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>

                <p className="mt-8">
                    <Link 
                        href="/" 
                        className="text-blue-600 hover:underline inline-flex items-center gap-2
                                 hover:text-blue-800 transition-colors duration-200"
                    >
                        <span aria-hidden="true">←</span> Back to home
                    </Link>
                </p>
            </main>
        </section>
    );
}



// import getFormattedDate from "@/lib/getFormattedDate";
// import { getPostByName, getPostsMeta } from "@/lib/post";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import TableOfContents from "@/app/components/TableOfContents";
// import "highlight.js/styles/github-dark.css";
// import { FaBookOpen } from "react-icons/fa6";


// export const revalidate = 86400
// // export const revalidate = 10

// type Props = {
//     params: Promise<{
//         postId: string
//     }>
// }

// export async function generateStaticParams() {
//     const posts = await getPostsMeta() //deduped

//      if (!posts) return []

//     return posts.map((post) => ({
//          postId: post.id
//     }))
// }

// export async function generateMetadata({ params }: Props) {
//     const { postId } = await params
//   const post = await getPostByName(`${postId}.mdx`);

//   if (!post) {
//     return { title: "Post Not Found" };
//   }

//   return { title: post.meta.title };
// }

// export default async function page({ params }: Props) {
//   const { postId } = await params
//   const post = await getPostByName(`${postId}.mdx`);
//   if (!post) notFound();

//   const {
//     meta: { title, date, author, tags, readingTime },
//     content,
//   } = post;

//   const formattedPubDate = getFormattedDate(date);

//   return (
   
    
//       <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10 my-20">

//       {/* TOC */}

//       <aside className="hidden lg:block sticky top-24 h-fit">
//       <TableOfContents />
//       </aside>

//       {/* ARTICLE */}

//        <main className="max-w-3xl mx-auto px-0 pt-8">
//         {/* Title */}
//         <h1 className="text-3xl font-bold mb-2 ">{title}</h1>
//         <p className="text-sm text-gray-500 mb-3 mt-4">Author: {author}</p>
//         <div className="flex items-center text-sm text-gray-400 mb-6">
//           <p >
//           {formattedPubDate} </p>
//           <span className="mx-2"> * </span> 
//           <div className="flex items-center gap-2">
//             <FaBookOpen className="text-blue-500"/> {readingTime}
//           </div>
//         </div>

//         {/* MDX Content */}
//         <article className="space-y-6 leading-relaxed text-slate-800 
//         [&_ul]:list-disc [&_ul]:ml-6
//         [&_ol]:list-decimal [&_ol]:ml-6
//         [&_li]:my-1   
        
        
//         [&_blockquote]:border-l-4
//         [&_blockquote]:border-blue-500
//         [&_blockquote]:pl-4
//         [&_blockquote]:italic
//         [&_blockquote]:bg-slate-800
//         [&_blockquote]:rounded-md
//         [&_blockquote]:py-2
//       "> 
//           {content} ✅ NOT content()
//         </article>

//         <hr className="my-8" />

//         {/* Related */}
//         <h3 className="font-semibold mb-2">Related</h3>
//         <ul className="flex gap-4">
//           {tags.map((tag, i) => (
//             <li key={i}>
//               <Link
//                 href={`/tags/${tag}`}
//                 className="text-blue-500 hover:underline"
//               >
//                 {tag}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <p className="mt-6">
//           <Link href="/" className="text-blue-500 hover:underline">
//             ← Back to home
//           </Link>
//         </p>
//       </main>

//       </section>
//   );
// }

{/* [&_pre]:bg-slate-900
      [&_pre]:rounded-xl
      [&_pre]:p-4
      [&_pre]:overflow-x-auto
      [&_pre]:text-sm
      [&_code]:text-blue-300 */}