'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './AddProduct.module.scss'
import Loader from '@/components/loader/Loader';
import Heading from '@/components/heading/Heading';
import Button from '@/components/button/Button';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

export const categories = [
    {id: 1, name: 'women'},
    {id: 2, name: 'men'},
    {id: 3, name: 'kids'},
    {id: 4, name: 'life'},
    {id: 5, name: 'pet'}
]

const sortCatA = ['원피스','신발','가방']
const sortCatB = ['셔츠','바지','가방']
const sortCatC = ['여아','남아','가방']
const sortCatD = ['홈','키친','뷰티']
const sortCatE = ['가구','매트','의류']

const initialState = {
    name: '',
    thumbnailURL: '',
    imageURL: '',
    originPrice: 0,
    salePrice: 0,
    category: '',
    sortCat: '',
    brand: '',
    desc: '',
}

const AddProductClient = () => {

    const [product, setProduct] = useState({...initialState});
    const [sortCat, setSortCat] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});

        // 여기서 2차분류 set 설정
        if (value === 'women') setSortCat(sortCatA)
        else if (value === 'men') setSortCat(sortCatB)
        else if (value === 'kids') setSortCat(sortCatC)
        else if (value === 'life') setSortCat(sortCatD)
        else if (value === 'pet') setSortCat(sortCatE)
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

    }
    const addProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            // 컬렉션에 추가
            addDoc(collection(db, "products"), {
                name: product.name,
                thumbnailURL: product.thumbnailURL,
                imageURL: product.imageURL,
                originPrice: Number(product.originPrice),
                salePrice: Number(product.salePrice),
                category: product.category,
                sortCat: product.sortCat,
                brand: product.brand,
                desc: product.desc,
                createdAt: Timestamp.now().toDate()
            })

            setIsLoading(false);
            setProduct({...initialState});
            toast.success('상품을 저장했습니다.');
            router.push('/admin/all-products');
        }
        catch (error) {
            setIsLoading(false);
            toast.error(getErrorMessage(error));
        }
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
                    value={product.name}
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
                <label>정상가:</label>
                <input 
                    type='number'
                    placeholder='정상가'
                    required
                    name='originPrice'
                    value={product.originPrice}
                    onChange={(e)=>handleInputChange(e)}
                />
                <label>판매가:</label>
                <input 
                    type='number'
                    placeholder='판매가'
                    required
                    name='salePrice'
                    value={product.salePrice}
                    onChange={(e)=>handleInputChange(e)}
                />
                <label>카테고리:</label>
                <select
                    name='category'
                    value={product.category}
                    required
                    onChange={(e)=>handleSelectChange(e)}
                >
                    <option
                        value=""
                        disabled
                    >
                        -- 상품 카테고리 선택
                    </option>
                    {
                        categories.map((cat)=>{
                            return(
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            )
                        })
                    }
                </select>
                <select
                    name="sortCat"
                    value={product.sortCat}
                    required
                    onChange={(e)=>{handleInputChange(e)}}
                >
                    <option
                        value=""
                        disabled
                    >
                        -- 카테고리 분류
                    </option>
                    {
                        sortCat.map((cat,idx)=>{
                            return(
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            )
                        })
                    }
                </select>
                <label>상품 브랜드/회사:</label>
                <input 
                    type='text'
                    placeholder='상품 브랜드/회사'
                    name='brand'
                    value={product.brand}
                    onChange={(e)=>handleInputChange(e)}
                />
                <label>상품 설명:</label>
                <textarea
                    name='desc'
                    cols={10}
                    rows={10}
                    value={product.desc}
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