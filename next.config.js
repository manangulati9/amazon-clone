await import("./src/env.js");

const config = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ hostname: "gtsqetcjzlgmnjxsbmns.supabase.co" },
			{ hostname: "lh3.googleusercontent.com" },
		],

		formats: ["image/avif", "image/webp"],
	},
};
export default config;
