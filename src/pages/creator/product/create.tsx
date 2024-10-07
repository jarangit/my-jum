import { collectionServiceApi } from '@/services/api/collectionServiceApi'
import { productServiceApi } from '@/services/api/productService'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { openCenterModal } from '@/store/redux/slice/ui-state'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {}
interface IFormInput {
  name: string,
  description: string,
  price: number,
  stock: number,
  collectionId: number,
}

const Create = (props: Props) => {
  const user = useAppSelector(state => state.userState.user)
  const { register, handleSubmit } = useForm<IFormInput>()
  const [categories, setCategories] = useState([])
  console.log("🚀 ~ Create ~ categories:", categories)
  const dispatch = useAppDispatch()
  const onCreateProduct = async (data: IFormInput) => {
    const body = {
      product: data
    }
    try {
      await productServiceApi.createProduct(body.product)
    } catch (error) {
      dispatch(openCenterModal({
        title: 'something error',
        isOpen: true
      }))
    }
    finally {
      dispatch(openCenterModal({
        title: 'Create success',
        isOpen: true
      }))
    }
  }
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

  useEffect(() => {
    if (user.id) {
      onGetProducts(user.id)
    }
  }, [user])

  return (
    <div>
      <div>Create Product</div>

      <form action="" onSubmit={handleSubmit(onCreateProduct)}>
        <div className='flex flex-col gap-4'>
          <input type="text" placeholder='name' {...register('name')} />
          <input type="text" placeholder='description' {...register('description')} />
          <input type="number" placeholder='price' {...register('price')} />
          <input type="number" placeholder='stock' {...register('stock')} />
          <select {...register('collectionId')}>
            {categories.map((item: any, key) => (
              <option key={key} value={item.id}>
                <div>{item.name}</div>
              </option>
            ))}
          </select>
          <button type="submit" >Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create