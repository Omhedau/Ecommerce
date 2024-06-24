import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const Login = ({ isOpen, closeModal }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const switchMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLoginMode) {
        // Logic to handle login
        const response = await axios.post('http://localhost:5454/user/signin', {
          email: formData.email,
          password: formData.password,
        });
        setMessage('Login successful');
        setIsSuccess(true);
        console.log('Login successful:', response.data);
      } else {
        // Logic to handle registration
        const response = await axios.post('http://localhost:5454/user/signup', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        setMessage('Registration successful');
        setIsSuccess(true);
        console.log('Registration successful:', response.data);
      }

      setTimeout(() => {
        resetForm();
        closeModal();
        setMessage(null);
      }, 1000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
      setIsSuccess(false);
      console.error('Error during submission:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    setMessage(null);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    resetForm();
    closeModal();
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Login Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, // Ensure the overlay is on top of other elements
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          border: 'none',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          zIndex: 1001, // Ensure the modal content is on top of the overlay
        },
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          {isLoginMode ? 'Login' : 'Register'}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              {isLoginMode ? 'Login' : 'Register'}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
        {message && (
          <div className={`mt-4 p-2 text-center ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}
        <p className="mt-4 text-center">
          {isLoginMode
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={switchMode}
          >
            {isLoginMode ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default Login;
