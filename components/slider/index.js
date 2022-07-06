import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import Link from 'next/link';
import dataSlider from './slider.json';
SwiperCore.use([Autoplay, Pagination, Navigation]);
const Slider = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
      className="slider h-full md:h-100"
    >
      {dataSlider.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="slide-content">
            <img src={slide.gambar} />
            <div className="slide-item z-10 absolute text-left top-0 p-10 md:p-12 md:top-12 ">
              <h1 className="text-black font-bold text-xl slide-title md:text-7xl">
                {slide.title}
              </h1>
              <p className="slide-slogan text-xs md:text-xl">{slide.slogan}</p>
              <br />
              <Link href={slide.link}>
                <a className="slide-btn border-b-4 border-yellow-600 text-xs md:text-base">
                  SHOP NOW
                </a>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slider;
