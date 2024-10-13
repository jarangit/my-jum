
"user client"
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userService } from '@/services/api/public/userService'
import ProfileDetailTemplate from '@/components/ui-system/templates/profile-detail-template'
import { productService } from '@/services/api/public/productService'
type Props = {}

const UserProfile = (props: Props) => {
  const { query } = useRouter()
  const [user, setUser] = useState<any>()
  const [products, setProducts] = useState<any[]>([])

  const onGetUser = useCallback(async (id: number) => {
    try {
      const res = await userService.getUserById(id)
      if (res && res.data) {
        setUser(res.data)
      }
    } catch (error) {
      console.log("🚀 ~ onGetUser ~ error:", error)
    }
  }, [query])

  const onGetProductByOwner = useCallback(async (id: number) => {
    try {
      const res: any = await productService.getProductByUserId(id)
      if (res && res.data) {
        setProducts(res.data)
      }
    } catch (error) {
    }
  }, [query])

  useEffect(() => {
    if (query.id) {
      onGetUser(+query.id)
      onGetProductByOwner(+query.id)
    }
  }, [query])

  return (
    <div>
      {/* <h1>Profile</h1>
      <div>{user?.username}</div>
      <div>{user?.email}</div> */}
      <ProfileDetailTemplate
        userData={user}
        userProduct={products}
      />
    </div>
  )
}

export default UserProfile