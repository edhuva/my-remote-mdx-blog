"use client";

import { ReactNode } from "react";
import CopyButton from "./CopyButton";

export function MDXPre({ children }: { children: ReactNode }) {
  let code = "";

  // If children is a React element, try to get its children
  if (typeof children === "object" && children !== null && "props" in children) {

    // code = children.props.children ?? "";
  } else if (typeof children === "string") {
    code = children;
  }

  return (
    <div className="relative">
      <CopyButton code={String(code)} />
      <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm">
        {children}
      </pre>
    </div>
  );
}



// import CopyButton from "./CopyButton"

// export function MDXPre(props: any) {
//   const code = props.children?.props?.children ?? ""

//   return (
//     <div className="relative">
//       <CopyButton code={String(code)} />
//       <pre {...props} />
//     </div>
//   )
// }
