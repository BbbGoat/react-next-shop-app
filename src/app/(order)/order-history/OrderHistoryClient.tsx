'use client'
import React, { useEffect } from 'react'
import styles from './OrderHistory.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

const OrderHistoryClient = () => {

  // 주문 데이터 받아오기
  const { data, isLoading } = useFetchCollection('orders');
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(()=>{
    // dispatch()
  }, [dispatch, data]);
  
  return (
    <div>OrderHistoryClient</div>
  )
}

export default OrderHistoryClient