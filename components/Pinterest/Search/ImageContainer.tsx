import React from 'react';

const ImageContainer: React.FC = () => {
  return (
    <div className="relative w-full h-full col-span-3 rounded-lg lg:col-span-1">
      {/* <Image
        src={`${imageKit.baseDeliveryUrl}/w_1000/v1622011999/web/spj-living-room-min_y9ujxb.jpg`}
        alt=""
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      /> */}
      <video autoPlay muted loop playsInline className="rounded-xl">
        <source
          src="https://res.cloudinary.com/spacejoy/video/upload/v1644412152/spj-v2/Pinterst_Connect_Gif-2_2_2_jyisck.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default ImageContainer;
