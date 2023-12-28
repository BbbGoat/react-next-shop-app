'use client'
import React from 'react'
import styles from './Navbar.module.scss'
import { FaUserCircle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUserName } from '@/redux/slice/authSlice'
import Link from 'next/link'
import { MdDashboard } from "react-icons/md";
import { RiFileList2Fill, RiFileAddFill, RiShoppingBag2Fill } from "react-icons/ri";
import { BiSolidExit } from "react-icons/bi";
import Image from 'next/image'
import logo from '@/assets/logo.svg';

const Navbar = () => {

  const pathname = usePathname();
  const userName = useSelector(selectUserName);
  
  return (
    <div className={styles.navbar}>
      
      <div className={styles.logo}>
        <Link href={'/'}>
          <Image src={logo} alt='로고' width={160} />
        </Link>
      </div>
      
      <div className={styles.navCategory}>
        <h3>Member</h3>
      </div>

      {/* 관리자 정보 */}
      <div className={styles.user}>
        <FaUserCircle size={20} color='#fff' />
        <h4>{userName} 님</h4>
      </div>

      <div className={styles.navCategory}>
        <h3>Admin</h3>
      </div>

      {/* 네비게이션 */}
      <nav>
        <ul>
          <li>
            <Link
              href="/admin/dashboard"
              className={pathname === '/admin/dashboard' ? `${styles.active}` : ''}
            >
              <MdDashboard size={18} style={{marginTop: 4}} />
              <span>대시보드</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/all-products"
              className={pathname === '/admin/all-products' ? `${styles.active}` : ''}
            >
              <RiFileList2Fill size={18} style={{marginTop: 4}} />
              <span>총 상품</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/add-product"
              className={pathname === '/admin/add-product' ? `${styles.active}` : ''}
            >
              <RiFileAddFill size={18} style={{marginTop: 4}} />
            <span>상품 추가</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              className={pathname === '/admin/orders' ? `${styles.active}` : ''}
            >
              <RiShoppingBag2Fill size={18} style={{marginTop: 4}} />
            <span>주문</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.exit}>
        <Link href="/">
          <BiSolidExit size={18} style={{marginTop: 4}} />
          <span>나가기</span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar