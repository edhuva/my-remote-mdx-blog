import { ReactNode } from "react"

type CodeBlockProps = {
    language?: string
    children: ReactNode
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
    return (
        <div className="my-6 rounded-lg   overflow-hidden ">
            {language && (
                <>
                    <div className="text-xs px-4 py-2 bg-gray-800 text-gray-200 border-l-2 border-blue-700">
                        {language}
                    </div>
                </>
            )}
            
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
                <code>{children}</code>
            </pre>
        </div>
    )
}