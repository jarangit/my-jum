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
import ModalContent from '../ui-system/molecules/modals/products/modal-content'
import MenuPopup from '../ui-system/molecules/popups/menu-popup'
import TopMenuEX from './menus/topMenuEX'
import SideMenuEx from './menus/sideMenuEx'

type Props = {
  children: JSX.Element
}

const list = [
  {
    label: 'Profile',
    icon: <CgProfile size={20} />,
    onClick: () => console.log('profile')
  },
  {
    label: 'Collector',
    icon: <HiOutlineCollection size={20} />,
    onClick: () => console.log('collector')
  },
  {
    label: 'Setting',
    icon: <IoSettingsOutline size={20} />,
    onClick: () => console.log('setting')
  },
  {
    label: 'Logout',
    icon: <MdLogout size={20} />,
    onClick: () => console.log('logout')
  }
]

const LayoutExternal = ({ children }: Props) => {
  const userState = useAppSelector(state => state.userState.user)
  const { pathname, push } = useRouter()
  const dispatch = useAppDispatch()
  const [user, setUser] = useState(false)
  const [openPopupMenu, setOpenPopupMenu] = useState(false)
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
    <>
      <div className=' fixed w-full z-50'>
        <TopMenuEX />
      </div>
      <div className="max-w-[1600px] mx-auto px-6 pb-24 ">
        <Head>
          <title>MCS</title>
          <meta
            name="description"
            content="A brand all about coding passion and success"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        {/* main app */}

        <div className='pt-24'>
          {children}
        </div>

        {/* modal zone */}
        <Modal />
        <ModalContent />
      </div>
    </>
  )
}

export default LayoutExternal