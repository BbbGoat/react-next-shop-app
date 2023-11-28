'use client'
import React, { useEffect, useState } from 'react'
import 'swiper/css/navigation';
import styles from './Slider.module.scss'
import sliderData from './SliderData'
import Image from 'next/image'
import img from '@/assets/images/slider-img1.jpg'
import Link from 'next/link'

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
// 스와이퍼 CSS
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  // const [swiperRef, setSwiperRef] = useState(null);

  const sliderLength = sliderData.length;
  

  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }
  
  return (
    <div className={styles.slider}>

      <Swiper
        className={styles.mainSwiper}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        loop={true}
        speed={400}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
        onSwiper={(e) => {setSwiper(e)}}
      >
        <SwiperSlide>
          <Link href={'/'}>
            <Image src={img} alt='이미지' />

            <div className={styles.titWrap}>
              <span>PRE-ORDER</span>
              <div className={styles.titInner}>
                <div className={styles.title}>
                  <strong>타이틀 이름 이름</strong>
                </div>
                <div className={styles.description}>
                  <p>설명하는 내용 설명하는 내용 설명하는 내용asdfsadf</p>
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={'/'}>
            <Image src={img} alt='이미지' />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={'/'}>
            <Image src={img} alt='이미지' />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={'/'}>
            <Image src={img} alt='이미지' />
          </Link>
        </SwiperSlide>
      </Swiper>
      
      <div className={styles.navWrap}>
        <button onClick={handlePrev} className={`${styles.swiperBtn} ${styles.prevBtn}`}></button>
        <div className={styles.pagination}>
          <span>{swiperIndex + 1}</span>
          <span className={styles.divider}></span>
          <span>6</span>     
        </div>
        <button onClick={handleNext} className={`${styles.swiperBtn} ${styles.nextBtn}`}></button>
      </div>

    </div>
  )
}

export default Slider