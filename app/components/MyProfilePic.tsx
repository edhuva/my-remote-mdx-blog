import Image from "next/image"

export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
      <div className="w-48 h-48 md:w-72 md:h-72 mx-auto mt-8 relative">
        <Image
            className="border-4 rounded-full dark:border-slate-500 drop-shadow-xl shadow-black
             object-cover"
            src="/images/edhuvax.webp"
            fill
            sizes="(max-width: 768px) 192px, 288px"
            alt="Edwin Matema"
            priority={true}
        />
    </div>
        {/* <Image
        className="border-4 rounded-full dark:border-slate-500 drop-shadow-xl shadow-black
         mx-auto mt-8"
            src="/images/edhuvax.webp"
            width={300}
            height={300}
            alt="Edwin Matema"
            priority={true}
        /> */}
    </section>
  )
}
