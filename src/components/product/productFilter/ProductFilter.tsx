import React, { ChangeEvent, useState } from 'react'
import styles from './ProductFilter.module.scss'
import priceFormat from '@/utils/priceFormat';
import { useSelector } from 'react-redux';
import Button from '@/components/button/Button';
import { useParams } from 'next/navigation';
import { selectProducts } from '@/redux/slice/productSlice';

const ProductFilter = () => {

  const [title, setTitle] = useState('전체');
  const [sort, setSort] = useState('latest');
  const [category, setCategory] = useState('전체');
  const [price, setPrice] = useState(10000);

  const { id } = useParams();

  const products = useSelector(selectProducts);
  // const minPrice = useSelector();

  const isRadioSelected = (value: string) => sort === value;
  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) => setSort(e.target.value);

  const filterCategories = (cat: string) => {
    setTitle(cat);
    setSort('latest');
    setCategory(cat);

    // db 검색조건 재설정 해야함
    
  }
  const clearFilters = () => {
    setTitle('전체');
    setSort('latest');
    setCategory('전체');
    setPrice(10000); 
  }

  const didi = new Set(products.map((product)=>{
    return product.sortCat
  }))
  
  const allCategories = [
    "전체",
    ...didi,
    // 1. document 불러오기
    // 2. id로 현재 category 찾아오기 => useParams 사용
    // 3. id와 일치하는 데이터들 중에 sortCat 전부 찾아와서 new Set으로 중복제거 ㅇㅋ 
  ]
  
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
        <p>{priceFormat(price)}원</p>

        <div className={styles.price}>
          <input 
            type='range'
            value={price}
            onChange={(e)=>setPrice(e.target.valueAsNumber)}
            // min={minPrice}
            // max={maxPrice}
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