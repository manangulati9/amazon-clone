await import("./src/env.js");

const config = {
	reactStrictMode: true,
	images: {
		remotePatterns: [{ hostname: "gtsqetcjzlgmnjxsbmns.supabase.co" }],
		formats: ["image/avif", "image/webp"],
	},
};

export default config;
