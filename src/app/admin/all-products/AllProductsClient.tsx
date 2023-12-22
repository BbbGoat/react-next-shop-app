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
import { FILTER_BY_SEARCH, selectFilteredProducts } from "@/redux/slice/filterSlice";
import Search from "@/components/search/Search";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Pagination from "@/components/pagination/Pagination";
import { getErrorMessage } from "@/utils/getErrorMessage";


const AllProductsClient = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  // 현재 페이지 / 페이지당 화면에 보이는 상품 개수
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct, indexOfLastProduct
  )

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({products: data}))
  }, [dispatch, data])

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products, search}))
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
          subtitle={`총 ${filteredProducts.length} 개의 상품`}
        />
        <div className={styles.search}>
          <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ):(
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>이미지</th>
                <th>이름</th>
                <th>카테고리</th>
                <th>판매가</th>
                <th>수정/삭제</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, idx)=>{
                const { id, name, thumbnailURL, category, salePrice } = product;
                return(
                  <tr key={id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className={styles.imgwrap}>
                        <Image src={thumbnailURL} alt={name} width={100} height={100} />
                      </div>
                    </td>
                    <td>
                      <Link href={`/product-details/${id}`}>
                        {name}
                        {" "}
                        <LiaExternalLinkAltSolid size={18} />
                      </Link>
                    </td>
                    <td>{category}</td>
                    <td>{priceFormat(salePrice)}</td>
                    <td>
                      <Link href={`/admin/edit-product/${id}`}>
                        <FaEdit size={20} color='green' />
                      </Link>
                      {" "}
                      <FaTrashAlt size={18} color='red' onClick={()=>confirmDelete(id, thumbnailURL)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        <Pagination 
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  )
};

export default AllProductsClient;
