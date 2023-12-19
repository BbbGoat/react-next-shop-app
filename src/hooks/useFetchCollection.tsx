'use client'
import { db } from '@/firebase/firebase';
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useFetchCollection = (collectionName: string) => {

    const [data, setData] = useState<DocumentData>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = useCallback(()=>{
        setIsLoading(true);
        try {
            const docRef = collection(db, collectionName);
            const q = query(docRef, orderBy('createdAt', 'desc'));

            onSnapshot(q, (snapshot)=>{
                const allData = snapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }))

                // console.log('allData', allData);
                setData(allData);
                setIsLoading(false);
            })
        } catch (error) {
            setIsLoading(false);
            toast.error(getErrorMessage(error));
        }
    }, [collectionName])

    useEffect(()=>{
        getCollection();
    }, [getCollection])
    
  return { data, isLoading }
}

export default useFetchCollection