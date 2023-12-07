import React from 'react'
import styles from './ProductList.module.scss'
import ProductItem from '../productItem/ProductItem'
import ProductData from './ProductData'

const ProductList = () => {

  // !!!! useSelector로 필터링된 데이터 가져와서 map() 돌리는거로 수정하면 됨!!!
  
  return (
    <div className={styles.productList}>
      <div className={styles.divider}></div>
      <div>
        {/* 임시 데이터로 map() 돌리는 중 */}
        {ProductData.map((product)=>{
          return (
            <div key={product.id}>
              <ProductItem {...product} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList