import { cloudinary, company, page } from "@utils/config";
import React from "react";

const prod = process.env.NEXT_PUBLIC_ENV_HOST === "production";

const BaseMeta = [
	<meta key="language" name="language" content="ES" />,
	<meta key="subject" name="subject" content={company.subject} />,
	<meta key="url" name="url" content={company.url} />,
	<meta key="identifierURL" name="identifier-URL" content={company.url} />,
	<meta key="category" name="category" content="Home Decor, Space, Interior" />,
	<meta key="coverage" name="coverage" content="Worldwide" />,
	<meta key="mobileWebCapable" name="mobile-web-app-capable" content="yes" />,
	<meta key="themeColor" name="theme-color" content="#ffffff" />,
	<meta key="googleSiteVerification" name="google-site-verification" content={page.googleSiteVerification} />,
	<meta key="sourceOrganization" itemProp="sourceOrganization" content={company.product} />,
	<meta key="robots" name="robots" content={prod ? "index,follow" : "noindex,nofollow"} />,
	<meta key="topic" name="topic" content={company.subject} />,
	<meta key="summary" name="summary" content={company.description} />,
	<link key="apple-touch-icon-57" rel="apple-touch-icon" sizes="57x57" href="/logo-icons/apple-icon-57x57.png" />,
	<link key="apple-touch-icon-60" rel="apple-touch-icon" sizes="60x60" href="/logo-icons/apple-icon-60x60.png" />,
	<link key="apple-touch-icon-72" rel="apple-touch-icon" sizes="72x72" href="/logo-icons/apple-icon-72x72.png" />,
	<link key="apple-touch-icon-76" rel="apple-touch-icon" sizes="76x76" href="/logo-icons/apple-icon-76x76.png" />,
	<link key="apple-touch-icon-114" rel="apple-touch-icon" sizes="114x114" href="/logo-icons/apple-icon-114x114.png" />,
	<link key="apple-touch-icon-120" rel="apple-touch-icon" sizes="120x120" href="/logo-icons/apple-icon-120x120.png" />,
	<link key="apple-touch-icon-144" rel="apple-touch-icon" sizes="144x144" href="/logo-icons/apple-icon-144x144.png" />,
	<link key="apple-touch-icon-152" rel="apple-touch-icon" sizes="152x152" href="/logo-icons/apple-icon-152x152.png" />,
	<link key="apple-touch-icon-180" rel="apple-touch-icon" sizes="180x180" href="/logo-icons/apple-icon-180x180.png" />,
	<link key="icon-192" rel="icon" type="image/png" sizes="192x192" href="/logo-icons/android-icon-192x192.png" />,
	<link key="icon-32" rel="icon" type="image/png" sizes="32x32" href="/logo-icons/favicon-32x32.png" />,
	<link key="icon-96" rel="icon" type="image/png" sizes="96x96" href="/logo-icons/favicon-96x96.png" />,
	<link key="icon-16" rel="icon" type="image/png" sizes="16x16" href="/logo-icons/favicon-16x16.png" />,
];

const AppleMeta = [
	<meta key="appleMobileWebCapable" name="apple-mobile-web-app-capable" content="yes" />,
	<meta key="appleTouchFullScreen" content="yes" name="apple-touch-fullscreen" />,
	<meta key="appleStatusBar" name="apple-mobile-web-app-status-bar-style" content="black" />,
	<meta key="formatDetection" name="format-detection" content="telephone=no" />,
];

const IEMeta = [
	<meta key="msapplicationStartUrl" name="msapplication-starturl" content="/" />,
	<meta key="msapplication-TileColor" name="msapplication-TileColor" content="#ffffff" />,
	<meta key="msapplicationLogo" name="msapplication-square310x310logo" content="/logo-icons/ms-icon-310x310.png" />,
	<meta key="msapplication-TileImage" name="msapplication-TileImage" content="/logo-icons/ms-icon-144x144.png" />,
];

