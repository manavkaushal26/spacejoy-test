import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';

interface Review {
  name: string;
  dp?: any;
  title: string;
  review: string;
  rating: number;
  date: Date;
}
interface Props {
  reviews: Review[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example(props) {

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8">
        <h2 className='text-black-500 text-xl my-8 underline underline-offset-4'>Top Reviews</h2>
        <div className="mt-16 lg:mt-0">
          <div className="flow-root">
            
            <div className="-my-12 divide-y divide-gray-200 ">
              {props.reviews.map((review) => (
                <div key={review._id} className="py-12 lg:grid">
                  <div className="flex items-center justify-between">
                    <div>
                    {review.dp && (
                      <div className="space-y-4">
                        <Image src={review.dp} alt="" className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{review.name}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                    </div>
                    
                    
                    <div>{new Date(review.date).toDateString()}</div>
                  </div>
                  <div className="mt-4 space-y-6 text-base italic">
                    <strong>{review.title}</strong>
                  </div>
                  <div
                    className="mt-4 space-y-6 text-base text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.review }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
