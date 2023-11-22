'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './AddProduct.module.scss'
import Loader from '@/components/loader/Loader';
import Heading from '@/components/heading/Heading';
import Button from '@/components/button/Button';

const AddProductClient = () => {

    const [isLoading, setIsLoading] = useState(false);


    const addProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

    }
    
  return (
    <>
        {isLoading && <Loader />}
        <div className={styles.product}>
            <Heading title='새 상품 생성하기' />
            <form onSubmit={addProduct}>
                <label>상품 이름:</label>
                <input 
                    type='text'
                    placeholder='상품 이름'
                    required
                    name='name'
                    // value={}
                    onChange={(e)=>handleInputChange(e)}
                />
                <div>
                    <input 
                        type='file'
                        placeholder='상품 이미지'
                        accept='image/*'
                        name='image'
                        required
                        onChange={(e)=>handleImageChange(e)}
                    />

                </div>
                <label>상품 가격:</label>
                <input 
                    type='number'
                    placeholder='상품 가격'
                    required
                    name='price'
                    // value={}
                    onChange={(e)=>handleInputChange(e)}
                />
                <label>상품 카테고리:</label>
                <select
                    name='category'
                    // value={}
                    required
                    onChange={(e)=>handleInputChange(e)}
                >
                    <option
                        value=""
                        disabled
                    >
                        -- 상품 카테고리 선택
                    </option>
                </select>
                <label>상품 브랜드/회사:</label>
                <input 
                    type='text'
                    placeholder='상품 브랜드/회사'
                    name='brand'
                    // value={}
                    onChange={(e)=>handleInputChange(e)}
                />
                <label>상품 설명:</label>
                <textarea
                    name='desc'
                    cols={10}
                    rows={10}
                    // value={}
                    required
                    onChange={(e)=>handleInputChange(e)}
                >
                </textarea>
                <Button type='submit'>
                    상품 생성
                </Button>
            </form>

        </div>
    </>
  )
}

export default AddProductClient