const OGMeta = [
	<meta key="og-locale" property="og:locale" content="en_US" />,
	<meta key="og-type" property="og:type" content="website" />,
	<meta key="og-title" property="og:title" content={`${company.product} - ${company.tagLine}`} />,
	<meta key="og-description" property="og:description" content={company.description} />,
	<meta key="og-url" property="og:url" content="https://www.spacejoy.com" />,
	<meta key="og-site-name" property="og:site_name" content="Spacejoy" />,
	<meta
		key="og-image"
		property="og:image"
		content={`${cloudinary.baseDeliveryURL}/image/upload/w_200/v1578101355/shared/spacejoy-logo_ase39m.svg`}
	/>,
	<meta key="og-image-width" property="og:image:width" content="118" />,
	<meta key="og-image-height" property="og:image:height" content="25" />,
];
const TwitterCardMeta = [
	<meta key="twitter-card" name="twitter:card" content="summary_large_image" />,
	<meta key="twitter-site" name="twitter:site" content="@Spacejoyapp" />,
	<meta key="twitter-title" property="twitter:title" content={`${company.product} - ${company.tagLine}`} />,
	<meta key="twitter-description" property="twitter:description" content={company.description} />,
	<meta
		key="twitter-image"
		name="twitter:image"
		content={`${cloudinary.baseDeliveryURL}/image/upload/w_200/v1578101355/shared/spacejoy-logo_ase39m.svg`}
	/>,
];
const AppleLink = [
	<link key="apple-touch-icon1" rel="apple-touch-icon" href="/logo-icons/apple-icon.png" />,
	<link key="apple-touch-icon2" rel="apple-touch-icon" sizes="72x72" href="/logo-icons/apple-icon-72x72.png" />,
	<link key="apple-touch-icon3" rel="apple-touch-icon" sizes="114x114" href="/logo-icons/apple-icon-114x114.png" />,
];

const IndexPage = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com" />];

const PricingPage = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/pricing" />,
	<meta
		key="description"
		name="description"
		content="Get your home designed online. Cheap pricing plans and packages to design your rooms by interior designers in 3D. "
	/>,
];

const SpringFlingSale = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/offers/spring-sale" />,
	<meta
		name="keywords"
		key="keywords"
		content="online interior design packages, spring home decor ideas, spring decor tips, spring decor trends"
	/>,
	<meta key="robots" name="robots" content="index,follow" />,
	<meta key="topic" name="topic" content={company.subject} />,
	<meta
		key="summary"
		name="summary"
		content="Spacejoy brings you the Spring Fling Sale offering great discounts on all online interior design packages. Find spring home decor ideas, products, tips, trends, coupon codes &amp; more"
	/>,
	<meta
		key="description"
		name="description"
		content="Spacejoy brings you the Spring Fling Sale offering great discounts on all online interior design packages. Find spring home decor ideas, products, tips, trends, coupon codes &amp; more"
	/>,
	<meta
		key="og-description"
		property="og:description"
		content="Spacejoy brings you the Spring Fling Sale offering great discounts on all online interior design packages. Find spring home decor ideas, products, tips, trends, coupon codes &amp; more"
	/>,
	<meta
		key="tw-description"
		name="twitter:description"
		content="Spacejoy brings you the Spring Fling Sale offering great discounts on all online interior design packages. Find spring home decor ideas, products, tips, trends, coupon codes &amp; more"
	/>,
];

