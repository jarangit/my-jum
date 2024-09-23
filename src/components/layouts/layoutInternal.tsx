"use client"
import { isTokenExp } from '@/utils/checkToken'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {
  children: JSX.Element
}

function LayoutInternal({ children }: Props) {
  const { push } = useRouter()
  const checkToken = () => {
    const token: string = sessionStorage.getItem('token') as ''
    if (!token) {
      return push('/creator/login')
    }
    const isExp = isTokenExp(token)
    console.log("🚀 ~ checkToken ~ isExp:", isExp)
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <div>
      <div className='flex justify-between items-center bg-blue-500'>
        <div className='text-xl font-bold'>CREATOR</div>
        <ul className=" flex items-center gap-4 py-3 justify-end">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/creator">Admin</Link>
          </li>
          <li>
            <Link href="/creator/create-product">Create Product</Link>
          </li>
          <li>
            <Link href={'/creator/login'} >Login</Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  )
}

export default LayoutInternal