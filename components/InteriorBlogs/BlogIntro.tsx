import React from 'react';
import useBoolean from '@hooks/useBoolean';

const BlogIntro = () => {
  const { value, toggle } = useBoolean(false);

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-5 my-8 rounded-lg">
      <div className='flex flex-col space-y-2'>
      <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Interior Design Blog
      </h1>
      <h4 className="text-gray-600 text-base">Online interior design tips, guides and more</h4>
      </div>
      <div><p className={`${!value && 'line-clamp-3'} text-gray-700 text-sm leading-normal`}>
        Get ready to envision your dream home in a photo-realistic 3D render. Spacejoy&apos;s blog brings you the most
        inspiring home decor ideas. From the living room to the dining room and the entryway. Discover beautiful
        designs, decor inspiration, and interior design tips to make your dream home come true alongside Spacejoy&apos;s
        talented interior designers and decor writers. Welcome to the behind-the-scenes of our beautiful designs. Learn
        from our designers on how to turn your decor ideas into reality. Tap into our tips and recommendations on how to
        make a small room look bigger or how to find the perfect elements to decorate your dining room. Don’t miss our
        complete interior design style guides to help you deep-dive into the beautiful world of decor. Whether you’re
        looking for traditional farmhouse style or you’re ready to try mid-century modern furniture, our interior design
        blog will give you all the essential guides and advice to make your home a dream come out of an interior design
        magazine. The Spacejoy blog is your space for exciting, engaging, and helpful interior design advice that will
        help you feel more comfortable and passionate about turning your house into your dream home. Whether you’re
        looking for the best rugs, a little bit of wall art inspiration, or what are the trendiest paint colors of the
        year, the Spacejoy blog will become your go-to source for inspiration. If you have a question about interior
        design or how to decorate a specific room, there’s no doubt you’ll find your answers here. Our team of designers
        and writers are always open to suggestions. We want this space to be your library for decor inspiration. If you
        have a question, we’ll be here to not only answer your questions but also to share with you ideas and tips on
        how to find your design inspiration. Who says you have to spend thousands of dollars to work with an interior
        designer? At Spacejoy, we believe everyone deserves access to talented interior designers that can help them
        turn their dreams into reality. That’s why our mission is to offer an accessible interior design service that’s
        available to everybody.
      </p>
      <button className="my-1 text-[#F5296E] text-sm" onClick={toggle}>
        {!value ? '... read more' : 'hide'}
      </button></div>
    </div>
  );
};

export default BlogIntro;
