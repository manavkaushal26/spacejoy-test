import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import OutputGallery from '@components/Home/OutputGallery';

type Props = { isMobile: string | boolean };

const HomeGallery = ({ isMobile }: Props) => {
  return (
    <>
      <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
        <HomeSectionTitle className="text-center">
          <HomeSectionTitle.MainTitle>Beautiful spaces await you</HomeSectionTitle.MainTitle>
          {isMobile !== 'true' && (
            <HomeSectionTitle.Description align="center">
              From a corner to a whole room, see how our customers are transforming their homes
            </HomeSectionTitle.Description>
          )}
        </HomeSectionTitle>
      </div>
      <OutputGallery />
    </>
  );
};

export default HomeGallery;
