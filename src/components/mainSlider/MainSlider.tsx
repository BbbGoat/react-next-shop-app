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

interface ISliderProps {
  sliderData: {
    image: string;
    name: string;
    heading: string;
    title: string;
    desc: string;
  }[];
}

const Slider = ({sliderData}: ISliderProps) => {

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
            const { image, heading, title, desc, name } = data;
            return(
              <SwiperSlide key={idx}>
                <Link href={`/product-details/${name}`}>
                  {/* !!!이미지 주소 배포시 수정해야함!!! */}
                  <Image src={img} alt={name} />
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

export default Slider