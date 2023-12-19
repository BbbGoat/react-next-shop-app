'use client'
import React, { useState } from 'react'
import styles from './AllProducts.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection';

const AllProductsClient = () => {
    const [search, setSearch] = useState('');
    const { data, isLoading } = useFetchCollection("products");
    
  return (
    <div>AllProductsClient</div>
  )
}

export default AllProductsClient