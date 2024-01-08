'use client'
import React, { useEffect, useState } from 'react'
import styles from './ProductSlider.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';

// 스와이퍼 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import useFetchCollection from '@/hooks/useFetchCollection';
import { IProduct } from '@/types';
// 스와이퍼 CSS
// import 'swiper/css';
// import 'swiper/css/pagination';

interface IProductSliderProps {
    sliderName: string;
    title: string;
    subtitle?: string;
    slidesPerView?: number;
    [x: string]: any;
}

const ProductSlider = ({
    sliderName,
    title,
    subtitle,
    slidesPerView,
    ...restProps
}: IProductSliderProps) => {


  const { data: products } = useFetchCollection('products');
  const newArrivalsData = products.slice(0,12);

  return (
    <div className={`${styles.slider} ${sliderName}`}>

      {/* 타이틀 영역 */}
      <div className={styles.heading}>
        <div className={styles.title}>{title.toUpperCase()}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.container}>
        <div>
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
            { newArrivalsData.map((item: IProduct)=>{
              const { id, thumbnailURL, brand, name, originPrice, salePrice } = item;

              return(
                <SwiperSlide key={id}>
                  <div className={styles.item}>
                    <Link href={`/product-details/${id}`}>
                      <div className={styles.thumb}>
                        <Image src={thumbnailURL} alt={name} width={157} height={200} />
                      </div>
                      <div className={styles.info}>
                        <div className={styles.brand}>{brand.toUpperCase()}</div>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.priceBox}>
                          <div className={originPrice != salePrice ? styles.originPrice : styles.price}>
                            {originPrice != salePrice ? (
                              priceFormat(originPrice)
                            ) : (
                              <div style={{ color: "transparent" }}>-</div>
                            )}
                          </div>
                          <div className={styles.salePrice}>
                            <span className={styles.discount}>
                              {originPrice === salePrice ? null : (
                                <>{Math.round(Math.abs(((salePrice - originPrice) / originPrice) * 100))}%</>
                              )}
                            </span>
                            <span className={styles.totalPrice}>{priceFormat(salePrice)}</span>
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