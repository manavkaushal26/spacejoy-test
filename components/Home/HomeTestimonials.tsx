import Slider from '@components/Carousel';
import DesignerCard from '@components/Home/DesignerCard';
import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { default as Testimonials } from '@utils/Mocks/HomeTestimonials';

type Props = {};

const HomeTestimonials = (props: Props) => {
  return (
    <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
      <HomeSectionTitle className="text-center">
        <HomeSectionTitle.MainTitle>
          <p>Get raving reviews from friends and family</p>
        </HomeSectionTitle.MainTitle>
        <HomeSectionTitle.Description align="center">
          We&apos;ll take care of the heavylifting so you can sit back and enjoy the compliments
        </HomeSectionTitle.Description>
      </HomeSectionTitle>
      <div className="mt-12">
        {
          <Slider
            imageCount={10}
            slidesToShow={1}
            withNav={false}
            responsive={
              {
                // dots: true,
                // arrows: false,
                // slidesToShow: 1.5,
                // className: 'with-space',
              }
            }
            arrows={false}
          >
            {Testimonials?.map((item) => {
              return <DesignerCard data={item} key={item?.id} />;
            })}
          </Slider>
        }
      </div>
    </div>
  );
};

export default HomeTestimonials;
