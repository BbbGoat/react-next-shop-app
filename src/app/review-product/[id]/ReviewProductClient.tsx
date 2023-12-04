'use client'
import React, { FormEvent, useState } from 'react'
import styles from './ReviewProduct.module.scss'
import Heading from '@/components/heading/Heading'
import { useParams, useRouter } from 'next/navigation'

const ReviewProductClient = () => {

    const [rate, setRate] = useState(0);
    const [review, setReview] = useState('');

    const router = useRouter();

    const { id } = useParams();

    const submitReview = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const today = new Date();
        const date = today.toDateString();
        const reviewData = {
        }
    }
    
  return (
    <section className={styles.review}>
        <Heading title='상품평 작성하기' />
        
    </section>
  )
}

export default ReviewProductClient