import React from 'react';

interface UnitActionInterface {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  id?: string;
  position: 'top' | 'left' | 'bottom';
  invert?: boolean;
}

const UnitAction: React.FC<UnitActionInterface> = ({
  children,
  onClick,
  disabled,
  title,
  position = 'left',
  id,
  invert = false,
}) => {
  if (onClick) {
    return (
      <div className="relative group" id={id}>
        {title && position === 'left' && (
          <span className="inline-block absolute right-10 top-1 text-white text-xs bg-gray-900 rounded px-2 py-1 z-50 transition translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
            {title}
            {/* <span className="absolute top-1 -right-px bg-gray-900 h-2 w-2 transform rotate-45" /> */}
          </span>
        )}
        {title && position === 'top' && (
          <span className="inline-block absolute text-white text-xs bg-gray-900 rounded px-2 py-1 z-50 whitespace-nowrap transition opacity-0 -translate-x-1/4 -translate-y-10 group-hover:opacity-100 group-hover:-translate-y-8">
            {title}
            {/* <span className="absolute -bottom-1 right-1/2 bg-gray-900 h-2 w-2 transform rotate-45" /> */}
          </span>
        )}
        {title && position === 'bottom' && (
          <span className="inline-block absolute text-white text-xs bg-gray-900 rounded px-2 py-1 z-50 whitespace-nowrap transition opacity-0  translate-y-12 group-hover:opacity-100 group-hover:translate-y-10">
            {title}
            {/* <span className="absolute -bottom-1 right-1/2 bg-gray-900 h-2 w-2 transform rotate-45" /> */}
          </span>
        )}
        <button
          className={`${
            !disabled && 'group-hover:bg-gray-900 group-hover:text-white'
          } rounded-full h-8 px-2 bg-gray-100 text-gray-900 flex items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-50 tracking-wide focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none`}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-full h-8 px-4 ${
        invert ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }  flex items-center justify-center ${disabled && 'group-hover:bg-gray-900 group-hover:text-white opacity-50'}`}
    >
      {children}
    </div>
  );
};

export default UnitAction;
