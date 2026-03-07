type Props = { id: string, title: string };

export default function Video({ id, title }: Props) {
  return (
    <>
    <div className="relative w-full aspect-video my-6">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube Video Player"
        className="absolute inset-0 w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
     {/* <div className="my-8">
      <div className="aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div> */}
    </>
  );
}



// type Props = {
//   id: string
// }

// export default function Video({ id }: Props) {
//   return (
//     <div className="relative w-full aspect-video my-6">
//       <iframe
//         src={`https://www.youtube.com/embed/${id}`}
//         title="YouTube Video Player"
//         className="absolute inset-0 w-full h-full rounded-lg"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowFullScreen
//       />
//     </div>
//   )
// }





// type Props = {
//     id: string
// }

// export default function Video({ id }: Props) {
//     return (
//         <div className="aspect-w-16 aspect-h-9 bg-green-400">
//             <iframe src={`https:www.youtube.com/embed/${id}`}
//             title="Youtube Video Player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
//         </div>
//     )
// }