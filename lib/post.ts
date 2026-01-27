import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import Video from "@/app/components/Video"
import CustomImage from "@/app/components/CustomImage"

type Filetree = {
  tree: {
    path: string
  }[]
}

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/edhuva/BlogPostMDX/contents/${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          // Cache control might help
          "Cache-Control": "no-cache",
        },
        // Add this for private repos
        cache: "no-store",
        next: { revalidate: 0 } // For Next.js 13+
      }
    )

    // console.log(`API Response Status for ${fileName}:`, res.status)
    
    if (!res.ok) {
      console.error(`Failed to fetch ${fileName}:`, res.status, res.statusText)
      return undefined
    }

    const data = await res.json()
    
    // Check if it's a file (not a directory)
    if (data.type !== "file" || !data.content) {
      return undefined
    }

    // 🔓 Decode base64 MDX file
    const rawMDX = Buffer.from(data.content, "base64").toString("utf-8")

    // Rest of your code...
    const { frontmatter, content } = await compileMDX<{
      title: string
      date: string
      tags: string[]
    }>({
      source: rawMDX,
      components: {
        Video,
        CustomImage,
      },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
              },
            ],
          ],
        },
      },
    })

    const id = fileName.replace(/\.mdx$/, "")

    const blogPostObj: BlogPost = {
      meta: {
        id,
        title: frontmatter.title,
        date: frontmatter.date,
        tags: frontmatter.tags,
      },
      content,
    }

    return blogPostObj
  } catch (error) {
    console.error(`Error in getPostByName for ${fileName}:`, error)
    return undefined
  }
}


