'use client'
import React, { useState } from 'react'
import styles from './ProductSlider.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';
import promotionImg from '@/assets/images/ban1.jpg';

// 스와이퍼 라이브러리
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';


const CustomSlider = ({
    sliderName,
    title,
    subtitle,
    data,
    slidesPerView,
    ...restProps
}) => {

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();
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
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.list}>

         
              <Swiper
                className={styles.listSwiper}
                modules={[Navigation, A11y]}
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
              })}
              </Swiper>
          


          
              <>
                <Swiper
                  className={styles.bannerSwiper}
                  modules={[Navigation, Pagination, A11y]}
                  slidesPerView={slidesPerView}
                  onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
                  onSwiper={(e)=>setSwiper(e)}
                >
                  { data.map((item, idx)=>{
                    const { imageURL, brand, name, price, discount, src  } = item;
                    const totalPrice = discount === undefined ? price 
                    : price - ((price * discount ) / 100)

                    return(
                      <SwiperSlide key={idx}>
                        {/* 메인이미지 */}
                        <Link href={'/'}>
                          <div className={styles.thumb}>
                            <Image src={promotionImg} alt={'메인이미지'} width={400} />
                          </div>
                        </Link>
                        {idx}
                        {/* 리스트 */}
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
                  })}
                </Swiper>
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
              </>
          
        </div>
      </div>
    </div>
  )
}

export default CustomSlider