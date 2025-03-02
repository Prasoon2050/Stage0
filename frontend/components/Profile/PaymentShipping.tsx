import React from "react";

const PaymentShipping = () => {
  return (
    <section className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment & Shipping
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="p-5 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Saved Payment Methods
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">💳 Visa •••• 1234</span>
              <button className="text-blue-600 text-sm hover:underline">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">💳 MasterCard •••• 5678</span>
              <button className="text-blue-600 text-sm hover:underline">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">🔗 UPI: example@upi</span>
              <button className="text-blue-600 text-sm hover:underline">
                Edit
              </button>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            + Add Payment Method
          </button>
        </div>

        {/* Shipping Addresses */}
        <div className="p-5 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Saved Shipping Addresses
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">🏠 123 Main St, Springfield</span>
              <button className="text-blue-600 text-sm hover:underline">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">🏢 456 Elm St, New York</span>
              <button className="text-blue-600 text-sm hover:underline">
                Edit
              </button>
            </div>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            + Add Shipping Address
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentShipping;
