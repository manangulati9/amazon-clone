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

export const POPOVER_LINK_ITEMS = [
	{
		title: "Your lists",
		items: [
			{ label: "Create a List", href: "/dashboard/wishlist?create-list=true" },
			{ label: "Find a list or registry", href: "#" },
		],
	},
	{
		title: "Your account",
		items: [
			{ label: "Account", href: "/dashboard" },
			{ label: "Orders", href: "/dashboard/orders" },
			{ label: "Wishlist", href: "/dashboard/wishlist" },
			{ label: "Recommendations", href: "#" },
			{ label: "Prime Membership", href: "#" },
		],
	},
];
