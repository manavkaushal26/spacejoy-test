import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import StartNewProjectButton from '@components/Shared/StartNewProjectButton';
import { LightBulbIcon } from '@heroicons/react/solid';
import Icons from '@utils/Mocks/Icons';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (playButtonRef.current) {
      gsap.to(playButtonRef.current, {
        opacity: isPlaying ? 0 : 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [isPlaying]);

  return (
    <div className="bg-[#fff1f2]/50 mt-16 sm:mt-24">
      <MaxWidthContainer className="py-12 sm:py-20">
        <SectionHeading
          preText={
            <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-amber-100 to-amber-300 w-fit">
              <LightBulbIcon className="w-8 h-8 text-amber-500" />
            </div>
          }
          title="Watch how Spacejoy works"
          subTitle="From consultation to final transformation"
          center
          noMargin
        />
        <div id="video_container" className="mt-10 relative mx-auto w-full sm:w-[75%] rounded-2xl shadow-md">
          {/* Design elements */}
          <div className="bg-[url('https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_412/v1732126047/spj-v2/home-v3/video_container_design_element_1_1_ufbhtr.webp')] bg-center bg-no-repeat bg-contain w-24 -top-[10%] sm:w-64 aspect-[3/2] absolute right-0 md:-right-[6.5rem] md:-top-[5%] -z-[1]" />
          <div className="bg-[url('https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_208/v1732126808/spj-v2/home-v3/video_container_design_element_2_v78zim.webp')] bg-center bg-no-repeat bg-contain w-20 sm:w-32 aspect-[3/2] absolute -left-20 top-[75%] rotate-[10deg] -z-[1]" />
          <video
            ref={videoRef}
            poster="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1128/v1732111652/video_cover_d9emy1.jpg"
            controls={isPlaying}
            muted={!isPlaying}
            playsInline
            className="rounded-2xl"
            preload="metadata"
          >
            <source
              src="https://res.cloudinary.com/spacejoy/video/upload/fl_lossy,q_auto/v1719828761/spj-v2/homepage_video_compressed_hlom7a.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML video.
          </video>
          {!isPlaying && (
            <div
              ref={playButtonRef}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
              onClick={togglePlayback}
            >
              <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden rounded-full sm:w-16 md:w-20 md:h-20 sm:h-16 lg:w-24 lg:h-24 group">
                <Icons.playIcon className="z-[2] w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-spj-red to-spj-yellow group-hover:-rotate-180 z-[1]" />
              </div>
            </div>
          )}
        </div>
        <StartNewProjectButton className="mt-6 md:mt-10" center />
      </MaxWidthContainer>
    </div>
  );
};

export default Video;
