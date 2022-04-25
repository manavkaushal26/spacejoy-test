/* eslint-disable react/prop-types */
import fetcher from "@utils/fetcher";
import React, { useEffect, useState } from "react";

const SlickButton = ({ currentSlide, slideCount, children, ...props }) => <div {...props}>{children}</div>;

const carouselSettings = {
  
	slidesToScroll: 1,
	infinite: true,
	nextArrow: (
		<SlickButton>
			<span className="menu-icon icon-chevron-right" />
		</SlickButton>
	),
	prevArrow: (
		<SlickButton>
			<span className="menu-icon icon-chevron-left" />
		</SlickButton>
	),
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 767,
			settings: "unslick",
		},
	],
};

const getEngagementsBlocks = async (queryParams) => {
	const [customerData, similarPicksData, categoryData, editorPickData] = await Promise.all([
		fetcher({ endPoint: `/web/block/customerStories${queryParams}`, method: "GET" }).then((res) => res?.data?.data),
		fetcher({ endPoint: `/web/block/similar${queryParams}`, method: "GET" }).then((res) => res?.data?.data),
		fetcher({ endPoint: `/web/block/categories${queryParams}`, method: "GET" }).then((res) => res?.data?.data),
		fetcher({ endPoint: `/web/block/editorPick${queryParams}`, method: "GET" }).then((res) => res?.data?.data),
	]);

	return { customerData, similarPicksData, categoryData, editorPickData };
};

const handleRefLeftOffset = (ref) => {
	if (ref && ref.current) {
		const paddingLeft = window.getComputedStyle(ref.current).getPropertyValue("padding-left");
		const { offsetLeft } = ref.current;
		const totalOffset = offsetLeft + parseInt(paddingLeft, 10);

		return totalOffset;
	}

	return 30;
};

const useLeftOffsetHook = (ref) => {
	const [headerLeftOffset, setHeaderLeftOffset] = useState(0);

	const handleHeaderOffset = () => {
		const offset = handleRefLeftOffset(ref);
		setHeaderLeftOffset(offset);
	};

	const handleResize = () => {
		handleHeaderOffset();
	};

	useEffect(() => {
		handleHeaderOffset();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return headerLeftOffset;
};

export { getEngagementsBlocks, useLeftOffsetHook, carouselSettings };
