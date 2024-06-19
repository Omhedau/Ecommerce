import React from 'react';
import { FaCar, FaMoneyBillAlt, FaHeadset, FaLock } from 'react-icons/fa';

const services = [
  {
    icon: <FaCar className="text-4xl text-red-600" />,
    title: 'Free Shipping',
    description: 'For all orders over $99',
  },
  {
    icon: <FaMoneyBillAlt className="text-4xl text-red-600" />,
    title: 'Money Back Guarantee',
    description: 'If goods have problems',
  },
  {
    icon: <FaHeadset className="text-4xl text-red-600" />,
    title: 'Online Support 24/7',
    description: 'Dedicated support',
  },
  {
    icon: <FaLock className="text-4xl text-red-600" />,
    title: 'Payment Secure',
    description: '100% secure payment',
  },
];

const Services = () => {
  return (
    <section className="py-10 px-40">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {services.map((service, index) => (
            <div key={index} className="w-full md:w-1/3 lg:w-1/4 px-4">
              <div className="relative pl-16 mb-4">
                <div className="absolute left-0 top-1">
                  {service.icon}
                </div>
                <h6 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h6>
                <p className="m-0">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
