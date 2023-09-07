import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import Image from 'next/image';
import { imageKit } from '@utils/config';

const UserCardWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  .thumbnail {
    margin-right: 1rem;
    height: 100px;
    width: 100px;
  }
  .details {
    h3,
    p {
      margin: 0;
    }
  }
`;

function UserCard({ dp, name, address, ratings, align }) {
  return (
    <UserCardWrapper className={`text-${align}`}>
      {dp && (
        <div className="relative col-span-2 rounded-full ring-2 ring-white bg-[#F39C12] h-16 w-16 -mb-1 border-1 border-white overflow-hidden mr-8">
          <Image src={`${imageKit.baseDeliveryUrl}/${dp}`} alt="" layout="fill" />
        </div>
      )}
      <div className="text-left details">
        <h3>{name}</h3>
        <p className="text-sm">{address}</p>
        <StarRatings
          rating={5}
          starRatedColor="black"
          numberOfStars={5}
          starDimension="12px"
          starSpacing="1px"
          name="rating"
        />
      </div>
    </UserCardWrapper>
  );
}

UserCard.defaultProps = {
  dp: '',
  name: '',
  address: '',
  align: 'center',
  ratings: 0,
};

UserCard.propTypes = {
  dp: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  align: PropTypes.string,
  ratings: PropTypes.number,
};

export default UserCard;
