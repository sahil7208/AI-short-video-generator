"use client"
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { useEffect } from 'react'
import AppSidebar from './components/AppSidebar';
import AppHeader from './components/AppHeader';
import { useAuthContext } from '../provider';
import { useRouter } from 'next/navigation';

 const DashboardProvider = ({children}) => {

    const {user} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        user && CheckedUserAuthenticate();
    },[user])

    const CheckedUserAuthenticate = () => {
        if(!user){
            router.replace('/')
        }
    }

  return (
    <SidebarProvider >
        <AppSidebar/>
    <div className='w-full'>
        <AppHeader/>
        <div className='w-full'>
        {children}
        </div>
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider;
