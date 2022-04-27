import EditorPickCard from "@components/Cards/EditorPickCard";
import Carousel from "@components/Carousel";
import { blurredBgImage } from "@public/images/bg-base-64";
import RecommendedIcon from "@public/images/recommended.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const responsive = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  className: 'responsive',
  autoplay: true,
  autoplaySpeed: 2000,
};

const EditorPicksCarousel = ({ data }) => {
	return (
		<>
    <Carousel
        responsive={responsive}
        imageCount={data.length}
        slidesToShow={3}
        autoplay
        autoplaySpeed={2500}
        infinite
      >
        {data.map((item) => {
				return (
					item?.room && (
						<EditorPickCard data={item} key={item?._id}/>
					)
				);
			})}
      </Carousel>
			
		</>
	);
};


export default React.memo(EditorPicksCarousel);
