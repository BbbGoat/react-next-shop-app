'use client'
import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>

        <div className={styles.menuwrap}>
          <div className={styles.title}>
            <span>PRACTICAL INFORMATION</span>
          </div>
          <ul className={styles.menulist}>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Track your order</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Shipping & Delivery</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Return an item</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Help Center/FAQs</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Find your nearest boutique</Link></span>
            </li>
          </ul>
        </div>

        <div className={styles.menuwrap}>
          <div className={styles.title}>
            <span>SERVICES</span>
          </div>
          <ul className={styles.menulist}>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Our services</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Find the ideal gift</Link></span>
            </li>
          </ul>
        </div>

        <div className={styles.menuwrap}>
          <div className={styles.title}>
            <span>FOLLOW US</span>
          </div>
          <ul className={styles.menulist}>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Facebook</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Twitter</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Instagram</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Youtube</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Pinterest</Link></span>
            </li>
          </ul>
        </div>

        <div className={styles.menuwrap}>
          <div className={styles.title}>
            <span>LEGAL</span>
          </div>
          <ul className={styles.menulist}>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Terms and Conditions</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Terms of use</Link></span>
            </li>
            <li className={styles.menuitem}>
              <span><Link href={"/"}>Privacy policy and cookie policy</Link></span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}

export default Footer