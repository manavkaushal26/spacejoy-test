import React from 'react';

const HomeSectionTitle = ({ children, className }) => {
  return <section className={className}>{children}</section>;
};

HomeSectionTitle.MainTitle = ({ children }) => (
  <h2 className="mb-3 homepage-section_headings">{children}</h2>
);

HomeSectionTitle.Description = ({ children, align, isMaxWidthHalf = true }) => (
  <p
    className={`text-lg text-gray-900 ${isMaxWidthHalf && 'xl:max-w-[50%]'} leading-relax md:leading-relax ${
      align === 'center' && 'mx-auto'
    }`}
  >
    {children}
  </p>
);

export default HomeSectionTitle;
