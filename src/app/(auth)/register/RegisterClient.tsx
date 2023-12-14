'use client'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const RegisterClient = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const router = useRouter();
    
    // 회원가입 시스템
    const registerUser = (e) => {
        e.preventDefault();

        // 1. 비밀번호 체크 실패한 경우
        if (password != cPassword) {
            return toast.error('비밀번호가 일치하지 않습니다.');
        }

        // 2. 이메일 회원가입한 경우
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // 유저정보
            console.log('user:', user)
            
            toast.success('등록 성공');
            router.push('/login');
        })
        .catch((error)=>{toast.error(error.message)})
    }
    
    
  return (
    <div>RegisterClient</div>
  )
}

export default RegisterClient