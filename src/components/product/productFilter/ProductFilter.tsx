import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import priceFormat from '@/utils/priceFormat';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/button/Button';
import { useParams } from 'next/navigation';
import { selectMaxPrice, selectMinPrice, selectProducts } from '@/redux/slice/productSlice';
import { FILTER_BY_CATEGORY, FILTER_BY_PRICE, selectFilteredProducts } from '@/redux/slice/filterSlice';

const ProductFilter = () => {

  const [category, setCategory] = useState('전체');
  const [price, setPrice] = useState(10000);
  const [sort, setSort] = useState('latest');
  const [title, setTitle] = useState('전체');
  
  const { id } = useParams() as {id: string};
  const dispatch = useDispatch();
  
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const filteredProducts = useSelector(selectFilteredProducts);

  const isRadioSelected = (value: string) => sort === value;
  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) => setSort(e.target.value);

  const filterCategories = (cat: string) => {
    setTitle(cat);
    setSort('latest');
    setCategory(cat);
    // db 검색조건 재설정 해야함
  }
  const clearFilters = () => {
    setCategory('전체');
    setSort('latest');
    setTitle('전체');
    setPrice(maxPrice); 
  }

  const allCategories = [
    "전체",
    ...new Set(products.map((product)=>product.sortCat)) as any,
  ]
  
  useEffect(()=>{
    dispatch(FILTER_BY_CATEGORY({ products, category: id }))
  }, [dispatch, products, id])
  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({ products, price }))
  }, [dispatch, products, price])

  useEffect(()=>{
    setPrice(maxPrice)
  }, [maxPrice])
  
  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>{title}<span>{id}</span></h3>
      <div className={styles.divider}></div>
      <div className={styles.wrap}>  
        <h4>카테고리</h4>
        <div className={styles.category}>
          {
            allCategories.map((cat)=>{
              return(
                <button
                  key={cat}
                  type='button'
                  className={`${category}` === cat ? `${styles.active}` : ''}
                  onClick={()=>filterCategories(cat)}
                >
                  {cat}
                </button>
              )
            })
          }
        </div>
      </div>
      <div className={styles.divider}></div>
      
      <div className={styles.wrap}>
        <h4>정렬</h4>
        <ul className={styles.sort}>
          <li className={isRadioSelected('latest') ? styles.selected : ""}>
            <input
              type='radio'
              value='latest'
              id='latest'
              checked={isRadioSelected('latest')}
              onChange={handleRadioClick}
            />
            <label htmlFor='latest'>최신순</label>
          </li>

          <li className={isRadioSelected('lowest-price') ? styles.selected : ""}>
            <input
              type='radio'
              value='lowest-price'
              id='lowest-price'
              checked={isRadioSelected('lowest-price')}
              onChange={handleRadioClick}
            />
            <label htmlFor='lowest-price'>저가순</label>
          </li>

          <li className={isRadioSelected('highest-price') ? styles.selected : ""}>
            <input
              type='radio'
              value='highest-price'
              id='highest-price'
              checked={isRadioSelected('highest-price')}
              onChange={handleRadioClick}
            />
            <label htmlFor='highest-price'>고가순</label>
          </li>
        </ul>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.wrap}>  
        <h4>가격</h4>
        <p>{priceFormat(Number(price))}원</p>

        <div className={styles.price}>
          <input 
            type='range'
            value={price}
            onChange={(e)=>setPrice(e.target.valueAsNumber)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>

      <Button onClick={clearFilters} width='100%'>
        필터 초기화
      </Button>
      
    </div>
  )
}

export default ProductFilter