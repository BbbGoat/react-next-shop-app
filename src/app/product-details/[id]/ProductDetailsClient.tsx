"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProductDetailsClient.module.scss";
import priceFormat from "@/utils/priceFormat";
import Button from "@/components/button/Button";
import ProductReviewItem from "@/components/product/productReviewItem/ProductReviewItem";
import Link from "next/link";
import { useParams } from "next/navigation";
import tableData from "./tableData";
import { useDispatch, useSelector } from "react-redux";
import useFetchDocument from "@/hooks/useFetchDocument";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "@/redux/slice/cartSlice";
import { useRouter } from "next/navigation";

const ProductDetailsClient = () => {
  const [count, setCount] = useState(1);
  const [className, setClassName] = useState("상품상세정보");
  const [scrollY, setScrollY] = useState(0);
  const [image, setImage] = useState<string[]>([]);

  const { id } = useParams() as { id: string };
  const dispatch = useDispatch();
  const router = useRouter();

  // 특정 도큐먼트 찾아오는 용도
  const { document: product } = useFetchDocument("products", id);

  // 조건 부합하는 다중 도큐먼트 찾아오는 용도
  // => id 일치하는 리뷰들 찾아올때 사용할 예정

  // 하단영역 스크롤 이벤트 위한 설정들
  const element1 = useRef<HTMLDivElement | null>(null);
  const element2 = useRef<HTMLDivElement | null>(null);
  const element3 = useRef<HTMLDivElement | null>(null);
  const eleTop1 = element1.current?.offsetTop;
  const eleTop2 = element2.current?.offsetTop;
  const eleTop3 = element3.current?.offsetTop;

  // 클릭하면 발생하는 위치 이동 이벤트
  const onMoveScroll = (element: React.MutableRefObject<HTMLDivElement | null>) => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 스크롤 위치 값 감지하는 콜백함수
  const handleScrollY = useCallback(() => {
    let pos = window.scrollY;
    setScrollY(pos);
    if (pos >= eleTop1!) setClassName("상품상세정보");
    if (pos >= eleTop2!) setClassName("리뷰");
    if (pos >= eleTop3!) setClassName("QnA");
  }, [scrollY]);

  // 카트 추가 함수
  const addToCart = () => {
    dispatch(ADD_TO_CART({...product, quantity: count}))
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const checkout = () => {
    dispatch(ADD_TO_CART({...product, quantity: count}))
    dispatch(CALCULATE_TOTAL_QUANTITY());
    router.push('/cart');
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [scrollY]);

  // 임시 더미 데이터 - 리뷰
  const reviews: any[] = [];

  useEffect(()=>{
    if (product) {
      setImage([...product.imageURL])
    }
  }, [product])


  return (
    <main className={styles.product}>
      {product === null ? (
        <Loader />
      ) : (
        <>
           {/* 모바일 노출용 썸네일 박스 */}
           <div className={styles.mImageBox}>
            <div className={styles.thumb}>
              <div className={styles.inner}>
                <Image src={product.thumbnailURL} alt={"대표 이미지"} width={670} height={800} />
              </div>
            </div>
          </div>
          
          <section className={styles.section1}>
            <div className={styles.gallery}>
              <div className={styles.content}>
                <div className={styles.imgWrap}>
                  {image.sort((a,b)=>a.localeCompare(b)).map((src: string, idx: number) => {
                    return (
                      <div className={styles.item} key={idx}>
                        <div className={styles.inner}>
                          <Image src={src} alt={"상세 이미지"} width={670} height={800} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.content}>
                <div className={styles.header}>
                  <p className={styles.brand}>{product.brand.toUpperCase()}</p>
                  <p className={styles.name}>{product.name}</p>
                  <div className={styles.price}>
                    <p className={styles.originPrice}>
                      {product.originPrice != product.salePrice ? priceFormat(product.originPrice) : null}
                    </p>
                    <p className={styles.totalPrice}>
                      <span>{priceFormat(product.salePrice)}</span>
                      <span className={styles.percent}>
                        {product.originPrice === product.salePrice ? null : (
                          <>
                            {Math.round(
                              Math.abs(((product.salePrice - product.originPrice) / product.originPrice) * 100)
                            )}
                            % OFF
                          </>
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                <div className={styles.optionBox}>
                  <p>제품 이미지</p>
                  <div className={styles.imgWrap}>
                    {image.sort((a,b)=>a.localeCompare(b)).map((src: string, idx: number) => {
                      return (
                        <div className={styles.optionList} key={idx}>
                          <Image src={src} alt={"상세 이미지"} width={158} height={211} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.countBox}>
                  <div className={styles.titleWrap}>
                    <p className={styles.tit}>합계</p>
                    <p className={styles.totalAmount}>{priceFormat(product.salePrice * count)}원</p>
                  </div>
                  <div className={styles.countBtn}>
                    <button
                      className={styles.mimus}
                      onClick={() => setCount((prev) => prev - 1)}
                      disabled={count > 1 ? false : true}
                    >
                      -
                    </button>
                    <p>
                      <b>{priceFormat(count)}</b>
                    </p>
                    <button className={styles.plus} onClick={() => setCount((next) => next + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.btnBox}>
                  <Button width="100%" secondary onClick={() => addToCart()}>
                    장바구니
                  </Button>
                  <Button width="100%" onClick={()=>checkout()}>바로구매</Button>
                </div>

                <div className={styles.delivery}>
                  <ul className={styles.list}>
                    <li>
                      <span className={styles.tit}>배송비</span>
                      <span>30,000이상 구매시 무료(도서산간추가 3000원)</span>
                    </li>
                    <li>
                      <span className={styles.tit}>마일리지</span>
                      <span>최대 6% 적립</span>
                    </li>
                    <li>
                      <span className={styles.tit}>포인트</span>
                      <span>0.1% 적립</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <div className={styles.mbtnBox}>
        <Button width="100%" secondary onClick={() => addToCart()}>
          장바구니
        </Button>
        <Button width="100%"  onClick={()=>checkout()}>바로구매</Button>
      </div>

      <section className={styles.section2}>
        <div className={styles.tab_menu}>
          <ul className={styles.tab_nav}>
            <li className={className === "상품상세정보" ? styles.on : ""}>
              <button
                onClick={() => {
                  setClassName("상품상세정보");
                  onMoveScroll(element1);
                }}
              >
                <span>상품상세정보</span>
              </button>
            </li>
            <li className={className === "리뷰" ? styles.on : ""}>
              <button
                onClick={() => {
                  setClassName("리뷰");
                  onMoveScroll(element2);
                }}
              >
                <span>리뷰(0)</span>
              </button>
            </li>
            <li className={className === "QnA" ? styles.on : ""}>
              <button
                onClick={() => {
                  setClassName("QnA");
                  onMoveScroll(element3);
                }}
              >
                <span>Q&amp;A(0)</span>
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.tab_first} ref={element1}>
          <div className={styles.title}>
            <h3>상품고시정보</h3>
          </div>
          <div className={styles.detail_table}>
            <table>
              <caption>상품고시정보</caption>
              <tbody>
                {tableData.map((item, idx) => {
                  const { th, td } = item;
                  return (
                    <tr key={idx}>
                      <th>{th}</th>
                      <td>
                        {td.split("\n").map((line, idx) => {
                          return (
                            <p key={idx}>
                              {line}
                              <br />
                            </p>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* 리뷰시스템 */}
        <div className={styles.tab_second} ref={element2}>
          <div className={styles.title}>
            <h3>상품평</h3>
            <span>상품 구매 후 리뷰 작성시 포인트를 드립니다. (포토리뷰 1,000포인트, 텍스트리뷰 300포인트 증정)</span>
            <Button>
              <Link href={`/review-product/${id}`}>리뷰작성</Link>
            </Button>
          </div>
          <div className={styles.detail_review}>
            {reviews.length === 0 ? (
              <p className={styles.noReviewText}>
                지금 첫 리뷰를 작성해주세요.
                <br />
                포토리뷰 1,000포인트, 텍스트 리뷰 300포인트를 증정합니다. (상품구매시)
              </p>
            ) : (
              <>
                {reviews.map((item) => {
                  return (
                    <ProductReviewItem
                      key={item.id}
                      rate={item.rate}
                      review={item.review}
                      reviewDate={item.reviewDate}
                      userName={item.userName}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className={styles.tab_third} ref={element3}>
          <div className={styles.title}>
            <h3>상품 Q&amp;A</h3>
            <span>
              상품에 대한 배송, 교환, 취소등의 자세한 문의사항은 고객센터 &gt; 1:1문의를 이용하여 주시기 바랍니다.
            </span>
            <Button>
              <Link href={"/"}>문의하기</Link>
            </Button>
          </div>
          <div className={styles.detail_qna}>
            <p>등록된 상품문의가 없습니다.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsClient;
