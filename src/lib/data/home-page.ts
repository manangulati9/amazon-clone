import { type ProductCategory } from "@prisma/client";

export type TItemDetails = {
	name?: string;
	category: ProductCategory[];
	image: string;
	href: string;
	object_fit?: string;
};

export type TCardItem = {
	title: string;
	items: TItemDetails[];
};

export const CARD_GROUP: TCardItem[] = [
	{
		title: "Deals on computers and laptops",
		items: [
			{
				category: ["Computer"],
				image: "/assets/home/gaming_pc.webp",
				href: "/search?category=Computer",
			},
		],
	},
	{
		title: "Refresh your space",
		items: [
			{
				name: "Dining",
				category: ["Kitchen"],
				image: "/assets/home/dining.jpg",
				href: "/search?category=Dining",
			},
			{
				name: "Home",
				category: ["Home"],
				image: "/assets/home/home.jpg",
				href: "/search?category=Home",
			},
			{
				name: "Kitchen",
				category: ["Kitchen"],
				image: "/assets/home/kitchen.webp",
				href: "/search?category=Kitchen",
			},
			{
				name: "Health & Beauty",
				category: ["Health", "Beauty"],
				image: "/assets/home/health&beauty.jpg",
				href: "/search?category=Health+Beauty",
			},
		],
	},
	{
		title: "Explore the Latest iPhone",
		items: [
			{
				name: "iPhone 12",
				category: ["Mobile"],
				image: "/assets/home/iphone-12.webp",
				href: "/search?query=iphone+12&category=Mobile",
				object_fit: "object-contain",
			},
		],
	},
	{
		title: "Entertainment Galore",
		items: [
			{
				name: "Gaming Consoles",
				category: ["Video_Game"],
				image: "/assets/home/consoles.jpg",
				href: "/search?category=Video_Game",
			},
			{
				name: "Smart TVs",
				category: ["TV"],
				image: "/assets/home/tv.jpg",
				href: "/search?category=TV",
			},
			{
				name: "Headphones",
				category: ["Music"],
				image: "/assets/home/headphones.avif",
				href: "/search?category=Music",
			},
			{
				name: "TWS",
				category: ["Music"],
				image: "/assets/home/headsets.png",
				href: "/search?category=Music",
				object_fit: "object-contain",
			},
		],
	},
	{
		title: "Books for Every Mood",
		items: [
			{
				name: "Bestseller Novel",
				category: ["Book"],
				image: "/assets/home/bestseller.webp",
				href: "/search?query=bestseller&category=Book",
			},
			{
				name: "Mystery Thriller",
				category: ["Book"],
				image: "/assets/home/mystery_thriller.jpg",
				href: "/search?query=mystery+thriller&category=Book",
			},
			{
				name: "Romantic Comedy",
				category: ["Book"],
				image: "/assets/home/romantic_comedy.jpg",
				href: "/search?query=romantic+comedy&category=Book",
			},
			{
				name: "Sci-Fi Fantasy",
				category: ["Book"],
				image: "/assets/home/sci_fi.png",
				href: "/search?query=sci+fi&category=Book",
			},
		],
	},
];

export const DESKTOP_CAROUSEL_IMAGES = [
	"/homeCarousel/hp1.jpg",
	"/homeCarousel/hp2.jpg",
	"/homeCarousel/hp3.jpg",
	"/homeCarousel/hp4.jpg",
	"/homeCarousel/hp5.jpg",
	"/homeCarousel/hp6.jpg",
	"/homeCarousel/hp7.jpg",
];

export const MOBILE_CAROUSEL_IMAGES = [
	"/homeCarousel/mobile/hp1.jpg",
	"/homeCarousel/mobile/hp2.jpg",
	"/homeCarousel/mobile/hp3.jpg",
	"/homeCarousel/mobile/hp4.jpg",
	"/homeCarousel/mobile/hp5.jpg",
	"/homeCarousel/mobile/hp6.jpg",
	"/homeCarousel/mobile/hp7.jpg",
];
