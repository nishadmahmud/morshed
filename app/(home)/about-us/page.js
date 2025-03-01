"use client"

import useStore from "@/app/CustomHooks/useStore"
import Image from "next/image"
import Link from "next/link";

export default function Home() {
  const {blogs} = useStore();
  return (
    <main className="min-h-screen bg-white text-black pt-20  lg:pt-36">
      {/* Who We Are Section */}
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          <h2 className="text-2xl font-semibold  text-nowrap ">Who We Are</h2>
          <div>
            <p className="text-gray-600">
                Perfect Gadgets BD is a one-stop tech shop that offers tech enthusiasts authentic smartphones, gadgets, and
                devices at the best prices. We have been serving our customers since 2015, and we have never failed to
                achieve the highest customer satisfaction by ensuring top-notch service through multichannel shopping
                stores, online store, EMI facility, exchange offers, free home delivery, dedicated service centers, and many
                more.
            </p>
            <p className="text-gray-600 mt-4">
                We trust our business on client&apos;s trust, and we are committed to doing so as long as we exists are with a
                clear vision to be Bangladesh&apos;s largest tech smartphones, gadgets, and accessories retailer. In Apple
                Gadgets, we are continuously growing ourselves to meet the challenge of a new age and a new client base. We
                know that client satisfaction is a never-ending journey. Also, we have a dedicated team that thrives us
                towards perfection and quality service.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-8 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* EMI Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">EMI with 31 Banks</h3>
            <p className="text-gray-600 mb-4">
              Now you can buy your favorite devices and gadgets from us with easy monthly payments through EMI. We offer
              this service in collaboration with 31 banks, and you can spread payments over up to 36 months for your
              large purchase.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>

          {/* Exchange Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Exchange and Upgrade</h3>
            <p className="text-gray-600 mb-4">
              Upgrade to a new device with Apple Gadget&apos;s simple exchange system. Just swap your old device for a new
              one.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>

          {/* Pre-Order Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Pre-Order Anything</h3>
            <p className="text-gray-600 mb-4">
              You can pre-order any device or accessory from Perfect Gadgets BD by providing the product URL. Once you do,
              we&apos;ll confirm your order and make sure you get what you want.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Store Image Section */}
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="flex gap-5 items-center">
          <div className="relative w-full aspect-square">
            <Image
              src="/WhatsApp Image 2025-02-04 at 11.05.46_ba043f39.jpg"
              alt="Mobile Club Store Interior"
              fill={true}
              quality={100}
              style={{objectFit : 'contain'}}
              className="w-full rounded-lg"
            />
          </div>
          <div className="relative w-full aspect-square">
            <Image
              src="/WhatsApp Image 2025-02-04 at 11.05.46_05a8b597.jpg"
              alt="Mobile Club Store Interior"
              fill={true}
              quality={100}
              style={{objectFit : 'contain'}}
              className="w-full rounded-lg"
            />
          </div>
          <div className="relative w-full aspect-square">
            <Image
              src="/WhatsApp Image 2025-02-04 at 11.05.40_69506fe5.jpg"
              alt="Mobile Club Store Interior"
              fill={true}
              quality={100}
              style={{objectFit : 'contain'}}
              className="w-full rounded-lg"
            />
          </div>
            
        </div>
      </section>

      {/* Free Shop Pickup Section */}
      <section className="px-4 py-8 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Free Shop Pickup : Discover Convenience with Free Shop Pickup at Perfect Gadgets BD in Dhaka City.
          </h2>
          <p className="text-gray-600">
            We are delighted to offer you a seamless and cost-free option for product pickup at Perfect Gadgets BD. Make the
            most of this convenient service by visiting our outlet situated in one of the most prominent locations in
            Dhaka city. Our outlet not only provides a diverse array of Apple products but also ensures a pleasant
            shopping experience. To help you make an informed decision and enhance your understanding of our outlets,
            please take a moment to peruse the additional information available.
          </p>
        </div>
      </section>

      {/* Featured Media Section */}
      {/* <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">WE ARE FEATURED ON</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            <Image src="/placeholder.svg" alt="The New Nation" width={150} height={50} />
            <Image src="/placeholder.svg" alt="Bangladesh Post" width={150} height={50} />
            <Image src="/placeholder.svg" alt="Dhaka Tribune" width={150} height={50} />
            <Image src="/placeholder.svg" alt="New Age" width={150} height={50} />
            <Image src="/placeholder.svg" alt="Financial Express" width={150} height={50} />
          </div>
        </div>
      </section> */}

      {/* Blog Section */}
      <section className="px-4 py-8 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl text-black font-semibold mb-8">More from Perfect Gadgets BD</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs?.data.map((blog,i) => (
              <div key={i} className="bg-white text-black rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <Image
                    src={blog?.image}
                    alt={blog?.title}
                    width={400}
                    height={200}
                    className="w-full rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{blog?.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{new Date(blog?.created_at).toDateString()}</p>
                  <Link href={`/blogs/${blog.id}`}><button className="text-blue-600 hover:underline">Read more</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

