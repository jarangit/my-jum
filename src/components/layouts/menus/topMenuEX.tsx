import MenuPopup from '@/components/ui-system/molecules/popups/menu-popup'
import Row from '@/components/ui-system/ui-center/row'
import { userService } from '@/services/api/userService'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { initUser } from '@/store/redux/slice/userSlice'
import { isTokenExp } from '@/utils/checkToken'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import { HiOutlineCollection } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

type Props = {}
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
const TopMenuEX = (props: Props) => {
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
    <div>
      <Row className='items-center justify-between w-full bg-white p-6 border-b'>
        <div className='text-3xl font-bold'>
          <Link href="/">MCS</Link>
        </div>
        <ul className=" flex items-center gap-4 justify-end ">
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
              <div className='flex min-w-32 px-3 items-center gap-2 bg-black rounded-full text-white p-1 pl-1 cursor-pointer' onClick={() => setOpenPopupMenu(!openPopupMenu)}>
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
              <MenuPopup _isOpen={openPopupMenu} _onClose={() => setOpenPopupMenu(false)} _listMenu={list} />
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
      </Row>
    </div>
  )
}

export default TopMenuEX