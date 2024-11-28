import { buttonVariants } from '@components/Button';
import ShinyButton from '@components/Button/ShinyButton';
import { FlipWords } from '@components/Shared/FlipWords';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import Link from 'next/link';

type Props = {};

const showSectionGradient = false;

export const Hero = (props: Props) => {
  return (
    <div className="relative bg-center bg-no-repeat bg-cover bg-hero min-h-[calc(100vh-175px)]">
      {showSectionGradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      )}
      <MaxWidthContainer className="h-[calc(100vh-175px)] flex flex-col justify-center font-normal !py-0">
        <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] space-y-4 text-zinc-800 bg-white bg-clip-padding backdrop-filter backdrop-blur-lg md:backdrop-blur-sm bg-opacity-50 px-10 py-16 rounded-[1rem] md:rounded-none md:py-0 md:h-full flex flex-col justify-center">
          <h1 className="text-4xl font-light md:text-5xl lg:text-[3.3rem]">
            The home you&apos;ve always imagined starts here
          </h1>
          <div className="text-lg md:text-2xl">
            Design Your{' '}
            <FlipWords
              words={["Kid's Room", 'Entryway', 'Dining Room', 'Home Office', 'Bedroom', 'Living Room', 'Imagination']}
              className="font-semibold text-spj-red"
            />
          </div>
          {/* <p className="text-xl">
            Shop your custom-designed room with picks from top brands and budget-friendly finds.
          </p> */}
          <div className="flex flex-col items-start pt-4 space-y-2 xl:space-x-4 xl:space-y-0 xl:items-center xl:flex-row">
            <ShinyButton
              href="https://designs.spacejoy.com/new-project"
              target="_blank"
              showRing={false}
              className="w-full xl:w-fit"
            >
              Design Your Room
            </ShinyButton>
            <Link href="/interior-designs" passHref>
              <a className={buttonVariants({ variant: 'outline', className: 'text-black w-full xl:w-fit' })}>
                Meet Our Designers
              </a>
            </Link>
          </div>
          <p>
            <span className="font-semibold text-spj-red">200,000+</span> beautiful rooms designed and delivered{' '}
            <span className="font-semibold text-spj-red">since 2019!</span>
          </p>
        </div>
      </MaxWidthContainer>
    </div>
  );
};
