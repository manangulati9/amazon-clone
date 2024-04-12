import { ProductCategory } from "@prisma/client";

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
		title: "Deals in PCs",
		items: [
			{
				category: [ProductCategory.Computer],
				image: "/assets/home/gaming_pc.webp",
				href: "/search?query=gaming+pc",
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
				href: "/search?query=dining",
			},
			{
				name: "Home",
				category: [ProductCategory.Home],
				image: "/assets/home/home.jpg",
				href: "/search?query=home",
			},
			{
				name: "Kitchen",
				category: [ProductCategory.Kitchen],
				image: "/assets/home/kitchen.webp",
				href: "/search?query=kitchen",
			},
			{
				name: "Health & Beauty",
				category: [ProductCategory.Health, ProductCategory.Beauty],
				image: "/assets/home/health&beauty.jpg",
				href: "/search?query=health+beauty",
			},
		],
	},
	{
		title: "Explore the Latest iPhone",
		items: [
			{
				name: "iPhone 12",
				category: [ProductCategory.Mobile],
				image: "/assets/home/iphone-12.webp",
				href: `/search?query=iphone+12+${ProductCategory.Mobile}`,
				object_fit: "object-contain",
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
				href: "/search?query=consoles",
			},
			{
				name: "Smart TVs",
				category: [ProductCategory.TV],
				image: "/assets/home/tv.jpg",
				href: "/search?query=tv",
			},
			{
				name: "Headphones",
				category: [ProductCategory.Electronic],
				image: "/assets/home/headphones.avif",
				href: "/search?query=headphones",
			},
			{
				name: "TWS",
				category: [ProductCategory.Music],
				image: "/assets/home/headsets.png",
				href: "/search?query=headsets",
				object_fit: "object-contain",
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
				href: `/search?query=bestseller+${ProductCategory.Book}`,
			},
			{
				name: "Mystery Thriller",
				category: [ProductCategory.Book],
				image: "/assets/home/mystery_thriller.jpg",
				href: `/search?query=mystery+thriller+${ProductCategory.Book}`,
			},
			{
				name: "Romantic Comedy",
				category: [ProductCategory.Book],
				image: "/assets/home/romantic_comedy.jpg",
				href: `/search?query=romantic+comedy+${ProductCategory.Book}`,
			},
			{
				name: "Sci-Fi Fantasy",
				category: [ProductCategory.Book],
				image: "/assets/home/sci_fi.png",
				href: `/search?query=sci+fi+${ProductCategory.Book}`,
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
