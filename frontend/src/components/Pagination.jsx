import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8 absolute bottom-10 left-1/2 right-1/2">
      <nav className="flex space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border border-black p-2'
          }`}
        >
          <FaArrowLeft />
        </button>
        {renderPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && onPageChange(number)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              number === currentPage ? 'bg-black text-white' : 'bg-gray-200 text-black'
            } ${number === '...' ? 'cursor-default' : ''}`}
            disabled={number === '...'}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white'
          }`}
        >
          <FaArrowRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
