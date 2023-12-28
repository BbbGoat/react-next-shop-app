'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './AddProduct.module.scss'
import Loader from '@/components/loader/Loader';
import Heading from '@/components/heading/Heading';
import Button from '@/components/button/Button';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db, storage } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const categories = [
    {id: 1, name: 'women'},
    {id: 2, name: 'men'},
    {id: 3, name: 'kids'},
    {id: 4, name: 'life'},
    {id: 5, name: 'pet'}
]

export const categorySort = [
    ['원피스','신발','가방'],
    ['셔츠','바지','가방'],
    ['여아','남아','가방'],
    ['홈','키친'],
    ['가구','매트','의류'],
]

const initialState = {
    name: '',
    thumbnailURL: '',
    imageURL: [] as string[],
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
    const [uploadProgress, setUploadProgress] = useState(0);

    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});

        // 여기서 2차분류 set 설정
        if (value === 'women') setSortCat(categorySort[0])
        else if (value === 'men') setSortCat(categorySort[1])
        else if (value === 'kids') setSortCat(categorySort[2])
        else if (value === 'life') setSortCat(categorySort[3])
        else if (value === 'pet') setSortCat(categorySort[4])
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files;
        const newArr: string[] = [];
        
        for (let i = 0; i < file.length; i++) {
            const ele = file[i];
            
            // 1. 저장할 이미지 storage 위치 참조
            const storageRef = ref(storage, `images/${Date.now()}${ele.name}`);

            // 2. 업로드 진행
            const uploadTask = uploadBytesResumable(storageRef, ele);
            uploadTask.on('state_changed', 
                (snapshot)=>{
                    // 진행률
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error)=>{toast.error(error.message)},
                ()=>{
                    // 3. storage 이미지URL db 저장용 세팅
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL)=>{
                        newArr.push(downloadURL)
                        setProduct({...product, imageURL: newArr});
                    })
                }
            )
        }
    }
    const handleThumbChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error)=>{toast.error(error.message)},
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{
                    setProduct({...product, thumbnailURL: downloadURL});
                })
            }
        )
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
            setUploadProgress(0);
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
        <div className={styles.title}>
            <Heading title='새 상품 생성하기' />
        </div>
        <div className={styles.product}>
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
                    {
                        uploadProgress === 0 ? null :
                        <div className={styles.progress}>
                            <div
                                className={styles["progress-bar"]}
                                style={{width: `${uploadProgress}%`}}
                            >
                                {uploadProgress < 100
                                ? `Uploading... ${uploadProgress}%`
                                : `Upload Complete ${uploadProgress}%`
                                }
                            </div>
                        </div>
                    }
                    <label>대표 이미지:</label>
                    <input 
                        type='file'
                        placeholder='대표 이미지'
                        accept='image/jpeg, image/webp'
                        name='image'
                        required
                        onChange={(e)=>handleThumbChange(e)}
                    />
                    {product.thumbnailURL === "" ? null :
                        <input 
                            type='text'
                            name='thumbnailURL'
                            disabled
                            value={product.thumbnailURL}
                            placeholder='이미지 URL'
                        />
                    }
                </div>
                <div>
                    <label>상세 이미지:</label>
                    <input 
                        type='file'
                        multiple
                        placeholder='상세 이미지'
                        accept='image/jpeg, image/webp'
                        name='image'
                        required
                        onChange={(e)=>handleImageChange(e)}
                    />
                    {product.imageURL.length === 0 ? null : product.imageURL.map((item)=>{
                        return(
                            <input 
                                type='text'
                                name='imageURL'
                                disabled
                                value={item}
                                placeholder='이미지 URL'
                                key={item}
                            />
                        )
                    })
                    }
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