import React from "react";

const Page = () => {
  return (
    <div className="lg:pt-40 lg:px-12 pt-20 md:pt-20 mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Refund Policy</h1>
      <p className="text-gray-600 mb-4">
        Thank you for shopping with us. If you are not entirely satisfied with your
        purchase, we&apos;re here to help.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Returns</h2>
      <p className="text-gray-600 mb-4">
        You have <span className="font-semibold">7 days</span> from the date of
        purchase to return an item. To be eligible for a return, your item must
        be unused and in the same condition that you received it. It must also
        be in the original packaging.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Refunds</h2>
      <p className="text-gray-600 mb-4">
        Once we receive your returned item, we will inspect it and notify you on
        the status of your refund. If approved, we will initiate a refund to
        your original payment method within <span className="font-semibold">5-7 business days</span>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Non-Refundable Items</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Gift cards</li>
        <li>Opened accessories (e.g., earphones, screen protectors)</li>
        <li>Software or digital products</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Shipping</h2>
      <p className="text-gray-600 mb-4">
        You will be responsible for paying for your own shipping costs for
        returning your item. Shipping costs are non-refundable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Contact Us</h2>
      <p className="text-gray-600">
        If you have any questions about our refund policy, contact us at:
        <span className="font-semibold"> support@example.com</span>
      </p>
    </div>
  );
};

export default Page;
