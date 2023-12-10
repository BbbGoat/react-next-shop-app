'use client'
import React, { useState } from 'react'
import styles from './ProductDetailsClient.module.scss'
import priceFormat from '@/utils/priceFormat'
import Button from '@/components/button/Button'
import ProductReviewItem from '@/components/product/productReviewItem/ProductReviewItem'

const ProductDetailsClient = () => {

    const [count, setCount] = useState(1);
    
    // 임시 더미 데이터
    const reviews: any[] = [];
    
  return (
    <main className={styles.product}>
        <div className={styles.wrapper}>

            <div className={styles.gallery}>
                <div className={styles.content}>
                    <div className={styles.imgWrap}>
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
                        <p className={styles.name}>[앤드세일][MEN] 23FW RED ADC LOGO WOOL CREWNECK SWEATER BLACK BFUKS006.018 009</p>
                        <div className={styles.price}>
                            <p className={styles.originPrice}>
                                <span>{priceFormat(200000)}</span>
                            </p>
                            <p className={styles.totalPrice}>
                                <span>{priceFormat(100000)}</span>
                                <span className={styles.percent}>% OFF</span>
                            </p>
                        </div>
                    </div>

                    <div className={styles.optionBox}>
                        <p>옵션을 선택하세요:</p>
                        <div className={styles.imgWrap}>
                            <div className={styles.optionList}>
                                <img src="" alt="추천아이템" />
                            </div>
                        </div>
                    </div>

                    {/* !!! 여기 수량 시스템 추가 !!! */}
                    <div>
                        {/* - + 버튼 / totalAmount */}
                        
                        <p className={styles.price}>{priceFormat(10000 * count) }원</p>
                        <div className={styles.count}>
                            <Button
                                onClick={() => setCount((prev) => prev -1)}
                                disabled={count > 1 ? false : true}
                                secondary
                            >
                                -
                            </Button>
                            <p><b>{priceFormat(count)}</b></p>
                            <Button
                                onClick={() => setCount((next) => next +1)}
                                secondary
                            >
                                +
                            </Button>
                        </div>
                    </div>
                    
                    <div className={styles.btnBox}>
                        <Button width='50%' secondary>
                            장바구니
                        </Button>
                        <Button width='50%'>
                            바로구매
                        </Button>
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

        </div>
        <div className={styles.container}>
            {/* 리뷰시스템 */}
            <h3>상품평</h3>

            <div>
                {
                    reviews.length === 0 ? (
                        <p className={styles.noReviewText}>해당 상품에 대한 상품평이 아직 없습니다.</p> ) :
                    (
                        <>
                         {reviews.map((item) => {
                            return (
                                <ProductReviewItem 
                                    key={item.id}
                                    rate={item.rate}
                                    review={item.review}
                                    reviewDate={item.reviewDate}
                                    userName={item.userName}
                                />
                            )
                         })}
                        </>
                    )
                }
            </div>
            
            <div className={styles.dummy}></div>
        </div>
    </main>
  )
}

export default ProductDetailsClient