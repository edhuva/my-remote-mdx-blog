export default function CustomImage({ src, alt }: { src: string; alt: string }) {
  const cleanSrc = src.trim();

  return (
    <div className="w-full h-full my-6">
      <img className="rounded-lg mx-auto" src={cleanSrc} alt={alt} width={650} height={650} />
    </div>
  );
}



// export default function CustomImage({ src, alt }: { src: string; alt: string }) {
//     console.log('CustomImage src:', src)
//         const cleanSrc = src.trim(); // ✅ remove spaces/newlines

//         return (
//             <div className="w-full h-full">
//                 <img className="rounded-lg mx-auto" src={cleanSrc} alt={alt} width={650} height={650} />
//             </div>
//         )
// }




// import Image from "next/image"

// type Props = {
//     src: string,
//     alt: string,
//     priority?: string,
// }

// export default function CustomImage({ src, alt, priority }: Props) {
//     const prty = priority ? true : false
//     const cleanSrc = src.trim(); // ✅ remove spaces/newlines

//     return (
//         <div className="w-full h-full">
//             <Image className="rounded-lg mx-auto" src={cleanSrc} alt={alt} width={650} height={650} priority={prty} />
//         </div>
//     )
// }