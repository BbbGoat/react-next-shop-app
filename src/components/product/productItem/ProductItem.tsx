import React from 'react'
import styles from './ProductItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat';
import { Rating } from 'react-simple-star-rating';

interface IProductItemProps {
  id: string;
  name: string;
  thumbnailURL: string;
  imageURL: string[];
  originPrice: number;
  salePrice: number;
  category: string;
  sortCat: string;
  brand: string;
  desc: string;
}

const ProductItem = ({
  id,
  name,
  thumbnailURL,
  imageURL,
  originPrice,
  salePrice,
  category,
  sortCat,
  brand,
  desc,
}: IProductItemProps) => {

  return (
    <div className={styles.item}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.thumb}>
          <Image src={thumbnailURL} alt={name} width={265} height={265} />
        </div>
        
        <div className={styles.info}>
          <div className={styles.brand}>{brand.toUpperCase()}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.priceBox}>
          <div className={originPrice != salePrice ? styles.originPrice : styles.price}>
            {
              originPrice != salePrice ? (priceFormat(originPrice)) : (<div style={{color:'transparent'}}>-</div>)
            }
          </div>
          <div className={styles.salePrice}>
            <span className={styles.discount}>
              {
                originPrice === salePrice ? null : (
                  <>
                    {Math.round(Math.abs(((salePrice - originPrice) / originPrice) * 100))}%
                  </>
                )
              }
            </span>
            <span className={styles.totalPrice}>
            {priceFormat(salePrice)}
            </span>
          </div>
          </div>
        </div>
      </Link>

    </div>
  )
}

export default ProductItem