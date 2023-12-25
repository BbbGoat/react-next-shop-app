'use client'
import React, { useEffect } from 'react'
import styles from './CheckoutForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { CALCULATE_TOTAL_AMOUNT, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '@/redux/slice/cartSlice'
import Link from 'next/link'
import priceFormat from '@/utils/priceFormat'

// 카트 정보 가져와서 세팅하는 컴포넌트
const CheckoutForm = () => {

    // 카트 정보 가져오기
    const cartItems = useSelector(selectCartItems);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const cartTotalAmount = useSelector(selectCartTotalAmount);

    const dispatch = useDispatch();

    // 안전하게 스토어 데이터 한번 더 계산시키기
    useEffect(()=>{
        dispatch(CALCULATE_TOTAL_AMOUNT());
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch, cartItems])
    
  return (
    <div className={styles.summary}>
        <h3>주문 요약</h3>
        <div>
            {
                cartItems.length === 0 ? (
                    <>
                        <p>장바구니에 상품이 없습니다.</p>
                        <Link href={'/'}>홈 페이지로</Link>
                    </>
                ) : (
                    <>
                        <div>
                            {cartItems.map((item)=>{
                                const { id, name, salePrice, cartQuantity } = item;
                                return(
                                    <div key={id} className={styles.card}>
                                        <p><b>상품:</b>{name}</p>
                                        <p><b>개수:</b>{cartQuantity}</p>
                                        <p><b>판매가:</b>{priceFormat(salePrice)}원</p>
                                        <p><b>합계:</b>{priceFormat(salePrice * cartQuantity)}원</p>
                                    </div>
                                )
                            })}

                            <h3>최종 결제금액</h3>
                            <div className={styles.textWrap}>      
                                <div className={styles.text}>
                                    <p><b>총 수량:</b></p>
                                    <span>{cartTotalQuantity}개</span>
                                </div>
                                <div className={styles.divider}></div>
                                <div className={styles.text}>
                                    <p><b>총 결제금액:</b></p>
                                    <span>{priceFormat(cartTotalAmount)}원</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default CheckoutForm