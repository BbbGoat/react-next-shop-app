'use client'
import React, { useState } from 'react'
import styles from './ListSlider.module.scss'

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';


interface IListSliderProps {
  sliderName?: string;
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

const ListSlider = ({
  sliderName,
  title,
  subtitle,
  data,
  slidesPerView,
  ...restProps
}: IListSliderProps) => {

  
  return (
    <div className={`${styles.slider} ${sliderName}`}>

      {/* 1. PC 노출 컴포넌트 */}
      {/* 
        => 위 3줄 아래 3줄 grid로 구성
      */}

      <div className={styles.desktopSwiper}>
        {/* 타이틀 영역 */}
        <div className={styles.heading}>
          <div className={styles.title}>{title.toUpperCase()}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
        
        <div className={styles.container}>
          {/* 리스트 슬라이드 */}
          <div className={styles.gridbox}>
            {
              data.map((item, idx)=>{
                const { imageURL, brand, name, price, discount, src } = item
                const totalPrice = discount === undefined ? price 
                : price - ((price * discount ) / 100)

                return(
                  <SwiperSlide key={idx} style={{width: 'auto'}}>
                    <div className={styles.item}>
                        <Link href={src}>
                            <div className={styles.thumb}>
                                <Image src={imageURL} alt={name} width={157} height={200} />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.brand}>{brand.toUpperCase()}</div>
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
          </div>
        </div>
      </div>


      {/* 2. mobile 노출 컴포넌트 */}
      {/* 
        => 모바일용은 Swiper 슬라이드 사용.
        사이즈는 CustomSlider 하단 슬라이드와 동일하도록 설정
        기본 설정은 display: none
        미디어쿼리로 모바일 진입시 display: block
      */}

      <div className={styles.mobileSwiper}>
        {/* 타이틀 영역 */}
        <div className={styles.heading}>
          <div className={styles.title}>{title.toUpperCase()}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>

        <div className={styles.container}>
          {/* 리스트 슬라이드 */}
          <Swiper
              modules={[Pagination]}
              slidesPerView={'auto'}
              spaceBetween={15}
              freeMode={true}
          >
            {
              data.map((item, idx)=>{
                const { imageURL, brand, name, price, discount, src } = item
                const totalPrice = discount === undefined ? price 
                : price - ((price * discount ) / 100)

                return(
                  <SwiperSlide key={idx} style={{width: 'auto'}}>
                    <div className={styles.item}>
                        <Link href={src}>
                            <div className={styles.thumb}>
                                <Image src={imageURL} alt={name} width={157} height={200} />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.brand}>{brand.toUpperCase()}</div>
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

    </div>
  )
}

export default ListSlider