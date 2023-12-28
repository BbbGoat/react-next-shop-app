'use client'
import React, { useEffect } from 'react'
import styles from './Dashboard.module.scss'
import Heading from '@/components/heading/Heading'
import InfoBox from '@/components/infoBox/InfoBox'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import Chart from '@/components/chart/Chart'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '@/hooks/useFetchCollection'
import { CALCULATE_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory, selectTotalOrderAmount } from '@/redux/slice/orderSlice'
import { STORE_PRODUCTS } from '@/redux/slice/productSlice'
import priceFormat from '@/utils/priceFormat'

const DashboardClient = () => {

    // 아이콘 모음
    const earningIcon = <AiFillDollarCircle size={30} color='rgb(0, 153, 255, 0.7)' />;
    const productIcon = <BsCart4 size={30} color='rgb(0, 153, 255, 0.7)' />;
    const ordersIcon = <FaCartArrowDown size={30} color='rgb(0, 153, 255, 0.7)' />;

    const dispatch = useDispatch();
    const products = useFetchCollection('products');
    const { data } = useFetchCollection('orders');

    const totalOrderAmount = useSelector(selectTotalOrderAmount);
    const orders = useSelector(selectOrderHistory);
    
    useEffect(()=>{
        dispatch(STORE_PRODUCTS({ products: products.data }))
        dispatch(STORE_ORDERS(data));
        dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
    }, [dispatch, data, products])
    
  return (
    <>
        <div className={styles.title}>
            <Heading title='관리자 대시보드' />
        </div>
        <div className={styles.dashboard}>
            <div className={styles.infoBox}>
                <InfoBox
                    cardClass={`${styles.card} ${styles.card1}`}
                    title={'수익'}
                    count={`${priceFormat(Number(totalOrderAmount))}원`}
                    icon={earningIcon}
                />
                <InfoBox 
                    cardClass={`${styles.card} ${styles.card2}`}
                    title={'총 상품'}
                    count={`${products.data.length}개`}
                    icon={productIcon}
                />
                <InfoBox 
                    cardClass={`${styles.card} ${styles.card3}`}
                    title={'총 주문건수'}
                    count={`${orders.length}건`}
                    icon={ordersIcon}
                />
            </div>
            <div>
                <Chart />
            </div>
        </div>
    </>
  )
}

export default DashboardClient