import { collectionServiceApi } from '@/services/api/collectionServiceApi'
import { productServiceApi } from '@/services/api/productService'
import { useAppDispatch } from '@/store/hook'
import { openCenterModal } from '@/store/redux/slice/ui-state'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}
interface IFormInput {
  name: string,
  description: string,
}
const Create = (props: Props) => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const dispatch = useAppDispatch()
  const onCreateProduct = async (data: IFormInput) => {
    const body = {
      product: data
    }
    try {
      await collectionServiceApi.createCollection(body.product)
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
      Create category page
      <div>
        <form action="" onSubmit={handleSubmit(onCreateProduct)}>
          <div className='flex flex-col gap-4'>
            <input type="text" placeholder='name' {...register('name')} />
            <input type="text" placeholder='description' {...register('description')} />
            <button type="submit" >Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create

