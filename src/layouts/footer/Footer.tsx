'use client'
import React, { useState, FormEvent } from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import { BiLogoFacebookCircle, BiLogoInstagramAlt, BiLogoPinterest, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import Button from '@/components/button/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Footer = () => {

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const router = useRouter();

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

  return(
    <footer>
      {/* 중단 */}
      <div className={styles.contact}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <h3>Let's stay in touch</h3>
            <p>Sign up to our newsletter so we can welcome you to the Diptyque community and keep you posted on new launches, events, special offers and more.</p>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputBox}>
                <label htmlFor='contact'>ENTER YOUR EMAIL ADDRESS</label>
                <input 
                  type='email'
                  id='contact'
                  placeholder='Enter your email address'
                  value={value}
                  onChange={(e)=>setValue(e.target.value)}
                />
              </div>
              <div>
                {
                  errorMessage ? <div className={styles.errorMessage}>This is a required field</div> : null
                }
              </div>
              <Button type='submit' width='100%'>
                SUBSCRIBE
              </Button>
            </form>
          </div>

          <div className={styles.col}>
            <h3>Need help?</h3>
            <p>We are here to assist you</p>
            <Button type='button' onClick={handleClick}>
              CONTACT US
            </Button>
            <div>
              <span>0800 840 0010</span>
            </div>
            <div>
              <span>Monday - Friday : 10 am to 7 pm</span>
            </div>
            <div>
              <span>Saturday: 10 am to 5 pm</span>
            </div>
            <Link href={'/'}>Help Center</Link>
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
                <span><Link href={"/"}>Track your order</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Shipping & Delivery</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Return an item</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Help Center/FAQs</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Find your nearest boutique</Link></span>
              </li>
            </ul>
          </div>

          <div className={styles.menuwrap}>
            <div className={styles.title}>
              <span>SERVICES</span>
            </div>
            <ul className={styles.menulist}>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Our services</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Find the ideal gift</Link></span>
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
                <span><Link href={"/"}>Terms and Conditions</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Terms of use</Link></span>
              </li>
              <li className={styles.menuitem}>
                <span><Link href={"/"}>Privacy policy and cookie policy</Link></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer