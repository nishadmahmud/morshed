'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, userId } from "../page";
import useStore from "@/app/CustomHooks/useStore";


export default function Page() {
    const {blogs} = useStore();

    console.log(blogs);

    return (
        <div className="w-9/12 mx-auto py-10">
            <div className="flex justify-between gap-16">
            <div className="grid gap-8 md:grid-cols-2 w-11/12">
                {blogs?.data.length > 0 ? (
                    blogs?.data?.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg overflow-hidden w-full mx-auto">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                width={300}
                                height={400}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 text-black">
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{post.date}</span>
                                    <Link href={`/blogs/${post.id}`} className="text-blue-600 hover:underline">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No blog posts available.</p>
                )}
            </div>
            <div className="w-3/6 rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Recent Posts</h2>
      <div className="divide-y divide-gray-100">

        {
            blogs.data?.length > 0 ? (

                blogs.data.map((post, index) => (
                    <div key={index}>
                       <a href={post.href} className="flex items-start gap-4 py-4 transition-colors hover:bg-gray-50">
                 <Image width={50} height={50} src={post.image || "/placeholder.svg"} alt="" className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
                 <h3 className="text-[15px] font-medium leading-snug text-gray-900">{post.title}</h3>
               </a>
                    </div>
                   ))

            ) : (
                <p>No recent post</p>
            )
        
       }
      </div>
    </div>
        </div>
        </div>
    );
}
