import Image from "next/image";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
export default function () {
  const [screenWidth, setscreenWidth] = useState(0);
  useEffect(() => setscreenWidth(window.innerWidth), []);
  return (
    <Carousel dots={false} autoplay className="z-0">
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp1.jpg"
            : "/assets/homeCarousel/mobile/hp1.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp2.jpg"
            : "/assets/homeCarousel/mobile/hp2.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp3.jpg"
            : "/assets/homeCarousel/mobile/hp3.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp4.jpg"
            : "/assets/homeCarousel/mobile/hp4.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp5.jpg"
            : "/assets/homeCarousel/mobile/hp5.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp6.jpg"
            : "/assets/homeCarousel/mobile/hp6.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
      <Image
        src={
          screenWidth > 810
            ? "/assets/homeCarousel/hp7.jpg"
            : "/assets/homeCarousel/mobile/hp7.jpg"
        }
        alt="..."
        width={1500}
        height={570}
      />
    </Carousel>
  );
}
