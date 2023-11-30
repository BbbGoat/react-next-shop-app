import React from 'react'
import styles from './Product.module.scss'
import ProductSlider from './productSlider/ProductSlider'
import NewArrivalsData from './data/NewArrivalsData'
import PreOrderData from './data/PreOrderData'
import CustomSlider from './customSlider/CustomSlider'

const Product = () => {
  return (
    <>
      <ProductSlider
       sliderName='newArrival' 
       title='new arrivals' 
       subtitle='새로운 상품' 
       data={NewArrivalsData} 
       slidesPerView={9}
      />
      
      <CustomSlider
        sliderName='preOrder'
        title='pre order' 
        subtitle='한 시즌 빠른 예약 주문' 
        data={PreOrderData} 
        slidesPerView={1} 
      />
    </>
  )
}

export default Product