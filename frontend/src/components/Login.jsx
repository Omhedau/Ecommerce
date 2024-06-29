import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {register,login} from "../redux/actions/user.js"; 

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

  const dispatch = useDispatch();
  const {user, loading, error} = useSelector((state) => state.user);
  

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      dispatch(login(formData.email, formData.password));
    } else {
      dispatch(register(formData.firstName, formData.lastName, formData.email, formData.password));
    }
  };

  useEffect(() => {
    if (user) {
      setMessage(isLoginMode ? 'Login successful' : 'Registration successful');
      setIsSuccess(true);

      setTimeout(() => {
        resetForm();
        closeModal();
        setMessage(null);
      }, 1000);
    } else if (error) {
      setMessage(error);
      setIsSuccess(false);
    }
  }, [user, error]);

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
          zIndex: 1000,
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
          zIndex: 1001,
        },
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        {user ? (
          <div className="flex items-center justify-center mb-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-full w-12 h-12 object-cover"
              />
            ) : (
              <div className="rounded-full w-12 h-12 bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
                {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
              </div>
            )}
          </div>
        ) : (
          <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
            {isLoginMode ? 'Login' : 'Register'}
          </h2>
        )}
        {!user && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 mb-2">
                    First Name:
                  </label>
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
                  <label htmlFor="lastName" className="block text-gray-700 mb-2">
                    Last Name:
                  </label>
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
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email:
              </label>
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
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password:
              </label>
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
        )}
        {message && (
          <div
            className={`mt-4 p-2 text-center ${
              isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {message}
          </div>
        )}
        {!user && (
          <p className="mt-4 text-center">
            {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
            <span className="text-blue-500 cursor-pointer" onClick={switchMode}>
              {isLoginMode ? 'Register here' : 'Login here'}
            </span>
          </p>
        )}
      </div>
    </Modal>
  );
};

export default Login;
