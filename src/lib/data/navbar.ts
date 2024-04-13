import { type ProductCategory } from "@prisma/client";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
	{ value: "Mobile", label: "Mobile" },
	{ value: "Computer", label: "Computer" },
	{ value: "TV", label: "TV" },
	{ value: "Appliance", label: "Appliance" },
	{ value: "Electronic", label: "Electronic" },
	{ value: "Mens_Fashion", label: "Mens Fashion" },
	{ value: "Womens_Fashion", label: "Womens Fashion" },
	{ value: "Home", label: "Home" },
	{ value: "Kitchen", label: "Kitchen" },
	{ value: "Pet", label: "Pet" },
	{ value: "Beauty", label: "Beauty" },
	{ value: "Health", label: "Health" },
	{ value: "Grocery", label: "Grocery" },
	{ value: "Sports", label: "Sports" },
	{ value: "Fitness", label: "Fitness" },
	{ value: "Bag", label: "Bag" },
	{ value: "Luggage", label: "Luggage" },
	{ value: "Toy", label: "Toy" },
	{ value: "Baby_Product", label: "Baby Product" },
	{ value: "Kids_Fashion", label: "Kids Fashion" },
	{ value: "Car", label: "Car" },
	{ value: "Motorbike", label: "Motorbike" },
	{ value: "Industrial", label: "Industrial" },
	{ value: "Book", label: "Book" },
	{ value: "Movie", label: "Movie" },
	{ value: "Music", label: "Music" },
	{ value: "Video_Game", label: "Video Game" },
];

export const NAVBAR_ITEMS = [
	"Amazon miniTV",
	"Sell",
	"Best Sellers",
	"Mobiles",
	"Today's Deals",
	"Customer Service",
	"Electronics",
	"Prime",
	"Fashion",
	"Amazon Pay",
	"Home & Kitchen",
	"New Releases",
	"Computers",
	"Beauty & Personal Care",
	"Books",
];

export const LANGUAGE_OPTIONS = [
	{ value: "english", label: "English" },
	{ value: "hindi", label: "Hindi" },
	{ value: "bengali", label: "Bengali" },
	{ value: "malayalam", label: "Malayalam" },
	{ value: "telugu", label: "Telugu" },
];

export const POPOVER_LINK_ITEMS = {
	SELLER: [
		{
			title: "Your lists",
			items: [
				{ label: "Create a List", href: "#" },
				{
					label: "Your Wishlist",
					href: "#",
				},
				{ label: "Find a list", href: "#" },
			],
		},
		{
			title: "Your account",
			items: [
				{ label: "Your Products", href: "/dashboard/seller" },
				{ label: "Your Products", href: "/dashboard/seller" },
				{ label: "Your Products", href: "/dashboard/seller" },
			],
		},
	],

	CUSTOMER: [
		{
			title: "Your lists",
			items: [
				{ label: "Create a List", href: "#" },
				{
					label: "Your Wishlist",
					href: "#",
				},
				{ label: "Find a list", href: "#" },
			],
		},
		{
			title: "Your account",
			items: [
				{ label: "Your Orders", href: "/dashboard/customer/orders" },
				{ label: "Your Profile", href: "/dashboard/customer/profile" },
				{ label: "Your Orders", href: "/dashboard/customer/orders" },
			],
		},
	],
};
