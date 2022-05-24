import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';

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

export default function Reviews(props) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4  sm:px-6 lg:max-w-7xl  lg:px-8">
        <h2 className="text-black-500 text-xl  underline underline-offset-4">Ratings &amp; Reviews</h2>
        <p className="mt-2 text-sm text-gray-400 font-medium">as seen on {props.retailer}</p>
        <div className="grid grid-cols-5">
          <div className="my-12 col-span-5 lg:col-span-2">
            <p className="text-center text-6xl font-bold lg:text-left">{props.rating.toFixed(2)}</p>
            <div className="text-center my-4 lg:text-left">
              <StarRatings
                rating={props?.rating}
                starRatedColor="black"
                numberOfStars={5}
                starDimension="16px"
                starSpacing="3px"
                name="rating"
              />
            </div>
          </div>
          <div className="flow-root col-span-5 lg:col-span-3">
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
                        <h4 className="text-sm font-bold text-gray-900 capitalize">{review.name}</h4>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating ? 'text-gray-900' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{review.rating} out of 5 stars</p>
                      </div>
                    </div>

                    <div>{review.date ? new Date(review.date).toDateString() : null}</div>
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
