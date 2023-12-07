import React from 'react'
import styles from './ProductItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat';
import { Rating } from 'react-simple-star-rating';

interface IProductItemProps {
  id: string;
  name: string;
  price: number;
  imageURL: string;
}

const ProductItem = ({
  id,
  name,
  price,
  imageURL
}: IProductItemProps) => {
  
  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
        
        <div className={styles.content}>
          <div className={styles.details}>
            <p>{name}</p>
            <em>
              <strong>{priceFormat(price)}</strong>
              원{" "}
            </em>
            {/* 별점 라이브러리 */}
            <div className={styles.rating}>
              <Rating 
                size={17}
                initialValue={1}
                // initialValue={Number.isNaN(rating) ? 0 : rating}
                readonly
              />
              <span className={styles.ratingCount}>
                (1)
                {/* ({documents.length}) */}
              </span>
            </div>
          </div>
        </div>
      </Link>


    </div>
  )
}

export default ProductItem