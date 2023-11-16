'use client'
import React from 'react'
import styles from './NavbarProvider.module.scss'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

const NavbarProvider = ({children}: {children: React.ReactNode}) => {

    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');
    
  return (
    <>
        {isAdmin 
        ? <div className={styles.admin}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div> 
        : <>{children}</>}
    </>
  )
}

export default NavbarProvider