import { Handshake } from 'lucide-react';
import React from 'react';

export default function ExportInfo() {
  return (
    <div className="min-h-screen text-black lg:pt-20 pt-16 bg-white ">
      <header className="bg-teal-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">Export Information</h1>
          <p className="text-sm mt-1">We export quality shirts to customers worldwide</p>
        </div>
      </header>

      <main className="container px-6 py-10">
        {/* Introduction */}
        <section className="mb-12 px-10">
          <h2 className="text-2xl font-semibold mb-4">About Our Shirts</h2>
          <p className="text-lg">
            We specialize in exporting high-quality shirts including:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>T-Shirts (Solid Pattern)</li>
            <li>Polo T-Shirts (Business Casual)</li>
            <li>Formal Shirts</li>
          </ul>
        </section>

        {/* Buying Process */}
        <section className="mb-12 px-10">
          <h2 className="text-2xl font-semibold mb-4">How to Buy from Us (International)</h2>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>Browse our shirt collection (we can send you a catalog upon request).</li>
            <li>Send your requirements (type, quantity, size, country) via email or WhatsApp.</li>
            <li>We’ll respond with product photos, pricing, and shipping options.</li>
            <li>Confirm your order and make payment via secure channels (PayPal, Bank Transfer).</li>
            <li>We dispatch your order with tracking within 5-7 business days.</li>
          </ol>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-1"><Handshake></Handshake> Get In Touch</h3>
          <p className="mb-2">To request a catalog or start your order, contact us:</p>
          <div className="space-y-1 text-lg">
            <p className='text-sm'>Email: <a href="mailto:morshed.mart001@gmail.com" className="text-gray-600 font-bold  underline">morshed.mart001@gmail.com</a></p>
            <p className='text-sm'>WhatsApp: <a href="https://wa.me/+8801970085954" className="text-blue-600 font-bold underline">+8801970085954</a></p>
            
          </div>
        </section>
      </main>
    </div>
  );
}
