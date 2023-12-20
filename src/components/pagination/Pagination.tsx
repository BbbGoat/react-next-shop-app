import React, { useState } from 'react'
import styles from './Pagination.module.scss'

interface IPaginationProps {
    currentPage: number;
    productsPerPage: number;
    setCurrentPage: (page: number) => void;
    totalProducts: number;
}

const Pagination = ({
    currentPage,
    productsPerPage,
    setCurrentPage,
    totalProducts
}: IPaginationProps) => {

    const pageNumbers: number[] = [];

    // 페이지 한계값
    const [pageNumberLimit] = useState(3);
    // 각 페이지열마다 최대가 될 숫자
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    // 각 페이지열마다 최소가 될 숫자
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0); 

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }
    const paginateNextPage = () => {
        setCurrentPage(currentPage + 1);
        
        // 다음 페이지열 넘기기
        if (currentPage +1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    const paginatePrevPage = () => {
        setCurrentPage(currentPage - 1);
        
        // 이전 페이지열 넘기기
        console.log((currentPage -1) / pageNumberLimit)
        if ((currentPage -1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }
    
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }


  return (
    <div className={styles.pagination}>
        <li
            onClick={paginatePrevPage}
            className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ''}
        >
            {"<"}
        </li>

        {pageNumbers.map((number)=>{
            if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                return(
                    <li
                        key={number}
                        onClick={()=>paginate(number)}
                        className={currentPage === number ? `${styles.active}` : ''}
                    >
                        {number}
                    </li>
                )
            }
        })}

        <li
            onClick={paginateNextPage}
            className={currentPage === pageNumbers[pageNumbers.length-1] ? `${styles.hidden}` : ''}
        >
            {">"}
        </li>

    </div>
  )
}

export default Pagination