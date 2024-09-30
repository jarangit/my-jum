import { productServiceApi } from '@/services/api/productService'
import { useAppDispatch } from '@/store/hook'
import { openCenterModal } from '@/store/redux/slice/ui-state'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}
interface IFormInput {
  name: string,
  description: string,
  price: number,
  stock: number
}

const Create = (props: Props) => {
  const { register, handleSubmit } = useForm<IFormInput>()
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
  return (
    <div>
      <div>Create Product</div>

      <form action="" onSubmit={handleSubmit(onCreateProduct)}>
        <div className='flex flex-col gap-4'>
          <input type="text" placeholder='name' {...register('name')} />
          <input type="text" placeholder='description' {...register('description')} />
          <input type="number" placeholder='price' {...register('price')} />
          <input type="number" placeholder='stock' {...register('stock')} />
          <button type="submit" >Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create