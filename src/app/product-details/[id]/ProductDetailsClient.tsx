'use client'
import React, { ButtonHTMLAttributes, ChangeEvent, ReactElement, useState } from 'react'
import styles from './ProductDetailsClient.module.scss'
import priceFormat from '@/utils/priceFormat'
import Button from '@/components/button/Button'
import ProductReviewItem from '@/components/product/productReviewItem/ProductReviewItem'

const ProductDetailsClient = () => {

    const [count, setCount] = useState(1);
    const [className, setClassName] = useState('상품상세정보');

    const addToCart = () => {
        
    }

    // const handleClick = (e: ChangeEvent<HTMLButtonElement>) => {
    //     setClassName(e.target.value)
    // }
    
    // 임시 더미 데이터
    const reviews: any[] = [];
    
  return (
    <main className={styles.product}>
        <div className={styles.section1}>

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
                        <p>옵션 선택</p>
                        <div className={styles.imgWrap}>
                            <div className={styles.optionList}>
                                <img src="" alt="추천아이템" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.countBox}>
                        <div className={styles.titleWrap}>
                            <p className={styles.tit}>합계</p>
                            <p className={styles.totalAmount}>{priceFormat(10000 * count) }원</p>
                        </div>
                        <div className={styles.countBtn}>
                            <button
                                className={styles.mimus}
                                onClick={() => setCount((prev) => prev -1)}
                                disabled={count > 1 ? false : true}
                            >
                                -
                            </button>
                            <p><b>{priceFormat(count)}</b></p>
                            <button
                                className={styles.plus}
                                onClick={() => setCount((next) => next +1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.btnBox}>
                        <Button width='50%' secondary
                            onClick={()=>addToCart()}
                        >
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
        <div className={styles.section2}>
            <div className={styles.tab_menu}>
                <ul className={styles.tab_nav}>
                    <li className={className === '상품상세정보' ? styles.on : ''}>
                        <button onClick={()=>setClassName('상품상세정보')}>상품상세정보</button>
                    </li>
                    <li className={className === '리뷰' ? styles.on : ''}>
                        <button onClick={()=>setClassName('리뷰')}>리뷰</button>
                    </li>
                    <li className={className === 'QnA' ? styles.on : ''}>
                        <button onClick={()=>setClassName('QnA')}>QnA</button>
                    </li>
                </ul>
            </div>
            {/* 리뷰시스템 */}
            <div id='one' className={styles.first}>
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
            </div>
            <div id='two' className={styles.second}>
                두번째 박스
            </div>
            <div id="thr" className={styles.third}>
                세번째 박스
            </div>

        </div>
    </main>
  )
}

export default ProductDetailsClient