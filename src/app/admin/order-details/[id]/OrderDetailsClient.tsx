'use client'
import React from 'react'
import styles from './OrderDetails.module.scss'
import { useParams } from 'next/navigation'
import useFetchDocument from '@/hooks/useFetchDocument'
import Heading from '@/components/heading/Heading'
import Loader from '@/components/loader/Loader'
import { IOrder, TCartItem } from '@/types'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat'
import ChangeOrderStatus from '@/components/changeOrderStatus/ChangeOrderStatus'

const OrderDetailsClient = () => {

  const {id} = useParams() as {id: string};
  const {document: order} = useFetchDocument('orders', id)
  
  return (
    <section className={styles.table}>
      <Heading title='주문 상세 정보' />
      {order === null ? (<Loader />) : (
        <>
          <div className={styles.details}>
            <p>
              <b>주문 아이디</b>
              {order.id}
            </p>
            <p>
              <b>주문 가격</b>
              {order.orderAmount}원
            </p>
            <p>
              <b>주문 상태</b>
              {order.orderStatus}
            </p>
            <p>
              <b>배송 주소</b>
              {order.shippingAddress.line}{" "}{order.shippingAddress.city}
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item: TCartItem, index: number)=> {
                const { id, name, salePrice, thumbnailURL, cartQuantity } = item;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p><b>{name}</b></p>
                      <Image src={thumbnailURL} alt={name} width={100} height={100} />
                    </td>
                    <td>{priceFormat(salePrice)}원</td>
                    <td>{cartQuantity}</td>
                    <td>{priceFormat(salePrice * cartQuantity)}원</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <ChangeOrderStatus order={order as IOrder} id={id} />
          
        </>
      )}

    </section>
  )
}

export default OrderDetailsClient