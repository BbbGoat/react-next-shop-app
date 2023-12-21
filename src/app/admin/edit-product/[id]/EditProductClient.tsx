'use client'
import React from 'react'
import styles from './EditProduct.module.scss'
import { useParams } from 'next/navigation'

const EditProductClient = () => {

  const { id } = useParams();
  
  return (
    <>
      {id}
      <div>EditProductClient</div>
    </>
  )
}

export default EditProductClient