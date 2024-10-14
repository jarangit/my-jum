import useOutsideClick from '@/hooks/useClickOutsite'
import { useAppSelector } from '@/store/hook'
import { userState } from '@/store/redux/slice/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { HiOutlineCollection } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

type Props = {
  _isOpen: boolean
  _onClose: () => void
}

const MenuPopup = ({ _isOpen, _onClose }: Props) => {

  const userState = useAppSelector(state => state.userState.user)
  const popupRef = React.useRef(null)
  const router = useRouter()
  const onLogout = () => {
    sessionStorage.removeItem("token")
    window.location.reload()
  }

  const onClose = useCallback(() => {
    _onClose()
  }, [_isOpen])

  useOutsideClick(popupRef, onClose)


  useEffect(() => {
    onClose()
  }, [router.pathname])


  return (
    <>
      {_isOpen ? (
        <div ref={popupRef} className=' rounded-xl shadow-lg absolute z-50 bg-white  right-0 mt-3 w-[228px] overflow-hidden'>
          <div className='flex flex-col divide-y items-center w-full'>
            <Link href={`/profile/${userState.id}`} className='p-3 w-full cursor-pointer flex gap-2 items-center hover:bg-black transition-all hover:text-white'>
              <CgProfile size={20} />
              <div>Profile</div>
            </Link>
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
      ) : ''}
    </>
  )
}

export default MenuPopup