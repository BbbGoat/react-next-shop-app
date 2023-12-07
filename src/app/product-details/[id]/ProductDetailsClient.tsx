'use client'
import React from 'react'
import styles from './ProductDetailsClient.module.scss'

const ProductDetailsClient = () => {
  return (
    <main>
        <div className={styles.gallery}>
            <div className={styles.contents}>
                <div className={styles.imgwrap}>
                    {/* map 돌리기 */}
                </div>

            </div>
        </div>
        <div className={styles.info}>
            <div className={styles.contents}>
                {/* div들 형제로 쭈우욱 나열 */}
            </div>
        </div>
    </main>
  )
}

export default ProductDetailsClient