const FeelTheJoy = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/campaign/feel-the-joy" />,
	<meta
		name="keywords"
		key="keywords"
		content="interior design, home decor ideas, home decor inspiration, interior design inspiration, home styling, decor ideas for living room, decor ideas for bedroom, living room design ideas, bedroom design ideas, dining room design ideas, outdoor design ideas"
	/>,
	<meta key="robots" name="robots" content="index,follow" />,
	<meta key="topic" name="topic" content={company.subject} />,
	<meta
		key="summary"
		name="summary"
		content="Feel the joy of designing a home you to live in, with Spacejoy - the no. 1 online interior design service. From stunning makeovers to easy style upgrades, from finding the perfect furniture to getting it delivered to your doorstep, from creating the best layout options to delivering 3D designs of your actual space, we have solutions for all your design and and décor needs. Get started with Spacejoy!"
	/>,
	<meta
		key="description"
		name="description"
		content="Feel the joy of designing a home you to live in, with Spacejoy - the no. 1 online interior design service. From stunning makeovers to easy style upgrades, from finding the perfect furniture to getting it delivered to your doorstep, from creating the best layout options to delivering 3D designs of your actual space, we have solutions for all your design and and décor needs. Get started with Spacejoy!"
	/>,
	<meta
		key="og-description"
		property="og:description"
		content="Feel the joy of designing a home you to live in, with Spacejoy - the no. 1 online interior design service. From stunning makeovers to easy style upgrades, from finding the perfect furniture to getting it delivered to your doorstep, from creating the best layout options to delivering 3D designs of your actual space, we have solutions for all your design and and décor needs. Get started with Spacejoy!"
	/>,
	<meta
		key="tw-description"
		name="twitter:description"
		content="Feel the joy of designing a home you to live in, with Spacejoy - the no. 1 online interior design service. From stunning makeovers to easy style upgrades, from finding the perfect furniture to getting it delivered to your doorstep, from creating the best layout options to delivering 3D designs of your actual space, we have solutions for all your design and and décor needs. Get started with Spacejoy!"
	/>,
];

const LaborDaySale = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/campaign/feel-the-joy" />,
	<meta
		name="keywords"
		key="keywords"
		content="interior design, home decor ideas, home decor inspiration, interior design inspiration, home styling, decor ideas for living room, decor ideas for bedroom, living room design ideas, bedroom design ideas, dining room design ideas, outdoor design ideas"
	/>,
	<meta key="robots" name="robots" content="index,follow" />,
	<meta key="topic" name="topic" content={company.subject} />,
	<meta
		key="summary"
		name="summary"
		content="Shop the biggest end of summer deals on furniture and decor with our Labor Day Sale. Furniture, furnishings, lighting, decor, everything you need to get your home fall-ready, right here on Spacejoy. Shop now!"
	/>,
	<meta
		key="description"
		name="description"
		content="Shop the biggest end of summer deals on furniture and decor with our Labor Day Sale. Furniture, furnishings, lighting, decor, everything you need to get your home fall-ready, right here on Spacejoy. Shop now!"
	/>,
	<meta
		key="og-description"
		property="og:description"
		content="Shop the biggest end of summer deals on furniture and decor with our Labor Day Sale. Furniture, furnishings, lighting, decor, everything you need to get your home fall-ready, right here on Spacejoy. Shop now!"
	/>,
	<meta
		key="tw-description"
		name="twitter:description"
		content="Shop the biggest end of summer deals on furniture and decor with our Labor Day Sale. Furniture, furnishings, lighting, decor, everything you need to get your home fall-ready, right here on Spacejoy. Shop now!"
	/>,
];

const FurnitureDecorShop = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/furniture-decor-shop" />,
	<meta
		name="keywords"
		key="keywords"
		content="Wayfair, Target, Article, ruggable, anthropologie, pottery barn, west elm, Williams and Sonama"
	/>,
	<meta key="robots" name="robots" content="index,follow" />,
	<meta key="topic" name="topic" content={company.subject} />,
	<meta
		key="summary"
		name="summary"
		content="Spacejoy is a house brands. Shop Spacejoy for all things home across all styles and budgets. Hundreds of brands of furniture, lighting, decor, and more. Get additional Spacejoy discounts!"
	/>,
	<meta
		key="description"
		name="description"
		content="Spacejoy is a house brands. Shop Spacejoy for all things home across all styles and budgets. Hundreds of brands of furniture, lighting, decor, and more. Get additional Spacejoy discounts!"
	/>,
	<meta
		key="og-description"
		property="og:description"
		content="Spacejoy is a house brands. Shop Spacejoy for all things home across all styles and budgets. Hundreds of brands of furniture, lighting, decor, and more. Get additional Spacejoy discounts!"
	/>,
	<meta
		key="tw-description"
		name="twitter:description"
		content="Spacejoy is a house brands. Shop Spacejoy for all things home across all styles and budgets. Hundreds of brands of furniture, lighting, decor, and more. Get additional Spacejoy discounts!"
	/>,
];

