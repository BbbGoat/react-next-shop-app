import React, { useEffect } from 'react'
import styles from './ProductList.module.scss'
import ProductItem from '../productItem/ProductItem'
import { useSelector } from 'react-redux'
import { selectProducts } from '@/redux/slice/productSlice'
import { selectFilteredProducts } from '@/redux/slice/filterSlice'

const ProductList = () => {

  // 카테고리 필터링 된 데이터 가져오기
  const filteredProducts = useSelector(selectFilteredProducts);

  // 필터링 기능 구현
  
  return (
    <div className={styles.productList}>
      <div className={styles.divider}></div>
      <div className={styles.grid}>
        {filteredProducts.map((product)=>{
          return (
            <ProductItem {...product} key={product.id} />
          )
        })}
      </div>
    </div>
  )
}

export default ProductList