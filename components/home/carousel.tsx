import Image from "next/image";
import img0 from "../../public/assets/homeCarousel/hp1.jpg";
import img1 from "../../public/assets/homeCarousel/hp2.jpg";
import img2 from "../../public/assets/homeCarousel/hp3.jpg";
import img3 from "../../public/assets/homeCarousel/hp4.jpg";
import img4 from "../../public/assets/homeCarousel/hp5.png";
import img5 from "../../public/assets/homeCarousel/hp6.png";
import img6 from "../../public/assets/homeCarousel/hp7.jpg";
export default function () {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide absolute"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <Image src={img0} className="block w-full" alt="..." />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image src={img1} className="block w-full" alt="..." />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image src={img2} className="block w-full" alt="..." />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image src={img3} className="block w-full" alt="..." />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image src={img4} className="block w-full" alt="..." />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image src={img5} className="block w-full" alt="..." />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image src={img6} className="block w-full" alt="..." />
          </div>
        </div>
        <div className="flex justify-between xl:-inset-y-[38rem] sm:-inset-y-[22rem] -inset-y-32 relative">
          <button
            className="carousel-control-prev  top-0 flex items-center justify-center p-0 text-center border-0 hover:no-underline right-0 w-20 focus:outline outline-[3px] outline-white rounded lg:h-60 h-10 sm:h-30 md:h-40 mt-1 mx-1 left-0"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next  top-0 flex items-center justify-center p-0 text-center border-0 hover:no-underline right-0 w-20 focus:outline outline-[3px] outline-white rounded lg:h-60 h-10 sm:h-30 md:h-40 mt-1 mx-1"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
