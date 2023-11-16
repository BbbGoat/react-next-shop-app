'use client'
import React, { useState } from 'react'
import styles from './Header.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { CiSearch, CiShoppingBasket, CiUser } from "react-icons/ci";
import Image from 'next/image'
import logo from '@/assets/logo.png'
import classNames from 'classnames'

const Header = () => {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const [search, setSearch] = useState('');
  const [cartProductCount, setCartProductCount] = useState(0);

  const handleClick = () => {}

  // 3개 경로에 해당할 경우 헤더 노출 X
  if (pathname === '/login' || pathname === '/register' || pathname === '/reset') { 
    return null; 
  }
  
  return (
    <header className={styles.navBar}>
      <div className={styles.wrapper}>
        {/* 검색창 */}
        <div className={classNames(styles.list, styles.left)}>
          <button
            type='button' onClick={handleClick} className={styles.searchButton}
          >
            <CiSearch className={styles.searchIcon} /> 
          </button>
          <div className={styles.searchInput}>
            <input type='search' id='searchKeyword' 
              placeholder='Search' 
              value={search} onChange={(e)=>setSearch(e.target.value)} 
            />
          </div>
        </div>

        {/* 로고 */}
        <h1 className={styles.logo}>
          <Link href={'/'}>
            <Image src={logo} alt='logo' width={182} height={55} priority />
          </Link>
        </h1>

        {/* 오른쪽 박스 */}
        <div className={classNames(styles.list, styles.right)}>
          <div className={styles.loginButton} role='button' aria-roledescription='Account' title='Account' aria-label='Account'>
            <Link href={"/login"}>
              <CiUser className={styles.loginIcon} />
            </Link>
          </div>
          <div className={styles.cartButton} role='button' aria-roledescription='cart' title='cart' aria-label='cart'>
            <Link href={"/cart"}>
              <CiShoppingBasket className={styles.cartIcon} />
              <strong className={styles.cartProductCount}>
                {cartProductCount}
              </strong>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header