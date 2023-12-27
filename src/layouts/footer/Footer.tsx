'use client'
import React, { useState, FormEvent } from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import { BiLogoFacebookCircle, BiLogoInstagramAlt, BiLogoPinterest, BiLogoTwitter, BiLogoYoutube, BiSolidPhone } from 'react-icons/bi'
import Button from '@/components/button/Button'
import { toast } from 'react-toastify'
import { usePathname, useRouter } from 'next/navigation'
import classNames from 'classnames'

const Footer = () => {

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === '') {
      return setErrorMessage(true)
    }

    toast.success('전송 성공');
    setErrorMessage(false);
  }
  const handleClick = () => {
    router.push('/login');
  }

  if (isAdmin) return null;
  
  return(
    <footer>
      {/* 중단 */}
      <div className={styles.contact}>
        <div className={styles.grid}>
          <div className={classNames(styles.cols, styles.col1)}>
            <div style={{maxWidth:'400px'}}>
              <h3>newsletter</h3>
              <p>뉴스레터에 가입하시면 D.CODE 커뮤니티에 오신 것을 환영하는 할인 쿠폰과 신상품, 이벤트, 특별 제안 등에 대한 소식을 빠르게 받아보실 수 있습니다.</p>

              <form onSubmit={handleSubmit}>
                <div className={styles.inputBox}>
                  <label htmlFor='contact'>ENTER YOUR EMAIL ADDRESS</label>
                  <input 
                    type='email'
                    id='contact'
                    placeholder='이메일을 입력해주세요.'
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                  />
                </div>
                <div>
                  {
                    errorMessage ? <div className={styles.errorMessage}>이메일은 필수 입력란입니다.</div> : null
                  }
                </div>
                <Button type='submit' width='100%'>
                  SUBSCRIBE
                </Button>
              </form>
            </div>
          </div>

          <div className={classNames(styles.cols, styles.col2)}>
            <h3>need help?</h3>
            <p>친절한 상담으로 도와드립니다.</p>
            <Button type='button'>
              CONTACT US
            </Button>
            <div className={styles.tel}>
              <i><BiSolidPhone size={16} /></i>
              <span>031 - 1234 - 1234</span>
            </div>
            <div>
              <span>Monday - Friday : 10 am to 7 pm</span>
            </div>
            <div>
              <span>Saturday: 10 am to 5 pm</span>
            </div>
            <Link href={'/'} className={styles.help}>Help Center</Link>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        {/* 하단 */}
        <div className={styles.wrapper}>

          <div className={styles.menuwrap}>
            <div className={styles.title}>
              <span>PRACTICAL INFORMATION</span>
            </div>
            <ul className={styles.menulist}>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>주문 추적</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>배송 안내</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>반품 안내</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>헬프센터/FAQs</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>가까운 매장 찾기</Link></span>
              </li>
            </ul>
          </div>

          <div className={styles.menuwrap}>
            <div className={styles.title}>
              <span>SERVICES</span>
            </div>
            <ul className={styles.menulist}>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>회원혜택</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>고객센터</Link></span>
              </li>
            </ul>
          </div>

          <div className={styles.menuwrap}>
            <div className={styles.title}>
              <span>FOLLOW US</span>
            </div>
            <ul className={styles.menulist}>
              <li className={styles.menuitem}>
                <i><BiLogoFacebookCircle size={16} /></i>
                <span><Link href={"/"}>Facebook</Link></span>
              </li>
              <li className={styles.menuitem}>
                <i><BiLogoTwitter size={16} /></i>
                <span><Link href={"/"}>Twitter</Link></span>
              </li>
              <li className={styles.menuitem}>
                <i><BiLogoInstagramAlt size={16} /></i>
                <span><Link href={"/"}>Instagram</Link></span>
              </li>
              <li className={styles.menuitem}>
                <i><BiLogoYoutube size={16} /></i>
                <span><Link href={"/"}>Youtube</Link></span>
              </li>
              <li className={styles.menuitem}>
                <i><BiLogoPinterest size={16} /></i>
                <span><Link href={"/"}>Pinterest</Link></span>
              </li>
            </ul>
          </div>

          <div className={styles.menuwrap}>
            <div className={styles.title}>
              <span>LEGAL</span>
            </div>
            <ul className={styles.menulist}>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>이용약관</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>제휴문의</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>개인정보처리방침</Link></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer