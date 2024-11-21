import SectionHeading from '@components/EcommercePage/SectionHeading';
import { HomeIcon } from '@heroicons/react/solid';

type Props = {};

const BeautifulSpaces = (props: Props) => {
  return (
    <>
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-orange-100 to-orange-300 w-fit">
            <HomeIcon className="w-8 h-8 text-orange-500" />
          </div>
        }
        title="Beautiful spaces await you"
        subTitle="From a corner to a whole room, see how our customers are transforming their homes"
        center
      />
    </>
  );
};

export default BeautifulSpaces;
