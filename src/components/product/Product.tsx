'use client'
import React, { useEffect, useState } from "react";
import styles from './Product.module.scss'
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "@/hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import Loader from "../loader/Loader";
import { FILTER_BY, FILTER_BY_CATEGORY, selectFilteredProducts, selectFilteredProductsOrigin } from "@/redux/slice/filterSlice";

const Product = ({id}: {id: string}) => {

  const [category] = useState(id);
  
  const dispatch = useDispatch();

  // 1. 최상위 컴포넌트에서 DB의 전체 상품 데이터 가져오기
  const { data, isLoading } = useFetchCollection('products');  
  const filteredProductsOrigin = useSelector(selectFilteredProductsOrigin);
  // 스토어 저장
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({ products: data }))
  }, [dispatch, data])

  
  // 2. 저장된 store 상품 데이터 가져와서 1차 필터링하기
  const products = useSelector(selectProducts);
  // 스토어 저장 (FILTER_BY_CATEGORY => ProductList에 사용)
  useEffect(()=>{
    dispatch(FILTER_BY_CATEGORY({ products, category }))
    dispatch(FILTER_BY({ products, category }))
  }, [dispatch, products, category])

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {/* 정렬 들어갈 부분 */}
        { isLoading ? null : <ProductFilter /> }
      </aside>
      <div className={styles.content}>
        {/* 제품목록 나열 */}
        { isLoading ? <Loader basic /> : <ProductList /> }
      </div>
    </section>
  );
};

export default Product;
