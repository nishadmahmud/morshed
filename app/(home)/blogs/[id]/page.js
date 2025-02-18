'use client';

import Image from "next/image";
import useStore from "@/app/CustomHooks/useStore";

export default function BlogPost({ params }) {
  const {blogs} = useStore();
  const blogsData = blogs.data || [];
  const filteredBlogs = blogsData.filter(blog => String(blog.id) === String(params.id));


  return (
    <div className="w-9/12 mx-auto py-16">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <div key={blog.id}>
           
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              width={800}
              height={200}
              className="w-full h-[50vh] lg:pt-36 mt-20 object-cover rounded-lg mb-6"
            />
             <h1 className="text-3xl text-black font-bold mb-4">{blog.title}</h1>
             <div
              className="text-lg text-black"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
         
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No blog data found.</p>
      )}
    </div>
  );
}
