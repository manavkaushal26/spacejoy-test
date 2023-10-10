import CustomerStoryCard from '@components/Cards/CustomerStoryCard';
import React from 'react';

const CustomerStories = ({ data }) => {
  return (
    <>
      {data.length &&
        data.map((item) => {
          return <CustomerStoryCard data={item} key={item._id} />;
        })}
    </>
  );
};

export default React.memo(CustomerStories);
