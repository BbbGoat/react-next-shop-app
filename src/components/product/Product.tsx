'use client'
import React, { useState } from "react";
import styles from './Product.module.scss'
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

const Product = () => {

  // 파이어베이스 연결 시, 추가작업 해야함!!! store에 데이터 연동해서 hook 사용해야함
    
  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {/* 정렬 들어갈 부분 */}
        <ProductFilter />
      </aside>
      <div className={styles.content}>
        {/* 제품목록 나열 */}
        <ProductList />
      </div>
    </section>
  );
};

export default Product;
