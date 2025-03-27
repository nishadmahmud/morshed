'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import useStore from '../CustomHooks/useStore';

const WithAuth = (WrappedComponent) => {

   const Wrapper = (props) => {
    const router  = useRouter();
    const {setIsLoginModal} = useStore();

    useEffect(() => {
        const intendedUrl = window.location.pathname;
        const token = localStorage.getItem('token');
        if(!token){
            router.push(`/?redirect=${intendedUrl}&login=false`);
            setIsLoginModal(true);
        } 
    },[router,setIsLoginModal])

    return <WrappedComponent {...props}/>
   }

   return Wrapper;
};

export default WithAuth;