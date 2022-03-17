import React from 'react';

const SectionTitle = ({
  accent,
  feature,
  title,
  description,
}: {
  accent?: string;
  feature?: string;
  title: string;
  description?: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="container px-4 mx-auto sm:px-28">
      <div className="max-w-4xl mx-auto sm:text-center">
        {feature && <p className="mb-2 font-semibold tracking-wide text-gray-500 uppercase">{feature}</p>}
        <h2
          className={`mt-2 text-3xl leading-tight font-extrabold tracking-normal md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight mb-5 ${
            accent === 'light' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
        {description && <p className={`${accent === 'light' ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>}
      </div>
    </div>
  );
};

export default SectionTitle;
