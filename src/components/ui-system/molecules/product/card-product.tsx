import Image from 'next/image'
import React from 'react'
import { FaHeart, FaRegHeart, FaUserCircle } from 'react-icons/fa'
import Row from '../../ui-center/row'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hook'
import { _toggleModalProduct } from '@/store/redux/slice/modal-product'

type Props = {
  data: any
  onLike?: (id: number) => void
}

const CardProduct = ({ data, onLike }: Props) => {
  const dispatch = useAppDispatch()
  const handleLike = (id: number) => {
    if (typeof onLike === 'function') {
      onLike(id); // เรียกฟังก์ชันถ้ามีการส่งเข้ามา
    } else {
      console.warn('onLike function is not provided'); // แจ้งเตือนถ้าไม่มีการส่ง onLike มา
    }
  };

  const onOpenModal = (product: any) => {
    dispatch(_toggleModalProduct({
      product: product,
      isOpen: true
    }
    ))
  }

  if (!data) return null

  return (
    <div className='flex flex-col gap-2 max-w-[250px] mx-auto'>
      <div
        onClick={() => onOpenModal(data)}
        className='relative w-full max-w-[250px] h-[250px] min-h-[50px] max-h-[250px] rounded-xl overflow-hidden'>
        <Image
          src={data.thumbnail}
          alt='thumbnail'
          fill
          className='object-cover cursor-pointer'
        />
      </div>
      <Link href={`/product/${data.id}`} className='text-lg font-bold cursor-pointer hover:underline'>
        {data.name}
      </Link>

      {/* price */}
      <Row className=' justify-between !items-end'>
        <div className='flex gap-4 '>
          <div className='text-sm'>
            <div className='text-gray'>Price</div>
            <div className=' font-bold'>
              {data.price}
            </div>
          </div>
          <div className='text-sm'>
            <div className='text-gray'>Stock</div>
            <div className='font-bold'>
              {data.stock}
            </div>
          </div>
        </div>

        <Row className='items-center'>
          {data.isLiked ? <FaHeart className='text-pink cursor-pointer' onClick={() => handleLike(data.id)} /> : <FaRegHeart className='cursor-pointer' onClick={() => handleLike(data.id)} />}
          {data.totalLikes ? (
            <div className='text-xs'>{data.totalLikes}</div>
          ) : ''}
        </Row>
      </Row>

      {/* user */}
      <Link href={`/profile/${data.user?.id}`} className='flex items-center gap-2 mt-3'>
        <div>
          {data.user?.profileImage ? (
            <Image
              src={data.user?.profileImage}
              alt='profile'
              width={100}
              height={100}
              className='rounded-full w-[30px] h-[30px] object-cover'
            />
          ) : <FaUserCircle size={25} />
          }
        </div>
        <div>{data.user?.username}</div>
      </Link>
    </div>
  )
}

export default CardProduct