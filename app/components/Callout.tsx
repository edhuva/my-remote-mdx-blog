import { ReactNode } from "react"
import { FaInfo, FaLightbulb } from "react-icons/fa6"
import { TfiAlert } from "react-icons/tfi"

type CalloutProps = {
    type?: "info" | "tip" | "warning"
    children: ReactNode
}

export default function Callout({ type = "info", children}: CalloutProps) {
    const styles = {
        info: {
            icon: FaInfo,
            color: "border-blue-500 bg-blue-50 taxt-blue-900",
        },
        tip: {
            icon: FaLightbulb,
            color: "border-green-500 bg-green-50 taxt-green-900",
        },
        warning: {
            icon: TfiAlert,
            color: "border-yellow-500 bg-yellow-50 taxt-yellow-900",
        }
    }

    const Icon = styles[type].icon

    return (
        <div className={`my-6 flex items-start gap-3 border-l-4 p-4 rounded-md ${styles[type].color}`}>
            <Icon className="w-5 h-5 mt-1" />
            <div className="text-sm leading-relaxed">{children}</div>
        </div>
    )
}