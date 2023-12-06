"use client";
import React, { useState } from "react";
import styles from "./ReviewSlider.module.scss";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";

// 스와이퍼 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';

interface IReviewSliderProps {
  sliderName?: string;
  title: string;
  subtitle: string;
  data: {
    imageURL: string;
    rate: number;
    review: string;
    reviewDate: string;
    userName: string;
    id: string;
  }[];
  slidesPerView?: string;
  [x: string]: any;
}

const ReviewSlider = ({ sliderName, title, subtitle, data, slidesPerView, ...restProps }: IReviewSliderProps) => {

  const [totalReview, setTotalReview] = useState(0);
  
  return (
    <div className={styles.reviewSlider}>
      {/* 타이틀 영역 */}
      <div className={styles.heading}>
        <div className={styles.title}>{title.toUpperCase()}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>

      <div className={styles.content}>

        <Swiper
          watchSlidesProgress={true}
          slidesPerView={5}
          breakpoints={{
            '320': {
              slidesPerView: 2,
            },
            '758': {
              slidesPerView: 5,
            },
          }}
          spaceBetween={15}
          freeMode={true}
        >

          {data.map((item, idx) => {
            const { id, rate, review, reviewDate, userName, imageURL } = item;

            return (
              <SwiperSlide key={idx} style={{width:'auto'}}>
                <Link href={`/product-details/${id}`}>
                  <div className={styles.border}>
                    <div className={styles.imgwrap}>
                      <figure>
                        <Image src={imageURL} alt="리뷰이미지" width={400} height={400} />
                      </figure>
                    </div>
                    <div className={styles.textwrap}>
                      <div className={styles.box1}>
                        <Rating size={17} initialValue={5} readonly />
                        <span className={styles.write}>{review}</span>
                        <span className={styles.date}>{reviewDate}</span>
                      </div>
                      <div className={styles.box2}>
                        <img src={imageURL} />
                        <div className={styles.info}>
                          <span>상품명 어쩌구 어쩌구</span>
                          <span>
                            리뷰 
                            3
                            {/* ({documents.length}) */}
                            ({rate})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
