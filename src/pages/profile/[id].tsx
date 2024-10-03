
"user client"
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userService } from '@/services/api/public/userService'
type Props = {}

const UserProfile = (props: Props) => {
  const { query } = useRouter()
  const [user, setUser] = useState<any>()

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

  useEffect(() => {
    if (query.id) {
      onGetUser(+query.id)
    }
  }, [query])

  return (
    <div>
      <h1>Profile</h1>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
    </div>
  )
}

export default UserProfile