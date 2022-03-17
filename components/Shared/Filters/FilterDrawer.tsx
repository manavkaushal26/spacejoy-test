import React from 'react';

export default function FilterDrawer({
  title = '',
  description = '',
  children,
  isOpen,
  setIsOpen,
  onClearCallback,
  clearBtn = true,
}) {
  return (
    <main
      className={
        ' fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          ' w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col divide-y-4 divide-gray-200 space-y-2 overflow-y-scroll h-full">
          <div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center p-4">
                <span className="p-2 font-bold text-lg">{title}</span>
              </div>
              <div className="flex justify-end mx-4 space-x-2">
                {clearBtn && (
                  <button
                    onClick={onClearCallback}
                    className="flex  items-center space-x-2 px-4 py-2 text-base font-medium text-gray-300 bg-white shadow-xs cursor-not-allowed group hover:shadow-md rounded-md focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                  >
                    Clear
                  </button>
                )}
                <button onClick={() => setIsOpen(!isOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="m-2 text-base">{description}</p>
          </div>
          <div className="divide-y-2 divide-gray-200 space-y-1 p-4">{children}</div>
        </article>
        {/* <div className='fixed bottom-5 right-5'>
          <button className='text-white text-xs py-1.5 px-3 mx-2 rounded-md border border-gray-900 bg-gray-900 hover:bg-gray-700 whitespace-nowrap'>
            Apply
          </button>
        </div> */}
      </section>

      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </main>
  );
}
