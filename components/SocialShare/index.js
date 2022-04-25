import { cloudinary } from "@utils/config";
import PropTypes from "prop-types";
import React from "react";
import { FacebookShareButton, PinterestShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import styled from "styled-components";

const imageLocation = typeof window !== "undefined" ? window.location.href : "";
// const imageLocation =
// 	"https://www.spacejoy.com/interior-designs/dining-room-ideas/a-gatsby-inspired-art-deco-dining-room";
const getSocialLink = (data) => {
	switch (data.name) {
		case "pinterest":
			return <PinterestShareButton {...data} />;
		case "facebook":
			return <FacebookShareButton {...data} />;
		case "twitter":
			return <TwitterShareButton {...data} />;
		case "whatsapp":
			return <WhatsappShareButton {...data} />;
		default:
			return <PinterestShareButton {...data} />;
	}
};

const SocialButton = styled(({ ...props }) => {
	return getSocialLink({ ...props });
})`
	outline: none;
	span {
		font-size: 1.25rem;
		margin-right: 0.5rem;
		transition: filter 0.2s linear;
		filter: contrast(0);
		&:hover {
			filter: contrast(1);
		}
	}
`;

const propTypes = {
	media: PropTypes.string,
	description: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string,
};

const defaultProps = {
	media: "",
	description: "",
	name: "pinterest",
	title: "",
};
function SocialShare({ media, description, name, title }) {
	return (
		<SocialButton
			name={name}
			url={String(imageLocation)}
			description={description}
			media={`${cloudinary.baseDeliveryURL}/${media}`}
			title={title}
			summary={description}
			quote={title}
		>
			<span className={`icon-${name}-color`} />
		</SocialButton>
	);
}

SocialShare.propTypes = propTypes;
SocialShare.defaultProps = defaultProps;

export default SocialShare;
