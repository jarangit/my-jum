import { useAppDispatch, useAppSelector } from '@/store/hook'
import { userState, initUser } from '@/store/redux/slice/userSlice'
import { isTokenExp } from '@/utils/checkToken'
import { jwtDecode } from 'jwt-decode'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from '../internal/modal'
import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'
import { userService } from '@/services/api/userService'
import { IoMdLogOut } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { HiOutlineCollection } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

type Props = {
  children: JSX.Element
}



const LayoutExternal = ({ children }: Props) => {
  const userState = useAppSelector(state => state.userState.user)
  const { pathname, push } = useRouter()
  const dispatch = useAppDispatch()
  const [user, setUser] = useState(false)
  const onLogout = () => {
    sessionStorage.removeItem("token")
    window.location.reload()
  }
  const checkToken = async () => {
    const token: string = sessionStorage.getItem('token') as ''
    const isExp = isTokenExp(token)
    if (!token || isExp) {
    } else {
      const decode: any = jwtDecode(token)
      if (!userState.id) {
        console.log('set data')
        await onGetUserById(decode.sub)
        // dispatch(initUser({
        //   id: decode.sub,
        //   username: decode.username
        // }))
      }
    }
  }

  const onGetUserById = useCallback(async (id: number) => {
    try {
      const res: any = await userService.getUserById(id)
      if (res) {
        dispatch(initUser({
          id: res.id,
          username: res.username,
          profileImage: res.profileImage
        }))
      }
    } catch (error) {
      console.log("🚀 ~ onGetUserById ~ error:", error)
    }
  }, [])

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setUser(!isTokenExp(token))
      checkToken()
    }
  }, [pathname, user])

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <Head>
        <title>MCS</title>
        <meta
          name="description"
          content="A brand all about coding passion and success"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ul className=" flex items-center gap-4 py-3 justify-end">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Collections</Link>
        </li>
        <li>
          <Link href="/">Community</Link>
        </li>
        <li>
          <Link href="/creator">Admin</Link>
        </li>
        {user && (
          <li className='relative'>
            <div className='flex min-w-32 px-3 items-center gap-2 bg-black rounded-full text-white p-1 pl-1'>
              <div>
                {userState?.profileImage ? (
                  <Image
                    src={userState?.profileImage}
                    alt='profile'
                    width={100}
                    height={100}
                    className='rounded-full w-[30px] h-[30px] object-cover '
                  />
                ) : <FaUserCircle size={25} />
                }
              </div>
              <div className='cursor-pointer text-sm'>{userState?.username}</div>
              {/* <MdLogout size={25} onClick={() => onLogout()} className='cursor-pointer ml-3' /> */}
            </div>
            <div className='border rounded-xl shadow-lg absolute z-50 bg-white  right-0 mt-3 w-[228px] overflow-hidden'>
              <div className='flex flex-col divide-y items-center w-full'>
                <div className='p-3 w-full cursor-pointer flex gap-2 items-center hover:bg-black transition-all hover:text-white'>
                  <CgProfile size={20} />
                  <div>Profile</div>
                </div>
                <Link href={'/creator'} className='p-3 w-full cursor-pointer flex gap-2 items-center hover:bg-black transition-all hover:text-white'>
                  <HiOutlineCollection size={20} />
                  <div>Collector</div>
                </Link>
                <div className='p-3 w-full cursor-pointer flex gap-2 items-center hover:bg-black transition-all hover:text-white'>
                  <IoSettingsOutline size={20} />
                  <div>Setting</div>
                </div>
                <div onClick={() => onLogout()} className='p-3 w-full cursor-pointer flex gap-2 items-center hover:bg-black transition-all hover:text-white'>
                  <MdLogout size={20} />
                  <div>Logout</div>
                </div>
              </div>
            </div>
          </li>
        )}
        <li>
          {user ? (
            <></>
          ) : (
            <Link href={'/login'} >Login</Link>
          )}
        </li>
      </ul>

      {/* main app */}
      {children}
      <Modal />
    </div>
  )
}

export default LayoutExternal