const BlackFridaySale = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/offers/black-friday-sale" />,
	<meta
		name="keywords"
		key="keywords"
		content="online interior design packages, black friday sale, interior design offers, furniture discount, decor discount"
	/>,
	<meta key="robots" name="robots" content="index,follow" />,
	<meta key="topic" name="topic" content={company.subject} />,
	<meta
		key="summary"
		name="summary"
		content="Spacejoy brings you the biggest sale of the year. Black Friday Sale. 40% off on online interior design services and get upto 80% off on furniture and decor when you shop from your design"
	/>,
	<meta
		key="description"
		name="description"
		content="Spacejoy brings you the biggest sale of the year. Black Friday Sale. 40% off on online interior design services and get upto 80% off on furniture and decor when you shop from your design"
	/>,
	<meta
		key="og-description"
		property="og:description"
		content="Spacejoy brings you the biggest sale of the year. Black Friday Sale. 40% off on online interior design services and get upto 80% off on furniture and decor when you shop from your design"
	/>,
	<meta
		key="tw-description"
		name="twitter:description"
		content="Spacejoy brings you the biggest sale of the year. Black Friday Sale. 40% off on online interior design services and get upto 80% off on furniture and decor when you shop from your design"
	/>,
];

const CustomerStories = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/customer-stories" />];
const InteriorDesignBlog = [
	<link key="canonical" rel="canonical" href="https://www.spacejoy.com/interior-designs-blog" />,
];
const InteriorDesign = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/interior-designs" />];
const Collection = [];
const Help = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/help" />];
const Terms = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/terms" />];
const GiftUp = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/purchase-gift-card" />];
const Cookies = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/cookies" />];
const Login = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/auth/login" />];
const SignUp = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/auth/signup" />];
const ForgetPassword = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/auth/forget-password" />];
const ResetPassword = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/auth/password/reset" />];
const StyleQuizIntro = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/style-quiz-intro" />];
const StyleQuiz = [<link key="canonical" rel="canonical" href="https://www.spacejoy.com/style-quiz" />];

const StyleQuizIntroMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...StyleQuizIntro,
];
const StyleQuizMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...StyleQuiz];

const IndexPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...IndexPage];
const PricingPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...PricingPage,
];
const InteriorDesignMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...InteriorDesign,
];
const OfferPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...SpringFlingSale,
];
const CampaignMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...FeelTheJoy];
const LaborDaySaleMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...LaborDaySale,
];
const BlackFridayPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...BlackFridaySale,
];
const FurniturePageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...FurnitureDecorShop,
];
const CollectionPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...Collection,
];
const CustomerStoriesPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...CustomerStories,
];
const InteriorDesignBlogPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...InteriorDesignBlog,
];
const HelpPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...Help];
const TermsPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...Terms];
const GiftUpPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...GiftUp];
const CookiesPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...Cookies];
const LoginPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...Login];
const SignUpPageMeta = [...BaseMeta, ...OGMeta, ...TwitterCardMeta, ...AppleMeta, ...IEMeta, ...AppleLink, ...SignUp];
const ForgetPasswordPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...ForgetPassword,
];
const ResetPasswordPageMeta = [
	...BaseMeta,
	...OGMeta,
	...TwitterCardMeta,
	...AppleMeta,
	...IEMeta,
	...AppleLink,
	...ResetPassword,
];

export {
	IndexPageMeta,
	PricingPageMeta,
	InteriorDesignMeta,
	OfferPageMeta,
	CollectionPageMeta,
	CustomerStoriesPageMeta,
	InteriorDesignBlogPageMeta,
	HelpPageMeta,
	TermsPageMeta,
	CookiesPageMeta,
	LoginPageMeta,
	SignUpPageMeta,
	ForgetPasswordPageMeta,
	ResetPasswordPageMeta,
	GiftUpPageMeta,
	BlackFridayPageMeta,
	StyleQuizIntroMeta,
	StyleQuizMeta,
	CampaignMeta,
	LaborDaySaleMeta,
	FurniturePageMeta,
};
