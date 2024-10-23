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
import Row from '../../ui-center/row'

type Props = {
  _isOpen: boolean
  _onClose: () => void
  _listMenu: IListMenu[]
}

interface IListMenu {
  label: string
  icon?: JSX.Element
  onClick: () => void
}


const MenuPopup = ({ _isOpen, _onClose, _listMenu }: Props) => {

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
            {_listMenu.map((item, index) => (
              <Row key={index} className='p-3 w-full cursor-pointer  gap-2  hover:bg-black transition-all hover:text-white' onClick={() => item.onClick()}>
                {item.icon ?? ''}
                <div>{item.label}</div>
              </Row>
            ))}
          </div>
        </div>
      ) : ''}
    </>
  )
}

export default MenuPopup