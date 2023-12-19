import { db } from '@/firebase/firebase';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useFetchDocument = (collectionName: string, documentID: string) => {

    const [document, setDocument] = useState<DocumentData | null>(null);

    const getDocument = useCallback( async ()=>{
        // DB에서 가져올 데이터 선택
        const docRef = doc(db, collectionName, documentID);
        // getDoc()으로 데이터 가져오기
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const obj = {
                id: documentID,
                ...docSnap.data()
            }
            setDocument(obj);
        }
        else {
            toast.error("Document not found");
        }

    }, [collectionName, documentID])

    // 자동호출
    useEffect(()=>{
        getDocument();
    }, [getDocument])
    
    return { document }
}

export default useFetchDocument