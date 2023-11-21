'use client'
import React from 'react'
import styles from './Dashboard.module.scss'
import Heading from '@/components/heading/Heading'
import InfoBox from '@/components/infoBox/InfoBox'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import Chart from '@/components/chart/Chart'

const DashboardClient = () => {

    // 아이콘 모음
    const earningIcon = <AiFillDollarCircle size={30} color='#b624ff' />;
    const productIcon = <BsCart4 size={30} color='#1f93ff' />;
    const ordersIcon = <FaCartArrowDown size={30} color='#4385F4' />;
    
  return (
    <div className={styles.home}>
        <Heading title='관리자 대시보드' />
        <div className={styles.infoBox}>
            <InfoBox
                cardClass={`${styles.card} ${styles.card1}`}
                title={'수익'}
                count={`원`}
                icon={earningIcon}
            />
            <InfoBox 
                cardClass={`${styles.card} ${styles.card2}`}
                title={'총 상품'}
                count={`개`}
                icon={productIcon}
            />
            <InfoBox 
                cardClass={`${styles.card} ${styles.card3}`}
                title={'총 주문건수'}
                count={`건`}
                icon={ordersIcon}
            />
        </div>
        <div>
            <Chart />
        </div>
    </div>
  )
}

export default DashboardClient