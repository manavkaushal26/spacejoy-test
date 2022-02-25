import affirm from '@utils/affirm';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const AffirmWrapper = styled.div`
  font-size: 0.85rem;
  background-color: white;
  border-radius: 5px;
  padding: 24px 16px;
  .affirm-ala-price {
    font-weight: bold;
  }
  a {
    transform: translate(0px, -6px);
    font-weight: bold;
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    padding: 8px;
    text-transform: capitalize;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (min-width: 991px) and (max-width: 1200px) {
    font-size: 0.65rem;
  } ;
`;

const AffirmCartPrice = ({ totalAmount, flow, affirmType }) => {
  useEffect(() => {
    if (affirm?.ui?.refresh) {
      affirm.ui.refresh();
    }
  }, [totalAmount]);

  return (
    <AffirmWrapper>
      <p
        className={`affirm-${affirmType}`}
        data-page-type={flow}
        data-amount={(parseFloat(totalAmount) * 100).toString()}
      />
    </AffirmWrapper>
  );
};

AffirmCartPrice.propTypes = {
  totalAmount: PropTypes.number,
  flow: PropTypes.string,
  affirmType: PropTypes.string,
};
AffirmCartPrice.defaultProps = {
  totalAmount: 0,
  flow: 'product',
  affirmType: 'as-low-as',
};

export default AffirmCartPrice;
