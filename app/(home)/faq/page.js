"use client"

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is React?",
    answer:
      "React is a popular JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer for web and mobile apps.",
  },
  {
    question: "What are the key features of React?",
    answer:
      "Some key features of React include: Virtual DOM for better performance, JSX for easier component writing, component-based architecture, unidirectional data flow, and strong community support.",
  },
  {
    question: "What is JSX?",
    answer:
      "JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks similar to HTML, making it easier to write and understand the structure of React components.",
  },
  {
    question: "What is the Virtual DOM?",
    answer:
      "The Virtual DOM is a programming concept where an ideal, or 'virtual', representation of a UI is kept in memory and synced with the 'real' DOM. This process is called reconciliation, and it's what makes React fast.",
  },
  {
    question: "What are React Hooks?",
    answer:
      "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were added in React 16.8 and include useState, useEffect, useContext, and more.",
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
    <div className="max-w-3xl mx-auto px-4 py-8 lg:pt-40 pt-36">
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
