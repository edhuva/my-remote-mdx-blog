import Posts from "./components/Posts"
import MyProfilePic from "./components/MyProfilePic"
import RightPanel from "./components/RightPanel"

// when deploying set revalidate = 86400
export const revalidate = 86400

export default function Home() {
  return (
    <div className="mx-auto my-20 pt-8 md:my-16 max-w-6xl px-4">
      <MyProfilePic />

      <p className="mt-12 mb-12 text-2xl  md:text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Edwin</span>
        </span>
      </p>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:mx-12">
        {/* Posts */}
        <div className="lg:col-span-2">
          <Posts />
        </div>

        {/* Right Panel */}
        <div className="lg:block  rounded-lg">
          <RightPanel />
        </div>
      </div>
    </div>
  )
}




// import Posts from "./components/Posts"
// import MyProfilePic from "./components/MyProfilePic";


// // when deploying set revalidate = 86400
// export const revalidate = 86400

// export default function Home() {
//   return (
//     <div className="mx-auto my-20 pt-8 md:my-16">
//       <MyProfilePic />
//       <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
//         Hello and Welcome 👋&nbsp;
//         <span className="whitespace-nowrap">
//           {/* I&apos;m <span className="font-bold">Edwin</span> */}
//           I'm <span className="font-bold">Edwin</span>
//         </span>
//       </p>
//       <Posts />
//     </div>
//   );
// }
