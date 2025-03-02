import React from 'react';

const Page = () => {
  return (
    <div className="bg-white text-center p-8 rounded-lg  mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Exchange Policy</h1>
      
      <p className="text-lg text-gray-700 mb-4">
        At <span className="font-semibold">Perfect Gadget BD</span>, we want you to be completely satisfied with your purchase.
        If you are not satisfied with your product, we offer a hassle-free exchange policy under the following conditions.
      </p>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Eligibility for Exchange</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Exchanges are available within 30 days of purchase.</li>
          <li>The product must be in its original condition with all accessories, packaging, and documentation included.</li>
          <li>The product must not have been used or damaged in any way.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">How to Request an Exchange</h2>
        <p className="text-lg text-gray-700">
          If you meet the eligibility criteria, please follow these steps to request an exchange:
        </p>
        <ol className="list-decimal list-inside text-gray-700 text-lg">
          <li>Contact our customer support team at <span className="font-semibold">bdperfectgadget@gmail.com</span>.</li>
          <li>Provide your order number and the reason for the exchange.</li>
          <li>Our team will assist you with the next steps and issue a return shipping label if needed.</li>
        </ol>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Exceptions</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Items that have been damaged due to misuse are not eligible for exchange.</li>
          <li>Opened or used accessories phone cases, chargers are non-returnable.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Refunds</h2>
        <p className="text-lg text-gray-700">
          If an exchange is not possible, a full refund will be issued after the product is returned in its original condition.
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          For any further questions, feel free to reach out to our customer support team.
        </p>
      </div>
    </div>
  );
};

export default Page;
