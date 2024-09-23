import Link from 'next/link'
import React from 'react'

type Props = {
  children: JSX.Element
}

const LayoutExternal = ({ children }: Props) => {
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
          <Link href={'/creator/login'} >Login</Link>
        </li>
      </ul>

      {/* main app */}
      {children}
    </div>
  )
}

export default LayoutExternal