"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@ui/carousel";
import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";

export function ImageCarousel({ images }: { images: string[] }) {
	return (
		<Carousel className="max-w-[400px]">
			<CarouselContent>
				{images.map((img, index) => (
					<CarouselItem className="w-[350px]" key={index}>
						<AspectRatio ratio={3 / 4}>
							<Image src={img} alt="" fill className="object-contain" />
						</AspectRatio>
					</CarouselItem>
				))}
			</CarouselContent>
			{images.length > 1 && (
				<>
					<CarouselPrevious className="absolute left-5 z-10 rounded-sm border-0 hover:bg-transparent focus:ring-2 focus:ring-black lg:size-10" />
					<CarouselNext className="absolute right-5 z-10 rounded-sm border-0 hover:bg-transparent focus:ring-2 focus:ring-black lg:size-10" />
				</>
			)}
		</Carousel>
	);
}
