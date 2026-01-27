import { getPostsMeta } from "@/lib/post"
import ListItem from "@/app/components/ListItem"
import Link from "next/link"

export const revalidate = 86400
// export const revalidate = 10

type Props = {
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped

     if (!posts) return []
     
    //  const tags = new Set(posts.flatMap(post => post.tags));
     const tags = new Set(posts.map(post => post.tags).flat())

    // const uniqueTagsArray = [...new Set(posts.flatMap(post => post.tags))];
     return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({params}: Props) {
    const { tag } = await params

    if (!tag) return { tag: "Tag Not Found" }

    return {
        title: `Post about ${tag}`
    }
}

export default async function TagPostList({params}: Props) {
    const { tag } = await params
    const posts = await getPostsMeta() //deduped!

    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>

    const tagPosts = posts.filter(post => post.tags.includes(tag)) 

    if (!tagPosts.length) {
        return (
            <div className="texr-center">
                <p className="mt-10">No posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }

  return (
    <>
    <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold taxt-black/70 dark:text-white/90">Results for: #{tag}</h2>
            <ul className="w-full list-none p-o">
                {tagPosts.map(post => (
                    <ListItem key={post.id} post={post} />
                ))}
            </ul>
        </section>
    </>
  )
}




// import { getPostsMeta } from "@/lib/post";
// import ListItem from "@/app/components/ListItem";
// import Link from "next/link";

// export const dynamic = "force-dynamic"; // ✅ server-render dynamic

// type Props = {
//   params: {
//     tag: string;
//   };
// };

// export async function generateMetadata({ params }: Props) {
//   const { tag } = params;
//   if (!tag) return { title: "Tag Not Found" };
//   return { title: `Posts about ${tag}` };
// }

// export default async function TagPostList({ params }: Props) {
//   const { tag } = params;
//   const posts = await getPostsMeta(); // fetch all MDX metadata

//   if (!posts || posts.length === 0)
//     return <p className="mt-10 text-center">Sorry, no posts available.</p>;

//   const tagPosts = posts.filter((post) => post.tags.includes(tag));
//   if (tagPosts.length === 0)
//     return (
//       <div className="text-center mt-10">
//         <p>No posts for that keyword.</p>
//         <Link href="/">Back to Home</Link>
//       </div>
//     );

//   return (
//     <section className="mt-6 mx-auto max-w-2xl">
//       <h2 className="text-4xl font-bold text-black/70 dark:text-white/90">
//         Results for: #{tag}
//       </h2>
//       <ul className="w-full list-none p-0">
//         {tagPosts.map((post) => (
//           <ListItem key={post.id} post={post} />
//         ))}
//       </ul>
//     </section>
//   );
// }