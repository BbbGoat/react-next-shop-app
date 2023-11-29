import React from 'react'
import styles from './Product.module.scss'
import ProductSlider from './productSlider/ProductSlider'
import NewArrivalsData from './data/NewArrivalsData'

const Product = () => {
  return (
    <ProductSlider sliderName='newArrival' title='new arrivals' subtitle='새로운 상품' data={NewArrivalsData} />
  )
}

export default Product