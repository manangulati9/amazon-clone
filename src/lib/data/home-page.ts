import { ProductCategory } from "@prisma/client";

export type TItemDetails = {
	name?: string;
	category: ProductCategory[];
	image: string;
};

export type TCardItem = {
	title: string;
	items: TItemDetails[];
};

export const CARD_GROUP: TCardItem[] = [
	{
		title: "Deals in PCs",
		items: [
			{
				category: [ProductCategory.Computer],
				image: "/assets/home/gaming_pc.jpg",
			},
		],
	},
	{
		title: "Refresh your space",
		items: [
			{
				name: "Dining",
				category: [ProductCategory.Kitchen],
				image: "/assets/home/dining.jpg",
			},
			{
				name: "Home",
				category: [ProductCategory.Home],
				image: "/assets/home/home.jpg",
			},
			{
				name: "Kitchen",
				category: [ProductCategory.Kitchen],
				image: "/assets/home/kitchen.jpg",
			},
			{
				name: "Health & Beauty",
				category: [ProductCategory.Health, ProductCategory.Beauty],
				image: "/assets/home/health&beauty.jpg",
			},
		],
	},
	{
		title: "Explore the Latest iPhone",
		items: [
			{
				category: [ProductCategory.Mobile],
				image: "/assets/home/iphone_13.png",
			},
		],
	},
	{
		title: "Entertainment Galore",
		items: [
			{
				name: "Gaming Consoles",
				category: [ProductCategory.Video_Game],
				image: "/assets/home/consoles.jpg",
			},
			{
				name: "Smart TVs",
				category: [ProductCategory.TV],
				image: "/assets/home/tv.jpg",
			},
			{
				name: "Wireless Headphones",
				category: [ProductCategory.Electronic],
				image: "/assets/home/headphones.jpg",
			},
			{
				name: "Headsets",
				category: [ProductCategory.Music],
				image: "/assets/home/headsets.jpeg",
			},
		],
	},
	{
		title: "Books for Every Mood",
		items: [
			{
				name: "Bestseller Novel",
				category: [ProductCategory.Book],
				image: "/assets/home/bestseller.webp",
			},
			{
				name: "Mystery Thriller",
				category: [ProductCategory.Book],
				image: "/assets/home/mystery_thriller.jpg",
			},
			{
				name: "Romantic Comedy",
				category: [ProductCategory.Book],
				image: "/assets/home/romantic_comedy.jpg",
			},
			{
				name: "Sci-Fi Fantasy",
				category: [ProductCategory.Book],
				image: "/assets/home/sci_fi.png",
			},
		],
	},
];

export const DESKTOP_CAROUSEL_IMAGES = [
	"/assets/homeCarousel/hp1.jpg",
	"/assets/homeCarousel/hp2.jpg",
	"/assets/homeCarousel/hp3.jpg",
	"/assets/homeCarousel/hp4.jpg",
	"/assets/homeCarousel/hp5.jpg",
	"/assets/homeCarousel/hp6.jpg",
	"/assets/homeCarousel/hp7.jpg",
];

export const MOBILE_CAROUSEL_IMAGES = [
	"/assets/homeCarousel/mobile/hp1.jpg",
	"/assets/homeCarousel/mobile/hp2.jpg",
	"/assets/homeCarousel/mobile/hp3.jpg",
	"/assets/homeCarousel/mobile/hp4.jpg",
	"/assets/homeCarousel/mobile/hp5.jpg",
	"/assets/homeCarousel/mobile/hp6.jpg",
	"/assets/homeCarousel/mobile/hp7.jpg",
];
