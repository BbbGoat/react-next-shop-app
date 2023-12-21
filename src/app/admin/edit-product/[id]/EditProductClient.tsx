"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../add-product/AddProduct.module.scss";
import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import { useRouter } from "next/navigation";
import useFetchDocument from "@/hooks/useFetchDocument";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { categorySort, categories } from "../../add-product/AddProductClient";
import Button from "@/components/button/Button";

const EditProductClient = () => {
  const { id } = useParams() as { id: string };
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCat, setSortCat] = useState<string[]>([]);
  const router = useRouter();

  const { document } = useFetchDocument("products", id);
  const [product, setProduct] = useState(document);

  useEffect(() => {
    setProduct(document);
    
    if (document!) {
      if (document.category === 'women') setSortCat(categorySort[0])
      else if (document.category === 'men') setSortCat(categorySort[1])
      else if (document.category === 'kids') setSortCat(categorySort[2])
      else if (document.category === 'life') setSortCat(categorySort[3])
      else if (document.category === 'pet') setSortCat(categorySort[4])
    }

  }, [document]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

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
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // 진행률
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          // 3. storage 이미지URL db 저장용 세팅
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            newArr.push(downloadURL);
            setProduct({ ...product, imageURL: newArr });
          });
        }
      );
    }
  };
  const handleThumbChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, thumbnailURL: downloadURL });
        });
      }
    );
  };

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

  const editProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // null 방지
    if (!product || !document) return;

    // 신규 이미지 경로가 다를 경우 기존 이미지 지우기
    if (product.imageURL !== document.imageURL) {
      const storageRef = ref(storage, document.imageURL);
      deleteObject(storageRef);
    }
    if (product.thumbnailURL !== document.thumbnailURL) {
      const storageRef = ref(storage, document.thumbnailURL);
      deleteObject(storageRef);  
    }
    
    try {
      // 도큐먼트 수정
      setDoc(doc(db, "products", id), {
        name: product.name,
        thumbnailURL: product.thumbnailURL,
        imageURL: product.imageURL,
        originPrice: Number(product.originPrice),
        salePrice: Number(product.salePrice),
        category: product.category,
        sortCat: product.sortCat,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      toast.success("상품이 성공적으로 수정되었습니다.");
      router.push("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <Heading title="상품 수정하기" />
        {product === null ? <Loader /> : (
          <form onSubmit={editProduct}>
            <label>상품 이름:</label>
            <input
              type="text"
              placeholder="상품 이름"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <div>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <label>대표 이미지:</label>
              <input
                type="file"
                placeholder="대표 이미지"
                accept="image/jpeg, image/webp"
                name="image"
                onChange={(e) => handleThumbChange(e)}
              />
              {product.thumbnailURL === "" ? null : (
                <input type="text" name="thumbnailURL" disabled value={product.thumbnailURL} placeholder="이미지 URL" />
              )}
            </div>
            <div>
              <label>상세 이미지:</label>
              <input
                type="file"
                multiple
                placeholder="상세 이미지"
                accept="image/jpeg, image/webp"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL.length === 0
                ? null
                : product.imageURL.map((item :string) => {
                    return (
                      <input type="text" name="imageURL" disabled value={item} placeholder="이미지 URL" key={item} />
                    );
                  })}
            </div>
            <label>정상가:</label>
            <input
              type="number"
              placeholder="정상가"
              required
              name="originPrice"
              value={product.originPrice}
              onChange={(e) => handleInputChange(e)}
            />
            <label>판매가:</label>
            <input
              type="number"
              placeholder="판매가"
              required
              name="salePrice"
              value={product.salePrice}
              onChange={(e) => handleInputChange(e)}
            />
            <label>카테고리:</label>
            <select name="category" value={product.category} required onChange={(e) => handleSelectChange(e)}>
              <option value="" disabled>
                -- 상품 카테고리 선택
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <select
              name="sortCat"
              value={product.sortCat}
              required
              onChange={(e) => {
                handleInputChange(e);
              }}
            >
              <option value="" disabled>
                -- 카테고리 분류
              </option>
              {sortCat.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
            <label>상품 브랜드/회사:</label>
            <input
              type="text"
              placeholder="상품 브랜드/회사"
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label>상품 설명:</label>
            <textarea
              name="desc"
              cols={10}
              rows={10}
              value={product.desc}
              required
              onChange={(e) => handleInputChange(e)}
            ></textarea>
            <Button type="submit">상품 생성</Button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProductClient;
