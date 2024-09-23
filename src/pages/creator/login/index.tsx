"use client"
import { login } from '@/services/api/userService'
import React, { useState } from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const onLogin = async (e: any) => {
    e.preventDefault()
    try {
      const res = login({ ...formData })
      console.log("🚀 ~ onLogin ~ res:", res)
    } catch (error) {
      console.log("🚀 ~ onLogin ~ error:", error)
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
    </div>
  )
}

export default LoginPage