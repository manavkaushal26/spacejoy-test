type Props = {
  homePagePoster: string;
};

const VideoGuide = ({ homePagePoster }: Props) => {
  return (
    <div className="container px-4 mx-auto mt-16 mb-6 xl:px-20 sm:mt-32 sm:mb-12">
      <video
        poster={homePagePoster}
        className="w-full aspect-video"
        width="400"
        controls
        autoPlay
        muted
        playsInline // For ios devices
      >
        <source
          src="https://res.cloudinary.com/spacejoy/video/upload/v1719828761/spj-v2/homepage_video_compressed_hlom7a.mp4"
          type="video/mp4"
        />
        Your browser does not support HTML video.
      </video>
    </div>
  );
};

export default VideoGuide;
