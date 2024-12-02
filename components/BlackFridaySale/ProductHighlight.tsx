import { oldSpacejoyUrl } from '@utils/config';
import { classNames } from '@utils/helpers';
import Link from 'next/link';

type ProductHighlightTypes = {
  backgroundSrc: string;
  sale: string;
};

const getTextColor = {
  'black-friday': 'text-[#e6bc63]', //text-[#e6bc63]
  'cyber-monday': 'text-white',
};
const getBackgroundColor = {
  'black-friday': 'bg-[#e6bc63]', //bg-[#e6bc63]
  'cyber-monday': 'bg-white',
};

export const ProductHighlight = ({ backgroundSrc = '', sale = '' }: ProductHighlightTypes) => {
  return (
    <div
      className={classNames('relative col-span-3 px-4 py-12 text-white bg-center bg-cover rounded-xl', backgroundSrc)}
    >
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-4 place-items-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">DELIGHT</h2>
          <p className="text-xl font-semibold text-white sm:text-2xl">
            Price: <span className="text-gray-200 line-through">$499</span>
          </p>
          <p className="text-xl font-semibold text-white sm:text-2xl">
            Deal Price: <span className={getTextColor[sale]}>$299</span>
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">BLISS</h2>
          <p className="text-xl font-semibold text-white sm:text-2xl">
            Price: <span className="text-gray-200 line-through">$699</span>
          </p>
          <p className="text-xl font-semibold text-white sm:text-2xl">
            Deal Price: <span className={getTextColor[sale]}>$399</span>
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">EUPHORIA</h2>
          <p className="text-xl font-semibold text-white sm:text-2xl">
            Price: <span className="text-gray-200 line-through">$999</span>
          </p>
          <p className="text-xl font-semibold text-white sm:text-2xl">
            Deal Price: <span className={getTextColor[sale]}>$599</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className={classNames('text-4xl font-bold sm:text-5xl', getTextColor[sale])}>+35%</h2>
          <p className="mb-4 text-base sm:text-xl">The best time to design and shop</p>
          <Link href={oldSpacejoyUrl + '/new-project'}>
            <a target="_blank" rel="noopener noreferrer">
              <button
                className={classNames('mt-4 text-black px-6 py-3 rounded-lg font-bold', getBackgroundColor[sale])}
              >
                START YOUR PROJECT →
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
