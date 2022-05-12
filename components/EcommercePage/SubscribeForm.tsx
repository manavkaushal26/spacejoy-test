import React, { useState } from 'react';
import SectionHeading from './SectionHeading';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const handleChange = (email) => {
    setEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(email);
  };

  return (
    <div className="sm:bg-[#F9F9F9] mt-16 mb-8 sm:py-16">
      <div className="container max-w-7xl px-4 mx-auto sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center">
        <SectionHeading title="Get to deals, latest trends and more" noMargin />

        <form className="w-full flex space-x-2 mt-4 sm:m-0">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Email Address"
            className="w-full rounded-lg transition duration-200"
            required
          />
          <button
            type="submit"
            className="text-white w-1/2 text-base py-1.5 px-3 rounded-lg border border-gray-900 bg-gray-900 hover:bg-gray-700 whitespace-nowrap"
            onClick={(e) => handleSubmit(e)}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeForm;
