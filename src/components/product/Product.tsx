import React from 'react'
import styles from './Product.module.scss'
import ProductSlider from './productSlider/ProductSlider'
import NewArrivalsData from './data/NewArrivalsData'
import PreOrderData from './data/PreOrderData'
import CustomSlider from './customSlider/CustomSlider'
import DirectData from './data/DirectData'
import ListSlider from './listSlider/ListSlider'

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

       
      
      <div className={styles.wrapper}>
        <CustomSlider
          sliderName='preOrder'
          title='pre order' 
          subtitle='한 시즌 빠른 예약 주문' 
          data={PreOrderData} 
          slidesPerView={1} 
        />

        <ListSlider
          sliderName='direct'
          title='direct' 
          subtitle='추가 비용 없는 해외직구' 
          data={DirectData}
          // slidesPerView={1} 
        />

        <CustomSlider
          sliderName='nowOn'
          title='now on' 
          subtitle='트렌디한 브랜드&아이템 제안' 
          data={PreOrderData} 
          slidesPerView={1} 
        />
      </div>
    </>
  )
}

export default Product