export async function getPostsMeta(): Promise<Meta[] | undefined> {
  try {
    // First, let's verify the repo exists
    const repoCheck = await fetch(
      "https://api.github.com/repos/edhuva/BlogPostMDX",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    )
    
    console.log("Repo check status:", repoCheck.status)
    
    if (!repoCheck.ok) {
      const errorText = await repoCheck.text()
      console.error("Repo check failed:", errorText)
      return undefined
    }
    
    const repoInfo = await repoCheck.json()
    // console.log("Repo info:", {
    //   name: repoInfo.name,
    //   default_branch: repoInfo.default_branch,
    //   private: repoInfo.private
    // })
    
    // Use the actual default branch
    const defaultBranch = repoInfo.default_branch || "main"
    
    // Now fetch the tree
    const res = await fetch(
      `https://api.github.com/repos/edhuva/BlogPostMDX/git/trees/${defaultBranch}?recursive=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      }
    )

    console.log("Tree fetch status:", res.status)
    
    if (!res.ok) {
      // Get more detailed error info
      const errorText = await res.text()
      console.error("Tree fetch failed:", res.status, res.statusText, errorText)
      return undefined
    }

    const repoFiletree: Filetree = await res.json()
    
    // Rest of your code...
        // Filter only .mdx files
    const filesArray = repoFiletree.tree
      .map((obj) => obj.path)
      .filter((path) => path.endsWith(".mdx"))

    // console.log(`Found ${filesArray.length} MDX files:`, filesArray)

    // Process files in parallel for better performance
    const postsPromises = filesArray.map(async (file) => {
      const post = await getPostByName(file)
      return post?.meta
    })

    const postsMeta = (await Promise.all(postsPromises)).filter(
      (meta): meta is Meta => meta !== undefined
    )

    return postsMeta.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error("Error in getPostsMeta:", error)
    return undefined
  }

}



// 888*********************************************

// export async function getPostsMeta(): Promise<Meta[] | undefined> {
//   try {
//     const res = await fetch(
//       "https://api.github.com/repos/edhuva/BlogPostMDX/git/trees/main?recursive=1",
//       {
//         headers: {
//           Accept: "application/vnd.github+json",
//           Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//           "X-GitHub-Api-Version": "2022-11-28",
//         },
//         cache: "no-store",
//       }
//     )

//     console.log("GitHub API Response Status:", res.status)

//     if (!res.ok) {
//       console.error("Failed to fetch repository tree:", res.statusText)
//       return undefined
//     }

//     const repoFiletree: Filetree = await res.json()

//     // Filter only .mdx files
//     const filesArray = repoFiletree.tree
//       .map((obj) => obj.path)
//       .filter((path) => path.endsWith(".mdx"))

//     console.log(`Found ${filesArray.length} MDX files:`, filesArray)

//     // Process files in parallel for better performance
//     const postsPromises = filesArray.map(async (file) => {
//       const post = await getPostByName(file)
//       return post?.meta
//     })

//     const postsMeta = (await Promise.all(postsPromises)).filter(
//       (meta): meta is Meta => meta !== undefined
//     )

//     return postsMeta.sort((a, b) => (a.date < b.date ? 1 : -1))
//   } catch (error) {
//     console.error("Error in getPostsMeta:", error)
//     return undefined
//   }
// }




// import { compileMDX } from "next-mdx-remote/rsc"
// import rehypeAutolinkHeadings from "rehype-autolink-headings"
// import rehypeHighlight from "rehype-highlight"
// import rehypeSlug from "rehype-slug"
// import Video from "@/app/components/Video"
// import CustomImage from "@/app/components/CustomImage"

// type Filetree = {
//   tree: {
//     path: string
//   }[]
// }

// export async function getPostByName(
//   fileName: string
// ): Promise<BlogPost | undefined> {

//   const res = await fetch(
//     `https://api.github.com/repos/edhuva/BlogPostMDX/contents/${fileName}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//         Accept: "application/vnd.github+json",
//         "X-GitHub-Api-Version": "2022-11-28",
//       },
//       cache: "no-store",
//     }
//   )

//   if (!res.ok) return undefined

//   const data = await res.json()

//   if (!data.content) return undefined

//   // 🔓 Decode base64 MDX file
//   const rawMDX = Buffer.from(data.content, "base64").toString("utf-8")

//   const { frontmatter, content } = await compileMDX<{
//     title: string
//     date: string
//     tags: string[]
//   }>({
//     source: rawMDX,
//     components: {
//       Video,
//       CustomImage,
//     },
//     options: {
//       parseFrontmatter: true,
//       mdxOptions: {
//         rehypePlugins: [
//           rehypeHighlight,
//           rehypeSlug,
//           [
//             rehypeAutolinkHeadings,
//             {
//               behavior: "wrap",
//             },
//           ],
//         ],
//       },
//     },
//   })

//   const id = fileName.replace(/\.mdx$/, "")

//   const blogPostObj: BlogPost = {
//     meta: {
//       id,
//       title: frontmatter.title,
//       date: frontmatter.date,
//       tags: frontmatter.tags,
//     },
//     content,
//   }

//   return blogPostObj
// }



// // import { compileMDX } from "next-mdx-remote/rsc"
// // import rehypeAutolinkHeadings from "rehype-autolink-headings"
// // import rehypeHighlight from "rehype-highlight"
// // import rehypeSlug from "rehype-slug"
// // import Video from "@/app/components/Video"
// // import CustomImage from "@/app/components/CustomImage"

// // type Filetree = {
// //     "tree": [
// //         {
// //             "path": string
// //         }
// //     ]
// // }

// // export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
// //     const res = await fetch(`https://raw.githubusercontent.com/edhuva/BLOGPOSTMDX/main/${fileName}`, {
// //         headers: {
// //             Accept: 'Application/vnd.github+json',
// //             Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
// //             'X-GitHub-Api-Version': '2022-11-28',
// //         }
// //     })

// //     if (!res.ok) return undefined

// //     const rawMDX = await res.text()

// //     if (rawMDX === '404: Not Found') return undefined

// //     const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }> ({
// //         source: rawMDX,
// //         components: {
// //             Video, CustomImage
// //         },
// //         options: {
// //             parseFrontmatter: true,
// //             mdxOptions: {
// //                 rehypePlugins: [
// //                     rehypeHighlight,
// //                     rehypeSlug,
// //                     [rehypeAutolinkHeadings, {
// //                         behavior: 'wrap'
// //                     }],
// //                 ],
// //             }
// //         }
// //     })

// //     const id = fileName.replace(/\.mdx$/, '')

// //     const blogPostOvbj: BlogPost = {
// //         meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags }, content
// //     }

// //     return blogPostOvbj
// // }

// export async function getPostsMeta(): Promise<Meta[] | undefined> {
//     const res = await fetch('https://api.github.com/repos/edhuva/BlogPostMDX/git/trees/main?recursive=1', {
//         headers: {
//             Accept: 'Application/vnd.github+json',
//             Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//             'X-GitHub-Api-Version': '2022-11-28',
//         }
//     })

//     console.log('PostMeta:', res)
//     if (!res.ok) return undefined
//     console.log('PostMeta Res:', res)
//     const repoFiletree: Filetree = await res.json()
    

//     const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    

//     const posts: Meta[] = []

//     for(const file of filesArray) {
//         const post = await getPostByName(file)
        
//         if (post) {
//             const { meta } = post
//             posts.push(meta)
//         }
//     }

//     return posts.sort((a, b) => a.date < b.date ? 1 : -1)

// }