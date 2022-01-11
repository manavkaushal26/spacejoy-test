import React from 'react';

const HomeSectionTitle = ({ children, className }) => {
  return <section className={className}>{children}</section>;
};

HomeSectionTitle.MainTitle = ({ children }) => (
  <h2 className="text-5xl text-gray-900 mb-6 leading-tight">{children}</h2>
);

HomeSectionTitle.Description = ({ children, align }) => (
  <p className={`text-xl text-gray-900 max-w-[50%] leading-relax ${align === 'center' && 'mx-auto'}`}>{children}</p>
);

export default HomeSectionTitle;
