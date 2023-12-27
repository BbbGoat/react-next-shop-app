'use client'
import React, { useEffect } from 'react'
import styles from './OrderHistory.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { STORE_ORDERS, selectOrderHistory } from '@/redux/slice/orderSlice'
import { selectUserId } from '@/redux/slice/authSlice'
import Loader from '@/components/loader/Loader'
import Heading from '@/components/heading/Heading'
import { table } from 'console'
import { formatTime } from '@/utils/dayjs'
import priceFormat from '@/utils/priceFormat'

const OrderHistoryClient = () => {

  // 주문 데이터 받아오기
  const { data, isLoading } = useFetchCollection('orders');
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(()=>{
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);
  const filteredOrders = orders.filter((order)=>order.userID === userID)

  const handleClick = (id: string) => {
    // 주문 상세페이지로 이동
    router.push(`/order-details/${id}`);
  }
  
  return (
    <section className={styles.order}>
      <Heading title='주문 목록' />
      {isLoading && <Loader />}
      <div className={styles.table}>
        {
          filteredOrders.length === 0 ? (
            <p>주문 목록이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>주문 날짜</th>
                  <th>주문 아이디</th>
                  <th>주문 금액</th>
                  <th>주문 상태</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredOrders.map((order, index)=>{
                    const { id, orderDate, orderTime, orderAmount, orderStatus } = order;
                    return ( 
                      <tr key={id} onClick={()=>handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>{formatTime(orderDate)}</td>
                        <td>{id}</td>
                        <td>{priceFormat(orderAmount)}원</td>
                        <td>
                          <p className={orderStatus !== "배송완료" 
                          ? `${styles.pending}`
                          : `${styles.delivered}`}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    </section>
  )
}

export default OrderHistoryClient