'use client'
import React, { useState } from 'react'
import 'swiper/css/navigation';
import styles from './MainSlider.module.scss'
import Image from 'next/image'
import img from '@/assets/images/slider-img1.jpg'
import Link from 'next/link'

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
// 스와이퍼 CSS
import 'swiper/css';
import 'swiper/css/pagination';

interface IMainSliderProps {
  sliderData: {
    image: string;
    image2: string;
    name: string;
    heading: string;
    title: string;
    desc: string;
  }[];
}

const MainSlider = ({sliderData}: IMainSliderProps) => {

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const sliderLength = sliderData.length;
  

  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }
  
  return (
    <div className={styles.slider}>

      {/* 1. 스와이프 영역 */}
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
        {
          sliderData.map((data, idx)=>{
            const { image, image2, heading, title, desc, name } = data;
            return(
              <SwiperSlide key={idx}>
                <Link href={`/product-details/${name}`}>
                  <picture>
                    <source srcSet={image2} media='(min-width:1200px)'/>
                    <source srcSet={image} media='(min-width:960px)'/>
                    <img src={image2} alt={name} />
                  </picture>
                  <div className={styles.titWrap}>
                    <span>{heading.toUpperCase()}</span>
                    <div className={styles.titInner}>
                      <div className={styles.title}>
                        <strong>{title.toUpperCase()}</strong>
                      </div>
                      <div className={styles.description}>
                        <p>{desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })
        }
        
      </Swiper>
      
      {/* 2. 네비게이션(+페이지네이션) 영역 */}
      <div className={styles.navWrap}>
        <button onClick={handlePrev} className={`${styles.swiperBtn} ${styles.prevBtn}`}></button>
        <div className={styles.pagination}>
          <span>{swiperIndex + 1}</span>
          <span className={styles.divider}></span>
          <span>{sliderLength}</span>     
        </div>
        <button onClick={handleNext} className={`${styles.swiperBtn} ${styles.nextBtn}`}></button>
      </div>

    </div>
  )
}

export default MainSlider