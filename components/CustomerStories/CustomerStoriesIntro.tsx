import React from 'react';
import useBoolean from '@hooks/useBoolean';

const CustomerStoriesIntro = () => {
  const { value, toggle } = useBoolean(false);

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-5 my-8">
      <div className='flex flex-col space-y-2'>
      <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      Customer Stories - Interior Design Reviews
      </h1>
      <h4 className="text-gray-600 text-base">The grand, the good and the fine – reviews of Spacejoy&apos;s service as told by our customers.</h4>
      </div>
      <div><p className={`${!value && 'line-clamp-3'} text-gray-700 text-sm`}>
      Spacejoy is carefully crafted and developed to fulfill the needs of anyone looking for an online interior design service to design spaces that are high on style and easy on the wallet. Thousands of people are using Spacejoy to find inspiration and to design their rooms online. Hear it straight from our customers what it is like to work with an online interior design service like Spacejoy to design your room online. Explore reviews of Spacejoy and that of online interior design via testimonials and stories from actual design projects. Find out what makes Spacejoy unique and the advantage we bring to you. Learn what happens in the requirement gathering stage before you start your interior design project online and how Spacejoy’s designers translate your design brief into beautiful moodboards that are based on inputs from you, crafted to suit your style. They also infuse your style and personality into the design of your room so it can narrate your story while keeping a tab on the budget without compromising on style, of course. And finally, what it means to see your actual room designed in interactive 3D. See it in your room and fall in love with your design before you move on to shopping for the products featured in your design. Bring them home, set it up, and unlock the best version of your room. Here is a sneak peek of the magic behind the scenes, straight from our customers.
      </p>
      <button className="my-1 text-[#F5296E] text-sm" onClick={toggle}>
        {!value ? '... read more' : 'hide'}
      </button></div>
    </div>
  );
};

export default CustomerStoriesIntro;
