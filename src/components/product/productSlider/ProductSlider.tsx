'use client'
import React from 'react'
import styles from './ProductSlider.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

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
    [x: string]: any;
}

const ProductSlider = ({
    sliderName,
    title,
    subtitle,
    data,
    ...restProps
}: IProductSliderProps) => {

  return (
    <div className={`${styles.slider} ${sliderName}`}>

      <div className={styles.heading}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.list}>

          <Swiper
            className={styles.subSwiper}
            modules={[Navigation, A11y]}
            slidesPerView={4}
          >
          {
            data.map((item, idx)=>{
              const { imageURL, brand, name, price, discount, src  } = item;
              const totalPrice = discount === undefined ? price 
              : price - ((price * discount ) / 100)

              return(
                <SwiperSlide key={idx}>
                  <div className={styles.item}>
                    <Link href={src}>
                      <div className={styles.thumb}>
                        <Image src={imageURL} alt={name} />
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
            })
          }
          </Swiper>
        </div>
      </div>

      {/* 네비게이션 */}
    </div>
  )
}

export default ProductSlider