import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header/Header';
import HeaderMobile from './HeaderMobile';

interface LayoutSubComponents {
  Banner: React.FC;
  Header: React.FC;
  Body: React.FC;
  Footer: React.FC;
}

const Layout: React.FC & LayoutSubComponents = ({ children }) => <>{children}</>;

Layout.Banner = () => <Banner />;

Layout.Header = () => {
  const mobile = Cookies.get('isMobile');

  return mobile === 'true' ? <HeaderMobile /> : <Header />;
};

Layout.Body = ({ children }) => <main id="main">{children}</main>;

Layout.Footer = () => <Footer />;

export default Layout;
