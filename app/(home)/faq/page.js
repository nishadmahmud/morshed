"use client"

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: " What warranty do you provide on mobiles and gadgets?",
    answer:
      "Most of our mobile phones and gadgets come with a manufacturer’s warranty, typically ranging from 6 months to 1 year. Warranty details vary by brand, so please check the product description or contact us for specific warranty information.",
  },
  {
    question: "Do you offer EMI or installment payment options?",
    answer:
      "Yes, we provide EMI options through select banks and financial partners. The availability of EMI depends on your payment method and bank eligibility. Please check with our support team for more details.",
  },
  {
    question: "Can I return or exchange a product if I don’t like it?",
    answer:
      "We accept returns or exchanges only for defective or damaged products within a specific period (usually 7 days). The product must be in its original condition with all accessories and packaging intact. Please review our return policy for more details.",
  },
  {
    question: "Do you sell original, brand-new products?",
    answer:
      "Yes, we sell 100% original and brand-new products from authorized distributors. We do not deal in used, refurbished, or fake products.",
  },
  {
    question: "Do you offer home delivery, and how long does it take?",
    answer:
      "Yes, we offer home delivery across the country. Delivery times vary based on your location—typically within 2-5 business days for major cities and slightly longer for remote areas. Express delivery options may be available at an additional cost.",
  },
];

const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const contentEl = ref.current;
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 py-4">
      <button className="flex w-full justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium text-gray-900">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
        )}
      </button>
      <div ref={ref} style={{ maxHeight: height }} className="overflow-hidden transition-all duration-300 ease-in-out">
        <p className="mt-2 text-gray-600 pr-8">{item.answer}</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt5">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} item={faq} />
        ))}
      </div>
    </div>
  );
};

export default Page;
