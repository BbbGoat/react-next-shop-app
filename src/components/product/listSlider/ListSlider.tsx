'use client'
import React, { useState } from 'react'
import styles from './ListSlider.module.scss'

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';
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

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();
  
  const sliderLength = data.length;
  
  return (
    <div className={`${styles.slider} ${sliderName}`}>

      {/* 타이틀 영역 */}
      <div className={styles.heading}>
        <div className={styles.title}>{title.toUpperCase()}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.listSwiperWrap}>
          {/* 리스트 슬라이드 */}
          <Swiper
              modules={[Grid, Pagination]}
              // slidesPerView={3}
              grid={{
                rows: 2,
                fill: "row",
              }}
              slidesPerView={'auto'}
              spaceBetween={15}
              // freeMode={true}
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