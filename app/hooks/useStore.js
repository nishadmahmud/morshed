"use client"
import  { useContext } from 'react';
import { context } from '../context/store';

const useStore = () => {
    const store = useContext(context)
    return store;
};

export default useStore;