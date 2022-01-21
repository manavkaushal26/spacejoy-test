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
  const counts = [];
  const getReviewsCount = () => {
    for (let i = 1; i < 6; i++) {
      counts.push({ rating: i, count: props.reviews?.filter((review) => review.rating === i)?.length });
    }
  };
  getReviewsCount();

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customer Reviews</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      props.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                      'flex-shrink-0 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{props.rating} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">Based on {props.reviews.length} reviews</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex-1 flex items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex-1 flex items-center">
                      <StarIcon
                        className={classNames(
                          count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />

                      <div className="ml-3 relative flex-1">
                        <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                            style={{ width: `calc(${count.count} / ${props.reviews.length} * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                    {Math.round((count.count / props.reviews.length) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {props.reviews.slice(0, 3).map((review) => (
                <div key={review._id} className="py-12">
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
                    className="mt-4 space-y-6 text-base italic text-gray-600"
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
