'use client'
import React from 'react'
import styles from './ProductDetailsClient.module.scss'
import priceFormat from '@/utils/priceFormat'

const ProductDetailsClient = () => {
  return (
    <main className={styles.product}>

        <div className={styles.gallery}>
            <div className={styles.content}>
                <div className={styles.imgwrap}>
                    {/* map 돌리기 */}
                    <div className={styles.item}>
                        <div className={styles.inner}>
                            <picture>
                                <source></source>
                                <img />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.info}>
            <div className={styles.content}>
                {/* div들 형제로 쭈우욱 나열 */}
                <div className={styles.header}>
                    <p className={styles.brand}>브랜드</p>
                    <p className={styles.name}>이름</p>
                    <div className={styles.price}>
                        <p className={styles.price}>
                            <span>{priceFormat(200000)}</span>
                        </p>
                        <p>
                            <span>{priceFormat(100000)}</span>
                            <span>쿠폰/할인가</span>
                        </p>
                    </div>
                    <div className={styles.subtitle}>asdlkfjas;ldkfjasdklfj;</div>
                </div>
                <div className={styles.delivery}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.tit}>배송비</span>
                            <span>30,000이상 구매시 무료(도서산간추가 3000원)</span>
                        </li>
                        <li>
                            <span className={styles.tit}>마일리지</span>
                            <span>최대 6% 적립</span>
                        </li>
                        <li>
                            <span className={styles.tit}>포인트</span>
                            <span>0.1% 적립</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
  )
}

export default ProductDetailsClient