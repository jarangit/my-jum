"use client"
import { isTokenExp } from '@/utils/checkToken'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Modal from '../internal/modal'
import { jwtDecode } from 'jwt-decode'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { initUser } from '@/store/redux/slice/userSlice'

type Props = {
  children: JSX.Element
}

function LayoutInternal({ children }: Props) {
  // store
  const userState = useAppSelector(state => state.userState.user)
  const { push, pathname } = useRouter()
  const dispatch = useAppDispatch()
  const checkToken = () => {
    const token: string = sessionStorage.getItem('token') as ''
    const isExp = isTokenExp(token)
    if (!token || isExp) {
      return push('/login')
    } else {
      const decode: any = jwtDecode(token)
      if (!userState.id) {
        console.log('set data')
        dispatch(initUser({
          id: decode.sub,
          username: decode.username
        }))
      }
    }
  }

  useEffect(() => {
    checkToken()
  }, [pathname, userState])

  return (
    <div>
      <div className='flex justify-between items-center bg-gray-200 p-3'>
        <div className='text-xl font-bold'>CREATOR</div>
        <ul className=" flex items-center gap-4  justify-end">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/creator">Admin</Link>
          </li>
          <li>
            <Link href="/creator/create-product">Create Product</Link>
          </li>
          {userState.username && (
            <li>{userState.username ?? ''}</li>
          )}
          <li>
            <Link href={'/login'} >Login</Link>
          </li>
        </ul>
      </div>

      {/* main */}
      <div className='grid grid-cols-6 w-full max-w-[1300px] mx-auto min-h-screen gap-4'>
        {/* menu */}
        <div className='col-span-1 bg-gray-100 min-h-screen'>
          <div>
            <ul className=" flex flex-col p-3 gap-4 py-3 justify-end">
              <li>
                <Link href="/creator">Dashboard</Link>
              </li>
              <li>
                <Link href="/creator/product">Product</Link>
              </li>
              <li>
                <Link href="/creator/category">Category</Link>
              </li>
              <li>
                <Link href={'/creator/profile'} >Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* content */}
        <div className='my-4 col-span-5'>
          {children}
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default LayoutInternal