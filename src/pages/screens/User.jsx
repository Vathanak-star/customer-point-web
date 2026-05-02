import { User2Icon } from "lucide-react";
import React from "react";

export default function User() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <User2Icon className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">User</h1>
            </div>
        </div>
    )
}