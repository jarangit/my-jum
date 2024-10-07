import { collectionServiceApi } from '@/services/api/collectionServiceApi'
import { productServiceApi } from '@/services/api/productService'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { openCenterModal } from '@/store/redux/slice/ui-state'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {}

const CategoryPage = (props: Props) => {
  const user = useAppSelector(state => state.userState.user)
  const { push, pathname } = useRouter()
  const [categories, setCategories] = useState([])
  const dispatch = useAppDispatch()

  // function zone 
  const onGetProducts = useCallback(async (id: number) => {
    try {
      const res = await collectionServiceApi.getCollectionByUserId(id)
      if (res) {
        setCategories(res.data)
      }
    } catch (error) {

    }
  }, [])

  const onDelete = async (id: number) => {
    try {
      await collectionServiceApi.deleteCollection(id)
    } catch (error: any) {
      console.log("🚀 ~ onDelete ~ error:", error)
      dispatch(openCenterModal({
        title: 'Error',
        desc1: error.message,
        desc2: error.response.data.message,
        isOpen: true
      }))
    }
    finally {
      if (user.id) {
        onGetProducts(user.id)
      }
    }
  }

  useEffect(() => {
    if (user.id) {
      onGetProducts(user.id)
    }
  }, [user])
  return (
    <div>
      <div className='flex justify-between'>
        <div>Collection</div>
        <button onClick={() => push(`${pathname}/create`)}>Create</button>
      </div>

      {/* product list */}
      <div className='w-full'>
        {categories.map((item: any, key: any) => (
          <div key={key} className='flex justify-between border w-full'>
            <div>{item.name}</div>
            <button onClick={() => onDelete(item.id)} >Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage