import React from 'react'
import styles from './Product.module.scss'
import ProductSlider from './productSlider/ProductSlider'
import CustomSlider from './customSlider/CustomSlider'
import ListSlider from './listSlider/ListSlider'
import ReviewSlider from './reviewSlider/ReviewSlider'

import NewArrivalsData from './data/NewArrivalsData'
import PreOrderData from './data/PreOrderData'
import DirectData from './data/DirectData'
import ReviewData from './data/ReviewData'

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
        {/* 1열 */}
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
        />
        <CustomSlider
          sliderName='nowOn'
          title='now on' 
          subtitle='트렌디한 브랜드&아이템 제안' 
          data={PreOrderData} 
          slidesPerView={1} 
        />

        {/* 2열 */}
        <ListSlider
          sliderName="mdsPick"
          title="md's pick"
          subtitle="MD가 추천하는 베스트 아이템" 
          data={DirectData}
        />
        <CustomSlider
          sliderName='brand'
          title='brand' 
          subtitle="주목할만한 브랜드" 
          data={PreOrderData} 
          slidesPerView={1} 
        />
        <ListSlider
          sliderName="bestSeller"
          title="best seller" 
          subtitle="이유 있는 인기 아이템" 
          data={DirectData}
        />
      </div>

      {/* 리뷰란 */}
      <ReviewSlider
        title='review'
        subtitle='베스트 리뷰'
        data={ReviewData}
      />

    </>
  )
}

export default Product