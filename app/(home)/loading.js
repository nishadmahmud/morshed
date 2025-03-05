'use client'
import { MoonLoader } from "react-spinners";
export default function Loading() {

  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    <MoonLoader color="#FF8800"/>
</div>
}


