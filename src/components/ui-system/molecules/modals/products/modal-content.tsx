import Column from '@/components/ui-system/ui-center/column'
import Grid from '@/components/ui-system/ui-center/grid'
import ModalLayout from '@/components/ui-system/ui-center/modal-layout'
import Row from '@/components/ui-system/ui-center/row'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { _toggleModalProduct } from '@/store/redux/slice/modal-product'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { FaHeart, FaRegHeart, FaUserCircle } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'



const ModalContent = () => {
  const { product: productDataState }: any = useAppSelector(state => state.modalProductState.data)
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null); // Ref สำหรับ Modal

  const [data, setData] = useState<any>({})


  const onClose = () => {
    dispatch(_toggleModalProduct({
      product: {},
      isOpen: false
    }))
  }
  if (!productDataState) return null
  return (
    <ModalLayout>
      <div className='bg-white w-full max-w-[1200px] h-[80vh] rounded-xl backdrop-blur-lg backdrop-brightness-50'>
        <Grid className='grid-cols-1 md:grid-cols-6 p-6 h-full gap-6' >
          {/* image */}
          <div className='col-span-4 h-full '>
            <div className='bg-bg-gray rounded-lg h-full flex justify-center items-center relative'>
              <IoIosCloseCircle className='absolute -top-3 -left-3 cursor-pointer opacity-35' onClick={() => onClose()} size={30} />
              <div className='relative w-full h-[500px]'>
                <Image
                  src={productDataState.thumbnail}
                  alt='thumbnail'
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          </div>
          {/* content */}
          <div className='col-span-2'>
            <Column className=' h-full gap-12'>
              <Column className='gap-3'>
                <Row className='justify-between'>
                  <div className='text-xl font-bold'>{productDataState.name}</div>
                  <Row className='items-center'>
                    {productDataState.isLiked ?
                      <FaHeart className='text-pink cursor-pointer' size={20} /> :
                      <FaRegHeart className='cursor-pointer' size={20} />
                    }
                    {productDataState.totalLikes ? (
                      <div className='text-xs'>{productDataState.totalLikes}</div>
                    ) : ''}
                  </Row>
                </Row>
                <div className='text-gray-500 indent-8'>{productDataState.description}</div>
                {/* <Column className='justify-between'>
                  <div className='text-gray-500'><span className='font-bold'>Price:</span> {productDataState.price}</div>
                  <div className='text-gray-500'><span className='font-bold'>Stock:</span> {productDataState.stock}</div>
                </Column> */}
              </Column>

              <Row className='justify-between'>
                {/* user */}
                <Link href={`/profile/${productDataState.user?.id}`} className='flex items-center gap-2'>
                  <div>
                    {productDataState.user?.profileImage ? (
                      <Image
                        src={productDataState.user?.profileImage}
                        alt='profile'
                        width={100}
                        height={100}
                        className='rounded-full w-[40px] h-[40px] object-cover'
                      />
                    ) : <FaUserCircle size={25} />
                    }
                  </div>
                  <div>
                    <strong>{productDataState.user?.username}</strong>
                    <div className='text-gray'>{productDataState.user?.email}</div>
                  </div>
                </Link>


              </Row>
            </Column>
          </div>
        </Grid>
      </div>
    </ModalLayout>
  )
}

export default ModalContent