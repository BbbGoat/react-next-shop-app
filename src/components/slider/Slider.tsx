'use client'
import React from 'react'
import styles from './Slider.module.scss'
import sliderData from './SliderData'
import Image from 'next/image'

const Slider = () => {
  return (
    <div className={styles.slider}>
        <i></i>
        <i></i>

        {
            sliderData.map((item)=>{
                
            })
        }

    </div>
  )
}

export default Slider