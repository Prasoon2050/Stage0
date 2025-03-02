"use client";
import React from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question:
        "What happens when I update my email address (or mobile number)?",
      answer:
        "Your login email ID (or mobile number) changes accordingly. You'll receive all account-related communications at your updated email or mobile.",
    },
    {
      question:
        "When will my account be updated with the new email address (or mobile number)?",
      answer:
        "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.",
    },
    {
      question:
        "What happens to my existing account when I update my email address (or mobile number)?",
      answer:
        "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional with access to your order history and saved details.",
    },
    {
      question:
        "Does my Seller account get affected when I update my email address?",
      answer:
        "Our platform follows a single sign-on policy—any changes you make will reflect in your Seller account as well.",
    },
  ];

  return (
    <div className="bg-white rounded-xl  py-4 w-full">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
        <MessageCircleQuestion size={32} className="text-blue-500" /> 
        FAQs
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 rounded-lg shadow-sm p-4 bg-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg text-gray-900">
                {faq.question}
              </h3>
              <ChevronDown size={20} className="text-gray-600" />
            </div>
            <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
