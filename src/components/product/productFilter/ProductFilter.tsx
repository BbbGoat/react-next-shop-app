import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import priceFormat from '@/utils/priceFormat';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/button/Button';
import { useParams } from 'next/navigation';
import { selectMaxPrice, selectMinPrice, selectProducts } from '@/redux/slice/productSlice';
import { FILTER_BY_PRICE, FILTER_BY_SORT, SORT_PRODUCTS, selectFilteredProducts, selectFilteredProductsOrigin, selectFilteredSort } from '@/redux/slice/filterSlice';

const ProductFilter = () => {

  const [category, setCategory] = useState('전체');
  const [sort, setSort] = useState('latest');
  const [price, setPrice] = useState(10000);
  const [title, setTitle] = useState('전체');
  
  const { id } = useParams() as {id: string};
  const dispatch = useDispatch();
  
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const filteredProductsOrigin = useSelector(selectFilteredProductsOrigin);
  const filteredProducts = useSelector(selectFilteredProducts);
  const filteredSort = useSelector(selectFilteredSort);

  const isRadioSelected = (value: string) => sort === value;
  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) => setSort(e.target.value);

  const filterCategories = (cat: string) => {
    setSort('latest');
    setCategory(cat);
    setTitle(cat);
  }
  const clearFilters = () => {
    setCategory('전체');
    setSort('latest');
    setTitle('전체');
    setPrice(maxPrice); 
  }

  const allCategories = [
    "전체",
    ...new Set(filteredProductsOrigin.map((product)=>product.sortCat)) as any,
  ]
  
  // 카테고리 분류
  useEffect(()=>{
    dispatch(FILTER_BY_SORT({ products, category, id }))
  }, [dispatch, products, category, id])

  // 정렬
  useEffect(()=>{
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }))
  }, [dispatch, products, sort])

  // 가격
  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({ products: filteredSort, price }))
  }, [dispatch, products, price])
  

  // 가격란 초기값 세팅용
  useEffect(()=>{
    setPrice(maxPrice)
  }, [maxPrice])
  
  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <h3>{title}</h3>
        <span>({id})</span>
      </div>
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