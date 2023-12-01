'use client'
import React, { useState } from 'react'
import styles from './CustomSlider.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Controller, EffectFlip } from 'swiper/modules';

import 'swiper/css/effect-fade';

interface ICustomSliderProps {
    sliderName: string;
    title: string;
    subtitle?: string;
    data: {
        thumb: string;
        list: {
            imageURL: string;
            brand: string;
            name: string;
            price: number;
            discount?: number;
            src: string;
        }[]
    }[];
    slidesPerView?: number;
    [x: string]: any;
}

const CustomSlider = ({
    sliderName,
    title,
    subtitle,
    data,
    slidesPerView,
    ...restProps
}: ICustomSliderProps) => {

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass>();
  
  const sliderLength = data.length;

  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  return (
    <div className={`${styles.slider} ${sliderName}`}>

      {/* 타이틀 영역 */}
      <div className={styles.heading}>
        <div className={styles.title}>{title.toUpperCase()}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.thumbSwiperWrap}>
            {/* 메인이미지 슬라이드 */}
            <Swiper
                modules={[Navigation, Pagination, Controller, A11y, EffectFlip]}
                controller={{ control: controlledSwiper }}
                slidesPerView={slidesPerView}
                onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
                onSwiper={(e)=>setSwiper(e)}
            >
                { data.map((item, idx)=>{

                return(
                    <SwiperSlide key={idx}>
                        {/* 메인이미지 */}
                        <Link href={'/'}>
                            <div className={styles.thumb}>
                                <Image src={item.thumb} alt={'메인이미지'} priority width={500} height={420}/>
                            </div>
                        </Link>
                    </SwiperSlide>
                )
                })}

                {/* 네비게이션(+페이지네이션) 영역 */}
                <div className={styles.navWrap}>
                    <button onClick={handlePrev} className={`${styles.swiperBtn} ${styles.prevBtn}`}></button>
                    <div className={styles.pagination}>
                        <span>{swiperIndex + 1}</span>
                        <span className={styles.divider}></span>
                        <span>{sliderLength}</span>     
                    </div>
                    <button onClick={handleNext} className={`${styles.swiperBtn} ${styles.nextBtn}`}></button>
                </div>
            </Swiper>
        </div>

        <div className={styles.listSwiperWrap}>
            {/* 리스트 슬라이드 */}
            <Swiper
                modules={[Navigation, Pagination, Controller, A11y, EffectFlip]}
                slidesPerView={3}
                slidesPerGroup={3}
                spaceBetween={10}
                onSwiper={(e)=>setControlledSwiper(e)}
                allowTouchMove={false}
            >
                {
                    data.map((item)=>
                        <>
                        {item.list.map((list,idx)=>{
                            const { imageURL, brand, name, price, discount, src } = list
                            const totalPrice = discount === undefined ? price 
                            : price - ((price * discount ) / 100)

                            return(
                                <SwiperSlide key={idx}>
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
                        })}
                        </> 
                    )
                }
            </Swiper>
        </div>
      </div>
    </div>
  )
}

export default CustomSlider