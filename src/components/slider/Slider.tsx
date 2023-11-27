'use client'
import React, { useState } from 'react'
import 'swiper/css/navigation';
import styles from './Slider.module.scss'
import sliderData from './SliderData'
import Image from 'next/image'
import img from '@/assets/images/slider-img1.jpg'

// 스와이퍼 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
// 스와이퍼 CSS
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  
  return (
    <div className={styles.slider}>

      <Swiper
        className={styles.mySwiper}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        // pagination={{clickable: true}}
        pagination={{
          type: 'fraction',
        }}
        onSlideChange={()=>console.log('slide chnage')}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

    </div>
  )
}

export default Slider