'use client'
import React, { useState } from 'react'
import { auth } from '@/firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

const ResetClient = () => {

    const [email, setEmail] = useState('');

    // 비밀번호 초기화 시스템
    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
        .then(()=>{
            toast.success('비밀번호 업데이트를 위해서 이메일을 체크해주세요.');
        })
        .catch((error)=>{
            toast.error(error.message);
        })
    }
    
  return (
    <div>ResetClient</div>
  )
}

export default ResetClient