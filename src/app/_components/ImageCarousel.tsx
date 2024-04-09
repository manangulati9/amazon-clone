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
import {
  DESKTOP_CAROUSEL_IMAGES,
  MOBILE_CAROUSEL_IMAGES,
} from "@/lib/data/home-page";
import Autoplay from "embla-carousel-autoplay";

export function ImageCarousel() {
  return (
    <>
      {/* Desktop Carousel */}
      <Carousel
        className="hidden relative w-full lg:block"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{ loop: true }}
      >
        <CarouselContent className="">
          {DESKTOP_CAROUSEL_IMAGES.map((img, index) => (
            <CarouselItem key={index}>
              <div className="">
                <AspectRatio ratio={16 / 7}>
                  <Image src={img} alt="" fill className="object-cover" />
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5 top-1/3 z-10 bg-transparent rounded-sm border-0 hover:bg-transparent focus:ring-2 focus:ring-black" />
        <CarouselNext className="absolute right-5 top-1/3 z-10 bg-transparent rounded-sm border-0 hover:bg-transparent focus:ring-2 focus:ring-black" />
      </Carousel>

      {/* Mobile Carousel */}
      <Carousel
        className="block relative w-full lg:hidden"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {MOBILE_CAROUSEL_IMAGES.map((img, index) => (
            <CarouselItem key={index}>
              <div className="">
                <AspectRatio ratio={16 / 7}>
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1 z-10 rounded-sm" />
        <CarouselNext className="absolute right-1 z-10 rounded-sm" />
      </Carousel>
    </>
  );
}
