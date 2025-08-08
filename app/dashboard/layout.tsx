"use client";
import ChatInterface from '@/components/chat';
import React from 'react'

type Props = {
    children : React.ReactNode;
}


const Layout = (props: Props) => {
    return (
        <div className="min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">Dashboard Header</h1>
            </header>
            <main className="p-4 h-screen">
                {props.children}
            </main>
            <div className=' flex justify-center sticky bottom-15 z-50'>
                <ChatInterface />
            </div>
        </div>
  )
}

export default Layout