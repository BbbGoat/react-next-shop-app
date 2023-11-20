'use client'
import React, { useState } from 'react'
import styles from './LoginClient.module.scss'
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';
import Image from 'next/image';
import Input from '@/components/input/Input';
import LogoPath from '@/assets/logo.png';
import Link from 'next/link';
import Button from '@/components/button/Button';

const LoginClient = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    const router = useRouter();

    const redirectUser = () => {
        router.push('/');
    }

    const loginUser = () => {}

    const signInWithGoogle = () => {}
    
  return (
    <>
        {isLoading && <Loader />}

        <section className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.logo}>
                    <Link href={'/'}>
                        <Image src={LogoPath} alt="logo" />
                    </Link>
                </h1>

                <form onSubmit={loginUser} className={styles.form}>
                    {/* input */}
                    <Input 
                        email
                        icon="letter"
                        id="email"
                        name="email"
                        label="이메일"
                        placeholder="아이디(이메일)"
                        className={styles.control}
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <Input
                        password
                        icon="lock"
                        id='password'
                        name='password'
                        label='비밀번호'
                        placeholder='비밀번호'
                        className={styles.control}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    {/* 자동 로그인, 비밀번호 수정 */}
                    <div className={styles.group}>
                        
                        <Link href={"/reset"} className={styles.findLink}>
                            비밀번호 수정하기
                            <svg
                                width="11"
                                height="18"
                                viewBox="0 0 11 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.findLinkArrow}
                            >
                                <path d="M1.5 1L9.5 9L1.5 17" stroke="#0074E9" strokeWidth="2" />
                            </svg>
                        </Link>
                    </div>

                    <div className={styles.buttonGroup}>
                        {/* Button */}
                        <Button type='submit' width='100%'>
                            로그인
                        </Button>
                        <Button width='100%' secondary>
                            <Link href={'/register'}>
                                회원가입
                            </Link>
                        </Button>
                        <div>
                            <Button onClick={signInWithGoogle}>
                                구글 로그인
                            </Button>
                        </div>
                    </div>
                </form>

            </div>

        </section>
        
    </>
  )
}

export default LoginClient