import Heading from '@/components/heading/Heading'
import React from 'react'
import styles from './CheckoutSuccess.module.scss'
import Button from '@/components/button/Button'
import Link from 'next/link'
import priceFormat from '@/utils/priceFormat'
import { formatTime } from '@/utils/dayjs'

interface ICheckoutSuccessProps {
  searchParams: {
    orderId: string;
  }
}

interface IPayment {
  orderName: string;
  orderId: string;
  approvedAt: string;
  card: {
    number: number;
    amount: number;
  }
}

// 결제 성공시 결제정보 요약 페이지
const CheckoutSuccess = async ({ searchParams }: ICheckoutSuccessProps) => {

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const payment: IPayment = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json"
    }
  }).then((res)=>{
    return res.json()
  })

  console.log('payment:', payment);

  const { card } = payment;
  
  return (
    <section className={styles.success}>
      <Heading title='결제 성공' />
      <ul className={styles.list}>
        <li><b>결제 상품:</b>{payment.orderName}</li>
        <li><b>주문 번호:</b>{payment.orderId}</li>
        <li><b>카드 번호:</b>{card.number}</li>
        <li><b>결제 금액:</b>{priceFormat(card.amount)}원</li>
        <li><b>결제 승인 날짜:</b>{" "}{formatTime(payment.approvedAt)}</li>
      </ul>
      <Button>
        <Link href={'/order-history'}>주문 상태 보기</Link>
      </Button>
    </section>
  )
}

export default CheckoutSuccess