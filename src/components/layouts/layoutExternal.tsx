import { isTokenExp } from '@/utils/checkToken'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {
  children: JSX.Element
}



const LayoutExternal = ({ children }: Props) => {
  const { pathname } = useRouter()
  const [user, setUser] = useState(false)
  console.log("🚀 ~ LayoutExternal ~ user:", user)
  const onLogout = () => {
    sessionStorage.removeItem("token")
    window.location.reload()
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setUser(!isTokenExp(token))
    }
  }, [pathname, user])

  return (
    <div className="max-w-[1200px] mx-auto px-6">
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
          {user? (
            <button onClick={() => onLogout()}>Logout</button>
          ) : (
            <Link href={'/login'} >Login</Link>
          )}
        </li>
      </ul>

      {/* main app */}
      {children}
    </div>
  )
}

export default LayoutExternal