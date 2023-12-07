import React from 'react'
import styles from './ProductItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat';
import { Rating } from 'react-simple-star-rating';

interface IProductItemProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  discount: number;
  imageURL: string;
}

const ProductItem = ({
  id,
  brand,
  name,
  price,
  discount,
  imageURL
}: IProductItemProps) => {

  const totalPrice = discount === undefined ? price : price - ((price * discount ) / 100)
  
  return (
    <div className={styles.item}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.thumb}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
        
        <div className={styles.info}>
          <div className={styles.brand}>{brand.toUpperCase()}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.priceBox}>
          <div className={styles.originPrice}>
            {priceFormat(price)}
          </div>
          <div className={styles.salePrice}>
            <span className={styles.discount}>{discount}%</span>
            <span className={styles.totalPrice}>
            {priceFormat(totalPrice)}
            </span>
          </div>
          </div>
        </div>
      </Link>

    </div>
  )
}

export default ProductItem