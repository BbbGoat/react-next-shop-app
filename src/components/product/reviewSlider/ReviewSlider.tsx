'use client'
import React from 'react'
import styles from './ReviewSlider.module.scss'
import Link from 'next/link';

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

const ReviewSlider = ({
    sliderName,
    title,
    subtitle,
    data,
    slidesPerView,
    ...restProps
}: IReviewSliderProps) => {

  return (
    <div className={`${styles.slider} ${sliderName}`}>

        {/* 타이틀 영역 */}
        <div className={styles.heading}>
            <div className={styles.title}>{title.toUpperCase()}</div>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>

        {
            data.map((item)=>{
                const { id, rate, review, reviewDate, userName } = item;

                return(
                    <>
                        <Link href={`/product-details/${id}`}>
                            {/* Rating 라이브러리 쓰기 */}
                            <span>{review}</span>
                        </Link>
                    </>
                )
            })
        }
    </div>
  )
}

export default ReviewSlider