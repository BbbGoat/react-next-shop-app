'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './CheckoutAddress.module.scss'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Heading from '@/components/heading/Heading'
import Button from '@/components/button/Button'

const initialAddressState = {
  name: '',
  line: '',
  city: '',
  postalCode: ''
}

const CheckoutAddressClient = () => {

  // 배송지주소 / 청구지주소 (해외 기준)
  const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
  const [billingAddress, setBillingAddress] = useState({...initialAddressState})

  const dispatch = useDispatch();
  const router = useRouter();

  const handleShipping = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress({...shippingAddress, [name]: value});
  }
  const handleBilling = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress({...billingAddress, [name]: value});
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch()
    router.push('/checkout');
  }
  
  return (
    <section className={styles.checkout}>
      <Heading title='상세주문' />
      
      <form onSubmit={handleSubmit}>

        {/* ShippingAddress */}
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람 이름</label>
          <input 
            type="text"
            placeholder='받는 사람 이름'
            required
            name='name'
            value={shippingAddress.name}
            onChange={(e)=>handleShipping(e)}
          />
          
          <label>상세주소</label>
          <input 
            type="text"
            placeholder='상세주소'
            required
            name='line'
            value={shippingAddress.line}
            onChange={(e)=>handleShipping(e)}
          />
          <label>도시</label>
          <input 
            type="text"
            placeholder='도시'
            required
            name='city'
            value={shippingAddress.city}
            onChange={(e)=>handleShipping(e)}
          />
          <label>우편번호</label>
          <input 
            type="text"
            placeholder='우편번호'
            required
            name='postalCode'
            value={shippingAddress.postalCode}
            onChange={(e)=>handleShipping(e)}
          />
        </div>

        {/* BillingAddress */}
        <div className={styles.card}>
          <h3>청구지 주소</h3>
          <label>보내는 사람 이름</label>
          <input
            type="text" 
            placeholder='보내는 사람 이름'
            required
            name='name'
            value={billingAddress.name}
            onChange={(e)=>handleBilling(e)}
          />
          
          <label>상세주소</label>
          <input
            type="text" 
            placeholder='상세주소'
            required
            name='line'
            value={billingAddress.line}
            onChange={(e)=>handleBilling(e)}
          />
          <label>도시</label>
          <input
            type="text" 
            placeholder='도시'
            required
            name='city'
            value={billingAddress.city}
            onChange={(e)=>handleBilling(e)}
          />
          <label>우편번호</label>
          <input
            type="text" 
            placeholder='우편번호'
            required
            name='postalCode'
            value={billingAddress.postalCode}
            onChange={(e)=>handleBilling(e)}
          />

          <Button type='submit'>
            주문하기
          </Button>
        </div>
      </form>
    </section>
  )
}

export default CheckoutAddressClient