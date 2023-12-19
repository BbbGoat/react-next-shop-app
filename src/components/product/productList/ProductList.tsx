import React from 'react'
import styles from './ProductList.module.scss'
import ProductItem from '../productItem/ProductItem'
import ProductData from './ProductData'
import { useSelector } from 'react-redux'
import { selectProducts } from '@/redux/slice/productSlice'

const ProductList = () => {

  // !!!! useSelector로 필터링된 데이터 가져와서 map() 돌리는거로 수정하면 됨!!!
  const products = useSelector(selectProducts);
  
  return (
    <div className={styles.productList}>
      <div className={styles.divider}></div>
      <div className={styles.grid}>
        {/* 임시 데이터로 map() 돌리는 중 */}
        {ProductData.map((product)=>{
          return (
            <ProductItem {...product} key={product.id} />
          )
        })}
      </div>
    </div>
  )
}

export default ProductList