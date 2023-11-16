'use client'
import React, { useState } from 'react'
import styles from './Header.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { CiSearch, CiShoppingBasket, CiUser } from "react-icons/ci";

const Header = () => {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const [search, setSearch] = useState('');

  const handleClick = () => {}

  if (pathname === '/login' || pathname === '/register' || pathname === '/reset') { return null; }
  
  return (
    <header className={styles.navBar}>
      <div className={styles.wrapper}>
        {/* 검색창 */}
        <button
          type='button' onClick={handleClick} className={styles.searchButton}
        >
         <CiSearch /> 
        </button>
        <div className={styles.searchInput}>
          <input type='search' id='searchKeyword' 
            placeholder='Search' 
            value={search} onChange={(e)=>setSearch(e.target.value)} 
          />
        </div>

        {/* 로고 */}
        <h1>로고</h1>

        {/* 오른쪽 박스 */}
        <div className={styles.item} role='button' aria-roledescription='Account' title='Account' aria-label='Account'>
          <Link href={"/login"}><CiUser /></Link>
        </div>
        <div className={styles.item} role='button' aria-roledescription='cart' title='cart' aria-label='cart'>
          <Link href={"/cart"}>
            <CiShoppingBasket />
            <strong className={styles.cartProductCount}>1</strong>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header