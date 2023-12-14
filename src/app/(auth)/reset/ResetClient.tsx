'use client'
import React, { useState } from 'react'
import { auth } from '@/firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import Loader from '@/components/loader/Loader'
import styles from "./ResetClient.module.scss";
import Heading from '@/components/heading/Heading'
import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import Link from 'next/link'

const ResetClient = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 비밀번호 초기화 시스템
    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
        .then(()=>{
            setIsLoading(false);
            toast.success('비밀번호 변경을 위한 이메일을 발송했습니다. 이메일을 확인해주세요.');
        })
        .catch((error)=>{
            setIsLoading(false);
            toast.error(error.message);
        })
    }
    
  return (
    <>
        { isLoading && <Loader /> }

        <section className={styles.page}>
            <div className={styles.container}>
                <div className={styles.form}>
                    <Heading 
                        title='비밀번호 업데이트'
                        subtitle='이메일 주소를 입력해주세요.'
                    />

                    <form onSubmit={resetPassword}>
                        <Input 
                            id='reset'
                            label='reset'
                            type='text'
                            placeholder='Email'
                            required
                            value={email}
                            className={styles.control}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <div>
                            <Button type='submit'>
                                업데이트
                            </Button>
                        </div>
                        <div className={styles.links}>
                            <p>
                                <Link href={'/login'}>로그인</Link>
                            </p>
                            <p>
                                <Link href={'/register'}>회원가입</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default ResetClient