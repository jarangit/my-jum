import { productServiceApi } from '@/services/api/productService'
import { useAppSelector } from '@/store/hook'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'

type Props = {}

const ProductPage = (props: Props) => {
  const user = useAppSelector(state => state.userState.user)
  const { push, pathname } = useRouter()
  const [products, setProducts] = useState([])

  // function zone 
  const onGetProducts = useCallback(async (id: number) => {
    try {
      const res = await productServiceApi.getProductByUserId(id)
      if (res) {
        setProducts(res.data)
      }
    } catch (error) {

    }
  }, [])

  const onDelete = async (id: string) => {
    try {
      await productServiceApi.deleteProduct(id)
    } catch (error) {
      console.log("🚀 ~ onDelete ~ error:", error)

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
        <h1 className='text-2xl font-bold'>Product</h1>
        <button onClick={() => push(`${pathname}/create`)}>Create</button>
      </div>

      {/* product list */}
      <div className='w-full flex flex-col gap-6'>
        {products.map((item: any, key: any) => (
          <div key={key} className='flex justify-between border w-full p-3 shadow-md'>
            <div>
              <div>{item.name}</div>
              <div className={`${item.collection?.name ? "chip" : "hidden"}`}>{item.collection?.name}</div>
            </div>
            <MdDelete className='text-red' onClick={() => onDelete(item.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPage