import React from "react"

interface Children {
    children: React.ReactNode;
}

export default function ErrorMessage({ children }: Children) {

    return (
        <div className="border border-red-500 text-red-500 m-2 p-2">
            {children}
        </div>
    )
}