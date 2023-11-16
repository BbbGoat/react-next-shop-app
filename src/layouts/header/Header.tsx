'use client'
import React, { useState } from 'react'
import styles from './Header.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { CiSearch, CiShoppingBasket, CiUser } from "react-icons/ci";
import { PiPresentationChartThin } from 'react-icons/pi'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import classNames from 'classnames'
import headerData from './headerData'

const Header = () => {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const [search, setSearch] = useState('');
  const [cartProductCount, setCartProductCount] = useState(0);

  // 검색 버튼 클릭시
  const handleClick = () => {}

  // 3개 경로에 해당할 경우 헤더 노출 X
  if (pathname === '/login' || pathname === '/register' || pathname === '/reset') { 
    return null; 
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        
        {/* 검색창 */}
        <div className={classNames(styles.list, styles.left)}>
          <button
            className={styles.searchButton} type='button' onClick={handleClick}
          >
            <CiSearch size={25} style={{marginRight:'10px'}} /> 
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
          <button className={styles.adminButton} type='button' >
            <Link href={'/admin/dashboard'}>
              <PiPresentationChartThin size={25} />
            </Link>
          </button>
          <div className={styles.loginButton} role='button' aria-roledescription='Account' title='Account' aria-label='Account'>
            <Link href={"/login"}>
              <CiUser size={25} />
            </Link>
          </div>
          <div className={styles.cartButton} role='button' aria-roledescription='cart' title='cart' aria-label='cart'>
            <Link href={"/cart"}>
              <CiShoppingBasket size={25} />
              <strong>
                {cartProductCount}
              </strong>
            </Link>
          </div>
        </div>

      </div>

      {/* 카테고리 박스 */}
      <nav className={styles.navBar}>
        {/* 카테고리 리스트 */}
        <div className={styles.category}>
          <ul className={styles.menubar} role='menubar'>
            {
              headerData.map((item, idx)=>{
                const {href, cat} = item;
                return (
                  <li className={styles.menuItem} role='menuitem' key={idx}>
                    <Link href={href}>
                      <span>{cat}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        {/* 오버시 노출되는 카테고리 */}
        {/* <div className={}>
        </div> */}
      </nav>
    </header>
  )
}

export default Header