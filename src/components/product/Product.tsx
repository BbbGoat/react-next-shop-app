'use client'
import React, { useState } from "react";
import styles from './Product.module.scss'

const Product = () => {


    
  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {/* 정렬 들어갈 부분 */}

      </aside>
      <div className={styles.content}>
        {/* 제품목록 나열 */}
        
      </div>
    </section>
  );
};

export default Product;
