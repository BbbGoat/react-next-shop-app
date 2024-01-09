import React from 'react'
import styles from './InnerHeader.module.scss'
import headerData from '../header/headerData'
import Link from 'next/link'

const InnerHeader = () => {
  return (
    <div className={styles.innerNav}>
        <div className={styles.wrap}>
            <ul className={styles.menubar} role='menubar'>
                {
                    headerData.map((item, idx)=>{
                    const {href, cat} = item;
                    return (
                        <li key={cat}>
                        <Link href={href}>
                            <span>{cat.toUpperCase()}</span>
                        </Link>
                        </li>
                    )
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default InnerHeader