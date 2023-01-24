import Image from "next/image";
import img0 from "../../public/assets/homeCarousel/hp1.jpg";
import img1 from "../../public/assets/homeCarousel/hp2.jpg";
import img2 from "../../public/assets/homeCarousel/hp3.jpg";
import img3 from "../../public/assets/homeCarousel/hp4.jpg";
import img4 from "../../public/assets/homeCarousel/hp5.png";
import img5 from "../../public/assets/homeCarousel/hp6.png";
import img6 from "../../public/assets/homeCarousel/hp7.jpg";
import { Carousel } from "antd";
export default function () {
  return (
    <Carousel dots={false} autoplay>
      <Image src={img0} alt="..." />
      <Image src={img1} alt="..." />
      <Image src={img2} alt="..." />
      <Image src={img3} alt="..." />
      <Image src={img4} alt="..." />
      <Image src={img5} alt="..." />
      <Image src={img6} alt="..." />
    </Carousel>
  );
}
