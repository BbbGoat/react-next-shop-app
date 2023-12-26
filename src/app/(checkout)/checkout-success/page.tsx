import Heading from '@/components/heading/Heading'
import React from 'react'
import styles from './CheckoutSuccess.module.scss'
import Button from '@/components/button/Button'
import Link from 'next/link'

// 결제 성공시 결제정보 요약 페이지
const CheckoutSuccess = () => {
  return (
    <section className={styles.success}>
      <Heading title='결제 성공' />
      <ul className={styles.list}>
        <li><b>결제 상품:</b></li>
        <li><b>주문 번호:</b></li>
        <li><b>카드 번호:</b></li>
        <li><b>결제 금액:</b></li>
        <li><b>결제 승인 날짜:</b>{" "}{}원</li>
      </ul>
      <Button>
        <Link href={'/order-history'}>주문 상태 보기</Link>
      </Button>
    </section>
  )
}

export default CheckoutSuccess