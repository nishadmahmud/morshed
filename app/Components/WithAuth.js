'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {

   const Wrapper = (props) => {
    const router  = useRouter();

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const token = localStorage.getItem('token');
            if(!token){
                router.push('/login')
            } 
        }
        // const intendedUrl = window.location.pathname;
    },[router])

    return <WrappedComponent {...props}/>
   }

   return Wrapper;
};

export default WithAuth;