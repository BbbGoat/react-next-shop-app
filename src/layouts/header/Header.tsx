'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { CiDeliveryTruck, CiSearch, CiShoppingBasket, CiUser } from "react-icons/ci";
import { PiPresentationChartThin } from 'react-icons/pi'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import classNames from 'classnames'
import headerData from './headerData'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '@/redux/slice/authSlice'
import { toast } from 'react-toastify'
import { selectCartTotalQuantity } from '@/redux/slice/cartSlice'
import { LiaUserSlashSolid } from 'react-icons/lia'
import InnerHeader from '../innerHeader/InnerHeader'

const Header = () => {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [cartProductCount, setCartProductCount] = useState(0);
  const [active, setActive] = useState('');

  const [displayName, setDisplayName] = useState('');
  const [isLogedIn, setIsLogedIn] = useState(false);

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const count = typeof window !== "undefined" ? 
  localStorage.getItem('cartCount') ? 
  JSON.parse(localStorage.getItem('cartCount')!) : 0 : 0

  useEffect(()=>{
    setCartProductCount(count);
  }, [cartTotalQuantity])
  
  
  // 검색 버튼 클릭시
  const handleSearch = () => {}

  const handleClick = () => {
    if (isLogedIn) {
      router.push('/admin/dashboard');
      return
    }
    alert('관리자 기능은 로그인 후 이용 가능합니다.');
    router.push('/login');
  }



  useEffect(()=>{
    // 로그인 상태 감시
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // [ 이메일 로그인한 경우 ]
        if (user.displayName === null) {
          if (user.email) {
            const u1 = user.email?.substring(0, user.email.indexOf('@'));
            const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
            setIsLogedIn(true);
            setDisplayName(uName);
          }
        }
        // [ 구글 로그인한 경우 ]
        else {
          setIsLogedIn(true);
          setDisplayName(user.displayName);
        }

        // 유저 정보를 리덕스 스토어에 저장하기
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid
        }))
      }
      // [ 로그아웃 할 경우 ]
      else {
        setDisplayName('');
        setIsLogedIn(false);
        dispatch(REMOVE_ACTIVE_USER());
      }
    })

  }, [dispatch, displayName])

  const logoutUser = () => {
    signOut(auth)
    .then(()=>{
      toast.success('로그아웃 되었습니다.');
    })
    .catch((error)=>{
      toast.error(error.message);
    })
  }

  // 다음에 해당할 경우 헤더 노출 X
  if (pathname.startsWith('/admin')) { 
    return null; 
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.flex}>
          {/* 검색창 */}
          {/* <div className={classNames(styles.list, styles.left)}>
            <button
              className={styles.searchButton} type='button' onClick={handleSearch}
            >
              <CiSearch size={25} style={{marginRight:'10px'}} /> 
            </button>
            <div className={styles.searchInput}>
              <input type='search' id='searchKeyword' 
                placeholder='Search' 
                value={search} onChange={(e)=>setSearch(e.target.value)} 
              />
            </div>
          </div> */}

          {/* 로고 */}
          <h1 className={styles.logo}>
            <Link href={'/'}>
              <Image src={logo} alt='logo' width={120} height={21} priority />
            </Link>
          </h1>

          {/* 카테고리 박스 */}
          <nav className={styles.navBar}>
            {/* 카테고리 리스트 */}
            <div className={styles.category}>
              <ul className={styles.menubar} role='menubar'>
                {
                  headerData.map((item, idx)=>{
                    const {href, cat} = item;
                    return (
                      <li className={active == cat ? `${styles.active}` : ''} role='menuitem' key={idx} onMouseOver={()=>{setActive(cat)}} onMouseOut={()=>{setActive('')}}>
                        <Link href={href}>
                          <span>{cat.toUpperCase()}</span>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </nav>

          {/* 오른쪽 박스 */}
          <div className={classNames(styles.list, styles.right)}>
            {
              isLogedIn ? (
                <>
                  <div className={styles.btnBox}>
                    <button onClick={logoutUser} style={{cursor: 'pointer', border: 'none', backgroundColor: 'transparent'}} title='로그아웃' aria-label='로그아웃'>
                      {/* <LiaUserSlashSolid size={25} /> */}
                      로그아웃
                    </button>
                  </div>
                  <div className={styles.btnBox}>
                    <button onClick={()=>router.push('/order-history')} style={{cursor: 'pointer', border: 'none', backgroundColor: 'transparent'}} title='마이페이지' aria-label='마이페이지'>
                      MY
                    </button>
                  </div>
                  <button className={styles.adminButton} type='button' title='관리자 페이지' aria-label='관리자 페이지' >
                    <PiPresentationChartThin size={25} onClick={handleClick}/>
                  </button>
                </>
              ) : (
                <div className={styles.loginButton}>
                  <button className={styles.adminButton} type='button' title='관리자 페이지' aria-label='관리자 페이지' >
                    <PiPresentationChartThin size={25} onClick={handleClick}/>
                  </button>
                  <Link href={"/login"} role='button' title='로그인' aria-label='로그인'>
                    <CiUser size={25} />
                  </Link>
                </div>
              )
            }
            <div className={styles.cartButton} role='button' aria-roledescription='카트' title='카트' aria-label='카트'>
              <Link href={"/cart"}>
                <CiShoppingBasket size={25} />
                <strong>
                  {cartProductCount}
                </strong>
              </Link>
            </div>
          </div>

        </div>
      <InnerHeader />
      </div>
    </header>
  )
}

export default Header