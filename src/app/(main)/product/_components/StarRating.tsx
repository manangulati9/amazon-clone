"use client";
import { Rating } from "react-simple-star-rating";

export default function StarRating() {
	return (
		<Rating
			initialValue={4}
			readonly
			size={20}
			emptyStyle={{ display: "flex" }}
			fillStyle={{ display: "-webkit-inline-box" }}
		/>
	);
}
