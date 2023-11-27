'use client'
import React, { useState, useCallback, useEffect } from 'react'
import styles from './Slider.module.scss'
import sliderData from './SliderData'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const intervalTime = 5000;
  
  const prevSlide = useCallback(() => {
    setCurrentSlide(
      // 슬라이드가 0이 되면 맨끝으로, 아닐경우 현재 슬라이드에서 -1
      currentSlide === 0 ? sliderLength -1 : currentSlide -1
    )
  }, [currentSlide, sliderLength]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      // 슬라이드가 맨 마지막일 경우 0으로, 아닐경우 현재 슬라이드에서 +1
      currentSlide === sliderLength -1 ? 0 : currentSlide +1
    )

  }, [currentSlide, sliderLength]);

  // 자동 슬라이드 등록
  // useEffect(()=>{
  //   const interval = setInterval(nextSlide, intervalTime);
  //   return ()=>(
  //     clearInterval(interval)
  //   )
  // }, [nextSlide]);
  
  return (
    <div className={styles.slider}>
      <FiChevronLeft className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide} />
      <FiChevronRight className={`${styles.arrow} ${styles.next}`} onClick={nextSlide} />

      {
        sliderData.map((item, idx)=>{
          const { image, heading, desc } = item
          return (
            <div
              key={heading}
              // className={idx === currentSlide ? `${styles.slide} ${styles.current}` : `${styles.slide}`}
              className={
                idx === currentSlide 
                ? `${styles.slide} ${styles.current}` 
                : idx < currentSlide ? `${styles.slide} ${styles.prev}`: `${styles.slide} ${styles.next}`}
            >
              {
                idx === currentSlide ? 
                <>
                  <Image src={`http://localhost:3000/${image}`} alt={heading} fill />
                  <h3>{heading}</h3>
                  <span>{desc}</span>
                </>
                : null
              }
            </div>
          )
        })
      }

    </div>
  )
}

export default Slider