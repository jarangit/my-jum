"use client"
import Modal from '@/components/internal/modal'
import { login } from '@/services/api/userService'
import { useAppDispatch } from '@/store/hook'
import { openCenterModal } from '@/store/redux/slice/ui-state'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const onLogin = async (e: any) => {
    e.preventDefault()
    try {
      const res = await login({ ...formData })
      if (res) {
        push('/creator')
        return res
      }
    } catch (error: any) {
      dispatch(openCenterModal({
        isOpen: true,
        desc1: error.message
      }))
    }
  }
  return (
    <div>
      <div>
        <form action="" className='max-w-[300px]'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="">Username</label>
              <input type="text" placeholder='username' onChange={(e) => setFormData({
                ...formData,
                username: e.target.value
              })} />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="">Password</label>
              <input type="text" placeholder='Password' onChange={(e) => setFormData({
                ...formData,
                password: e.target.value
              })} />
            </div>
            <button onClick={(e) => onLogin(e)}>submit</button>
          </div>
        </form>
      </div>
      <Modal />
    </div>
  )
}

export default LoginPage