'use client'
import React, { FormEvent, useState } from 'react'
import styles from './ReviewProduct.module.scss'
import Heading from '@/components/heading/Heading'
import { useParams, useRouter } from 'next/navigation'
import { Timestamp } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import Button from '@/components/button/Button'

const ReviewProductClient = () => {

  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');

  const router = useRouter();

  const { id } = useParams();
  // const userID = useSelector();
  // const userName = useSelector();

  const submitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewData = {
      // userID,
      // userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate()
    }

    // 트라이캐치문 넣어얗ㅁ
  }
    
  return (
    <section className={styles.review}>
        <Heading title='상품평 작성하기' />
        <div className={styles.name}>
          <p>
            <b>상품 이름:</b>
            {/* product.name */}
          </p>
          {/* <Image src={}/> */}
        </div>

        <div className={styles.card}>
          <form onSubmit={(e)=>submitReview(e)}>
            <label>평점:</label>
            <Rating 
              initialValue={rate}
              onClick={(rate)=>setRate(rate)}
            />
            <label>상품평</label>
            <textarea value={review} required onChange={(e)=>setReview(e.target.value)} cols={30} rows={10}></textarea>
            <Button type='submit'>
              상품평 작성하기
            </Button>
          </form>
        </div>
    </section>
  )
}

export default ReviewProductClient