'use client'
import React from 'react'
import styles from './ProductSlider.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';

// 스와이퍼 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
// 스와이퍼 CSS
// import 'swiper/css';
// import 'swiper/css/pagination';

interface IProductSliderProps {
    sliderName: string;
    title: string;
    subtitle?: string;
    data: {
      imageURL: string;
      brand: string;
      name: string;
      price: number;
      discount?: number;
      src: string;
    }[];
    slidesPerView?: number;
    [x: string]: any;
}

const ProductSlider = ({
    sliderName,
    title,
    subtitle,
    data,
    slidesPerView,
    ...restProps
}: IProductSliderProps) => {

  return (
    <div className={`${styles.slider} ${sliderName}`}>

      {/* 타이틀 영역 */}
      <div className={styles.heading}>
        <div className={styles.title}>{title.toUpperCase()}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.list}>
          <Swiper
            modules={[Navigation, A11y]}
            watchSlidesProgress={true}
            breakpoints={{
              '320': {
                  slidesPerView: 2,
                  },
              '540': {
                  slidesPerView: 3,
                  },
              '700': {
                  slidesPerView: 4,
                  },
              '860': {
                  slidesPerView: 5,
                  },
              '1200': {
                  slidesPerView: 7,
                  },
              '1540': {
                  slidesPerView: 9,
                  }
            }}
            spaceBetween={10}
            slidesPerView={slidesPerView}
          >
            { data.map((item, idx)=>{
              const { imageURL, brand, name, price, discount, src  } = item;
              const totalPrice = discount === undefined ? price 
              : price - ((price * discount ) / 100)

              return(
                <SwiperSlide key={idx}>
                  <div className={styles.item}>
                    <Link href={src}>
                      <div className={styles.thumb}>
                        <Image src={imageURL} alt={name} width={157} height={200}/>
                      </div>
                      <div className={styles.info}>
                        <div className={styles.brand}>{brand}</div>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.priceBox}>
                          <div className={styles.originPrice}>
                            {priceFormat(price)}
                          </div>
                          <div className={styles.salePrice}>
                            <span className={styles.discount}>{discount}%</span>
                            <span className={styles.totalPrice}>
                              {priceFormat(totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ProductSlider