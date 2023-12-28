'use client'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader/Loader'
import styles from '../login/LoginClient.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import LogoPath from '@/assets/logo.svg';
import Input from '@/components/input/Input'
import Button from '@/components/button/Button'

const RegisterClient = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    
    // 회원가입 시스템
    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. 비밀번호 체크 실패한 경우
        if (password != cPassword) {
            return toast.error('비밀번호가 일치하지 않습니다.');
        }

        // 2. 이메일 회원가입한 경우
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // 유저정보
            // console.log('user:', user)
            
            toast.success('등록 성공');
            router.push('/login');
        })
        .catch((error)=>{toast.error(error.message)})
    }
    
    
  return (
    <>
        {isLoading && <Loader />}

        <section className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.logo}>
                    <Link href={'/'}>
                        <Image src={LogoPath} alt="logo" width={300} />
                    </Link>
                </h1>

                <form onSubmit={registerUser} className={styles.form}>
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
                        required
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
                        required
                    />
                    <Input
                        password
                        icon="lock"
                        id='password'
                        name='password'
                        label='비밀번호 확인'
                        placeholder='비밀번호 확인'
                        className={styles.control}
                        value={cPassword}
                        onChange={(e)=>setCPassword(e.target.value)}
                        required
                    />

                    <div className={styles.buttonGroup}>
                        {/* Button */}
                        <Button type='submit' width='100%'>
                            회원가입
                        </Button>
                        <Button width='100%' secondary>
                            <Link href={'/login'}>
                                로그인
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default RegisterClient