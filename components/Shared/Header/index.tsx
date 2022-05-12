import useWindowSize from '@utils/useWindowSize';
import React from 'react';
import HeaderMobile from '../HeaderMobile';
import HeaderDesktop from './HeaderDesktop';

const Header = () => {
  const { width } = useWindowSize();
  const mobile = width <= 768 ? true : false;

  return mobile ? <HeaderMobile mobile={mobile} /> : <HeaderDesktop />;
};

export default Header;
