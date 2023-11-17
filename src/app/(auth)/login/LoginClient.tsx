'use client'
import React, { useState } from 'react'
import styles from './LoginClient.module.scss'
import { useRouter } from 'next/router';
import Loader from '@/components/loader/Loader';
import Image from 'next/image';
import Input from '@/components/input/Input';

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
    
  return (
    <>
        {isLoading && <Loader />}

        <section className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.logo}>
                    <Image src={'./'} alt="logo" />
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
                </form>

            </div>

        </section>
        
    </>
  )
}

export default LoginClient