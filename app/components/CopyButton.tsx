"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}





// "use client"
// import { useState } from "react"

// export default function CopyButton({ code }: { code: string }) {
//   const [copied, setCopied] = useState(false)

//   async function copy() {
//     await navigator.clipboard.writeText(code)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 1500)
//   }

//   return (
//     <button
//       onClick={copy}
//       className="absolute top-2 right-2 text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600"
//     >
//       {copied ? "Copied!" : "Copy"}
//     </button>
//   )
// }
