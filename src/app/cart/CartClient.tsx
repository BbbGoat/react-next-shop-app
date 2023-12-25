"use client";
import React, { useEffect } from "react";
import styles from "./CartClient.module.scss";
import Heading from "@/components/heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_TOTAL_AMOUNT, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, INCREASE_CART, REMOVE_FROM_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "@/redux/slice/cartSlice";
import Link from "next/link";
import Image from "next/image";
import priceFormat from "@/utils/priceFormat";
import { useRouter } from "next/navigation";
import { TCartItem } from "@/types";
import { FaTrashAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import Button from "@/components/button/Button";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiReceipt, CiShoppingCart, CiShoppingTag } from "react-icons/ci";

const CartClient = () => {

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const decreaseCart = (cart: TCartItem) => {
    dispatch(DECREASE_CART(cart));
  }
  const increaseCart = (cart: TCartItem) => {
    dispatch(INCREASE_CART(cart));
  }
  const removeFromCart = (cart: TCartItem) => {
    dispatch(REMOVE_FROM_CART(cart));
  }
  const clearCart = () => {
    dispatch(CLEAR_CART());
  }

  // 결제 함수
  const checkout = () => {
    if (isLoggedIn) {
      router.push('/checkout-address');
    } else {
      router.push('/login');
    }
  }

  useEffect(()=>{
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems])

  return (
    <section className={styles.table}>
      <Heading title="장바구니" />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비어있습니다.</p>
          <div className={styles.emptyText}>
            <Link href={'/'}>계속 쇼핑하기</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                const { id, name, brand, salePrice, thumbnailURL, cartQuantity } = item;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td className={styles.cell_pd}>
                      <div className={styles.name}>
                        <p>
                          {brand}
                        </p>
                        <p>
                          {name}
                        </p>
                      </div>
                      <div className={styles.img}>
                        <Image 
                          src={thumbnailURL} alt={name} width={100} height={100}
                        />
                      </div>
                    </td>
                    <td className={styles.cell_price}>{priceFormat(salePrice)}원</td>
                    <td className={styles.cell_price}>
                      <div className={styles.count}>
                        <button onClick={()=>decreaseCart(item)} style={{lineHeight: '1.2'}}>
                          -
                        </button>
                        <p>
                          {cartQuantity}
                        </p>
                        <button onClick={()=>increaseCart(item)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td className={styles.cell_price}>
                      {priceFormat(salePrice * cartQuantity)}원
                    </td>
                    <td>
                      <CgClose size={19} onClick={()=>removeFromCart(item)} style={{cursor: 'pointer'}} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className={styles.summary}>

            <div className={styles.checkout}>
              <CiShoppingTag className={styles.icons} />
              <div className={styles.text}>
                <p>총 상품개수</p>
                <span>
                  <b>
                    {cartTotalQuantity}
                  </b>
                  개
                </span>
              </div>
              <div className={styles.divider}></div>
              <CiReceipt className={styles.icons}/>
              <div className={styles.text}>
                <p>총 결제금액</p>
                <span>
                  <b>
                    {priceFormat(cartTotalAmount)}
                  </b>
                  원
                </span>
              </div>
            </div>
            
            <div className={styles.buttonwrap}>
            <Button onClick={clearCart} width="200px" secondary>
              카트 비우기
            </Button>
            <Button onClick={checkout} width="200px">
              결제하기
            </Button>
            </div>

          </div>

        </>
      )}
    </section>
  )
};

export default CartClient;
