"use client";
import React, { useEffect, useState } from "react";
import styles from "./AllProducts.module.scss";
import useFetchCollection from "@/hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import Notiflix from "notiflix";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";

const AllProductsClient = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  // const filteredProducts = useSelector();

  // 페이지네이션 용도
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = filteredProducts.slice(
  //   indexOfFirstProduct, indexOfLastProduct
  // )

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({products: data}))
  }, [dispatch, data])

  useEffect(()=>{
    // dispatch()
  }, [dispatch, products, search])

  const confirmDelete = (id: string, thumbnailURL: string) => {
    // 라이브러리 사용
    Notiflix.Confirm.show(
      "상품 삭제하기",
      "이 상품을 삭제하게 됩니다.",
      "삭제",
      "취소",
      function okCb(){
        deleteProduct(id, thumbnailURL)
      },
      function cancelCb(){
        console.log("삭제가 취소되었습니다.")
      },
      {
        width: "320px",
        borderRadius: '3px',
        titleColor: '#4385F4',
        okButtonBackground: '#4385F4',
        cssAnimationStyle: 'zoom'
      }
    )
  }
  const deleteProduct = async (id: string, thumbnailURL: string) => {
    try {
      // firebase 도큐먼트 지우기
      await deleteDoc(doc(db, "products", id));

      // storage 이미지 지우기
      const storageRef = ref(storage, thumbnailURL);
      await deleteObject(storageRef);
      toast.success("상품을 성공적으로 삭제했습니다.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <Heading
          title="모든 상품"
          // subtitle={`총 ${filteredProducts.length} 개의 상품`}
        />
        <div className={styles.search}>
          {/* 검색어박스 컴포넌트 들어가는 란 */}
        </div>

        <table>
          <thead>
            <tr>
              <th>순서</th>
              <th>이미지</th>
              <th>이름</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>실행</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </>
  )
};

export default AllProductsClient;
