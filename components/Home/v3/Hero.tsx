import { buttonVariants } from '@components/Button';
import ShinyButton from '@components/Button/ShinyButton';
import { FlipWords } from '@components/Shared/FlipWords';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import Link from 'next/link';

type Props = {};

const showSectionGradient = false;

export const Hero = (props: Props) => {
  return (
    <div className="relative bg-center bg-no-repeat bg-cover bg-hero">
      {showSectionGradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      )}
      <MaxWidthContainer className="h-[calc(100vh-100px)] flex flex-col justify-center font-normal !py-0">
        <div className="w-[40%] space-y-4 text-zinc-800 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 px-10 h-full flex flex-col justify-center">
          <div className="text-xl">
            Design Your{' '}
            <FlipWords
              words={["Kid's Room", 'Entryway', 'Dining Room', 'Home Office', 'Bedroom', 'Living Room', 'Imagination']}
              className="font-semibold text-spj-red"
            />
          </div>
          <h1 className="text-6xl font-light">The home you&apos;ve always imagined starts here</h1>
          <p className="text-xl">
            Shop your custom-designed room with picks from top brands and budget-friendly finds.
          </p>
          <div className="flex items-center pt-4 space-x-4">
            <ShinyButton href="https://designs.spacejoy.com/new-project" target="_blank" showRing={false}>
              Start Your Project
            </ShinyButton>
            <Link href="/interior-designs" passHref>
              <a className={buttonVariants({ variant: 'outline', className: 'text-black' })}>Explore Designs</a>
            </Link>
          </div>
          <p className="flex items-center gap-2">200,000+ beautiful rooms designed and delivered since 2019.</p>
        </div>
      </MaxWidthContainer>
    </div>
  );
};
