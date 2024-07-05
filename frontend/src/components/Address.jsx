import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md"; // Import MdDelete icon
import { useNavigate } from "react-router-dom";
import {
  listAddresses,
  createAddress,
  setShippingAddress,
  removeAddress,
} from "../redux/actions/address";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressState = useSelector((state) => state.address);
  const { addresses, loading, error, shippingAddress } = addressState;

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    dispatch(listAddresses());
  }, [dispatch]);

  useEffect(() => {
    const savedAddress = sessionStorage.getItem("selectedAddress");
    if (savedAddress) {
      dispatch(setShippingAddress(JSON.parse(savedAddress)));
    }
  }, [dispatch]);

  const handleAddressSelect = (address) => {
    dispatch(setShippingAddress(address));
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    dispatch(createAddress(newAddress));
    setShowNewAddressForm(false);
    setNewAddress({
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      mobile: "",
      email: "",
    });
  };

  const handleRemoveAddress = (addressId) => {
    dispatch(removeAddress(addressId));
  };

  const handleContinueToOrderSummary = () => {
    // Handle continue action (to be implemented)
    navigate('/checkout/summary');
  };

  return (
    <>
      <div className="h-40 bg-[#7b713f5b] flex items-center justify-center text-2xl font-bold text-gray-700">
        {/* Breadcrumb area */}
        Checkout / Address
      </div>
      <div className="px-40 my-20">
        <div className="flex justify-end mb-4 ">
          {addresses.length > 0 && (
            <button
              className={`px-4 py-2 rounded border ${
                !showNewAddressForm
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-400"
              } mr-4`}
              onClick={() => setShowNewAddressForm(false)}
            >
              Use Address
            </button>
          )}
          <button
            className={`px-4 py-2 rounded border ${
              showNewAddressForm
                ? "border-red-600 bg-red-600 text-white"
                : "border-gray-400"
            }`}
            onClick={() => setShowNewAddressForm(true)}
          >
            Add New Address
          </button>
        </div>
        {!showNewAddressForm && addresses.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className="bg-gray-100 p-4 rounded border relative"
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={
                        shippingAddress && shippingAddress._id === address._id
                      }
                      className="mr-2 cursor-pointer"
                      onChange={() => handleAddressSelect(address)}
                    />
                    <div>
                      <span className="font-medium">{`${address.firstName} ${address.lastName}`}</span>
                      <span className="block">{`${address.address}, ${address.city}, ${address.state}, ${address.zipcode}`}</span>
                      <span className="block">{address.mobile}</span>
                      <span className="block">{address.email}</span>
                    </div>
                  </label>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#d6494998] text-white rounded-full p-2 hover:bg-red-800"
                    onClick={() => handleRemoveAddress(address._id)}
                  >
                    <MdDelete className="h-3 w-3" /> {/* MdDelete icon */}
                  </button>
                </div>
              ))
            )}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleContinueToOrderSummary}
                disabled={!shippingAddress || !shippingAddress._id}
              >
                Continue to Order Summary
              </button>
            </div>
          </div>
        )}
        {showNewAddressForm && (
          <form className="space-y-8" onSubmit={handleSubmitAddress}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-gray-700 font-medium">
                  First Name <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="firstName"
                    value={newAddress.firstName}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Last Name <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="lastName"
                    value={newAddress.lastName}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Country <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="country"
                    value={newAddress.country}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Address <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleNewAddressChange}
                    placeholder="Street Address"
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Town/City <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  State <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Postcode/Zip <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="zipcode"
                    value={newAddress.zipcode}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
              </div>
              <div className="space-y-4">
                <label className="block text-gray-700 font-medium">
                  Phone <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="mobile"
                    value={newAddress.mobile}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Email Address <span className="text-red-600">*</span>
                  <input
                    type="email"
                    name="email"
                    value={newAddress.email}
                    onChange={handleNewAddressChange}
                    className="w-full mt-1 border border-gray-300 rounded p-3"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 rounded border border-red-600 bg-red-600 text-white"
              >
                Add Address
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Address;
