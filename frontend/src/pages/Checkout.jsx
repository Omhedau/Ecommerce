import React from 'react';
import { FaTag } from 'react-icons/fa';

const Checkout = () => {
  return (
    <section className="py-20 px-40">
      <div className="container mx-auto">
        <div className="mb-8">
          <h6 className="text-sm text-gray-700 bg-gray-100 p-4 border-t-2 border-red-600 text-center">
            <FaTag className="inline mr-1" />
            <a href="#" className="text-gray-700 underline">Have a coupon?</a> Click here to enter your code.
          </h6>
        </div>
        <form className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h5 className="text-lg font-semibold uppercase border-b pb-4">Billing details</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium">
                    First Name <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                </div>
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium">
                    Last Name <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                </div>
                <div className="col-span-2 space-y-4">
                  <label className="block text-gray-700 font-medium">
                    Country <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                  <label className="block text-gray-700 font-medium">
                    Address <span className="text-red-600">*</span>
                    <input type="text" placeholder="Street Address" className="w-full mt-1 border border-gray-300 rounded p-3" />
                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full mt-2 border border-gray-300 rounded p-3" />
                  </label>
                  <label className="block text-gray-700 font-medium">
                    Town/City <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                  <label className="block text-gray-700 font-medium">
                    Country/State <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                  <label className="block text-gray-700 font-medium">
                    Postcode/Zip <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                </div>
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium">
                    Phone <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                </div>
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium">
                    Email <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                </div>
                <div className="col-span-2 space-y-4">
                  <label className="flex items-center text-gray-700 font-medium">
                    <input type="checkbox" className="form-checkbox mr-2" />
                    Create an account?
                  </label>
                  <p className="text-gray-600">Create an account by entering the information below. If you are a returning customer, login at the top of the page.</p>
                  <label className="block text-gray-700 font-medium">
                    Account Password <span className="text-red-600">*</span>
                    <input type="text" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                  <label className="flex items-center text-gray-700 font-medium">
                    <input type="checkbox" className="form-checkbox mr-2" />
                    Note about your order, e.g., special note for delivery
                  </label>
                  <label className="block text-gray-700 font-medium">
                    Order notes <span className="text-red-600">*</span>
                    <input type="text" placeholder="Note about your order, e.g., special note for delivery" className="w-full mt-1 border border-gray-300 rounded p-3" />
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-6 space-y-8">
              <h5 className="text-lg font-semibold uppercase border-b pb-4">Your order</h5>
              <div className="border-b py-4">
                <ul className="space-y-4">
                  <li className="flex justify-between text-gray-700 font-medium">
                    <span>Product</span>
                    <span>Total</span>
                  </li>
                  <li className="flex justify-between text-gray-700 font-medium">
                    <span>01. Chain buck bag</span>
                    <span>$300.0</span>
                  </li>
                  <li className="flex justify-between text-gray-700 font-medium">
                    <span>02. Zip-pockets pebbled tote briefcase</span>
                    <span>$170.0</span>
                  </li>
                  <li className="flex justify-between text-gray-700 font-medium">
                    <span>03. Black jean</span>
                    <span>$170.0</span>
                  </li>
                  <li className="flex justify-between text-gray-700 font-medium">
                    <span>04. Cotton shirt</span>
                    <span>$110.0</span>
                  </li>
                </ul>
              </div>
              <div className="border-b py-4">
                <ul className="space-y-4">
                  <li className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>$750.0</span>
                  </li>
                  <li className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>$750.0</span>
                  </li>
                </ul>
              </div>
              <div className="py-4 space-y-4">
                <label className="flex items-center text-gray-700 font-medium">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  Create an account?
                </label>
                <p className="text-gray-600">Create an account by entering the information below. If you are a returning customer, login at the top of the page.</p>
                <label className="flex items-center text-gray-700 font-medium">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  Cheque payment
                </label>
                <label className="flex items-center text-gray-700 font-medium">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  PayPal
                </label>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-full font-semibold">Place order</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
