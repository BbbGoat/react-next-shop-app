'use client'
import React from 'react'
import styles from './Dashboard.module.scss'
import Heading from '@/components/heading/Heading'

const DashboardClient = () => {
  return (
    <div>
        <Heading title='관리자 대시보드' />
        <div className={styles.infoBox}>
            
            
        </div>
    </div>
  )
}

export default DashboardClient