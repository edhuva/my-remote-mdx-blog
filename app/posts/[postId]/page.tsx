import getFormattedDate from "@/lib/getFormattedDate";
import { getPostByName, getPostsMeta } from "@/lib/post";
import Link from "next/link";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";

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
    meta: { title, date, tags },
    content,
  } = post;

  const formattedPubDate = getFormattedDate(date);

  return (
    <main className="max-w-3xl mx-auto px-6 my-20 pt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-400 mb-6">{formattedPubDate}</p>

      {/* MDX Content */}
      <article className="space-y-6 leading-relaxed text-slate-600 
      [&_ul]:list-disc [&_ul]:ml-6
      [&_ol]:list-decimal [&_ol]:ml-6
      [&_li]:my-1   
      
      [&_pre]:bg-slate-900
      [&_pre]:rounded-xl
      [&_pre]:p-4
      [&_pre]:overflow-x-auto
      [&_pre]:text-sm
      [&_code]:text-blue-300
      
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
  );
}





// import getFormattedDate from "@/lib/getFormattedDate";
// import { getPostByName, getPostsMeta } from "@/lib/post";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import "highlight.js/styles/github-dark.css";

// export const dynamic = "force-dynamic"; // ✅ force server rendering

// type Props = {
//   params: {
//     postId: string;
//   };
// };

// export async function generateMetadata({ params }: Props) {
//   const { postId } = params;
//   const post = await getPostByName(`${postId}.mdx`);

//   if (!post) return { title: "Post Not Found" };
//   return { title: post.meta.title };
// }

// export default async function PostPage({ params }: Props) {
//   const { postId } = params;
//   const post = await getPostByName(`${postId}.mdx`);
//   if (!post) notFound();

//   const {
//     meta: { title, date, tags },
//     content,
//   } = post;

//   const formattedPubDate = getFormattedDate(date);

//   return (
//     <main className="max-w-3xl mx-auto px-6 my-8">
//       <h1 className="text-3xl font-bold mb-2">{title}</h1>
//       <p className="text-sm text-gray-400 mb-6">{formattedPubDate}</p>

//       {/* MDX Content */}
//       <article
//         className="space-y-6 leading-relaxed text-slate-600
//         [&_ul]:list-disc [&_ul]:ml-6
//         [&_ol]:list-decimal [&_ol]:ml-6
//         [&_li]:my-1
//         [&_pre]:bg-slate-900 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm
//         [&_code]:text-blue-300
//         [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-slate-800 [&_blockquote]:rounded-md [&_blockquote]:py-2
//       "
//       >
//         {content}
//       </article>

//       <hr className="my-8" />

//       {/* Related */}
//       <h3 className="font-semibold mb-2">Related</h3>
//       <ul className="flex gap-4">
//         {tags.map((tag, i) => (
//           <li key={i}>
//             <Link href={`/tags/${tag}`} className="text-blue-500 hover:underline">
//               {tag}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <p className="mt-6">
//         <Link href="/" className="text-blue-500 hover:underline">
//           ← Back to home
//         </Link>
//       </p>
//     </main>
//   );
// }





// ******************************
// import getFormattedDate from "@/lib/getFormattedDate"
// import { getPostsMeta, getPostByName } from "@/lib/Pposts"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import 'highlight.js/styles/github-dark.css'
// import { MDXRemote } from "next-mdx-remote"
// import type { MDXComponents } from "mdx/types"

// export const revalidate = 0

// type Props = {
//     params: Promise<{
//         postId: string
//     }>
// }

// // type Props = {
// //   params: { postId: string }
// // }

// // export async function generateStaticParams() {
// //     const posts = await getPostsMeta() //deduped

// //     if (!posts) return []

// //     return posts.map((post) => ({
// //         postId: post.id
// //     }))
// // }


// /* ============================
//    ✅ MDX COMPONENTS + TAILWIND
// ============================ */
// const components: MDXComponents = {
//   h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
//   h2: (props) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
//   h3: (props) => <h3 className="text-2xl font-semibold mt-5 mb-2" {...props} />,
//   p: (props) => <p className="my-4 leading-7 text-gray-300" {...props} />,
//   ul: (props) => <ul className="list-disc ml-6 my-4 space-y-1" {...props} />,
//   ol: (props) => <ol className="list-decimal ml-6 my-4 space-y-1" {...props} />,
//   li: (props) => <li className="my-1" {...props} />,
//   pre: (props) => (
//     <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto my-6" {...props} />
//   ),
//   code: (props) => <code className="text-blue-400 bg-slate-800 px-1 rounded" {...props} />,
//   blockquote: (props) => (
//     <blockquote
//       className="border-l-4 border-slate-500 pl-4 italic my-6 text-gray-400"
//       {...props}
//     />
//   ),
//   a: (props) => <Link className="text-blue-500 underline" {...props} />,
//   hr: (props) => <hr className="my-6 border-slate-600" {...props} />,
// };

// export  async function generateMetadata({params}: Props) {
//     const { postId } = await params
//     const post = await getPostByName(`${postId}.mdx`) //deduped!
    
//     if (!post) {
//         return {
//             title: 'Post Not Found'
//         }
//     }
//     return {
//         title: post.meta.title
//     }
// }

// export default async function page({params}: Props) {
//     const { postId } = await params
//     const post = await getPostByName(`${postId}.mdx`) //deduped!

//     if (!post) {
//         notFound()
//     }

//     const { meta: { title, date, tags }, content } = await post

//     const formattedPubDate = getFormattedDate(date)

//     // const metaTags = tags.map((tag, i) => (
//     //     <Link key={i} href={`/tag/${tag}`}>{tag}</Link>
//     // ))

//   return (

//     <main className="max-w-3xl mx-auto px-6 my-8">
//     <h1 className="text-3xl font-bold mb-2">{title}</h1>
//     <p className="text-sm text-gray-400 mb-6">{formattedPubDate}</p>

//     {/* <article className="space-y-6 leading-relaxed text-slate-600">
//         {content}
//     </article> */}

//     <article className="space-y-6 leading-relaxed text-slate-600">
//         <MDXRemote {...content} components={components} />
//     </article>

//     <hr className="my-8" />

//     <h3 className="font-semibold">Related</h3>
//     <ul className="flex gap-4">
//         {tags.map((tag, i) => (
//         <li key={i}>
//             <Link href={`/tag/${tag}`}>{tag}</Link>
//         </li>
//         ))}
//         {/* {metaTags} */}
//     </ul>
//     </main>

//     // <main className="px-6 mx-auto">
//     //     <h2 className="text-3xl mt-4 mb-6">{title}</h2>
//     //     <p className="mt-0 text-sm mb-3">
//     //         { formatedPubDate }
//     //     </p>
//     //     <article className="prose prose-xl prose-slate dark:prose-invert">
//     //         {content}
//     //     </article>
//     //     <section className="m-3 ">
//     //         <h3 className="font-bold">Related:</h3>
//     //         <div className="flex flex-row gap-4">
//     //             {tags}
//     //         </div>
//     //         <p className="mt-3">
//     //          <Link href="/">← Back to home</Link>
//     //         </p>
//     //     </section>
//     // </main>
    
//   )
// }

// ***************************

{/* <main className="px-6 prose prose-xl max-w-2xl prose-slate dark:prose-invert mx-auto">
    <h1 className="text-3xl mt-4 mb-3">{title}</h1>
    <p className="mb-2">{formatedPubDate}</p>
    <article >
        <section dangerouslySetInnerHTML={{__html: content} />
        <p className="mt-2">
            <Link href="/">← Back to home</Link>
        </p>
        
    </article>
</main> */}