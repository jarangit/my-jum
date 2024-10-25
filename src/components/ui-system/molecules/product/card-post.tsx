import Image from 'next/image'
import React from 'react'
import { FaHeart, FaRegHeart, FaUserCircle } from 'react-icons/fa'
import Row from '../../ui-center/row'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hook'
import { _toggleModalProduct } from '@/store/redux/slice/modal-product'
import Column from '../../ui-center/column'

type Props = {
  _data: any
  onLike?: (id: number) => void
}

const PostCard = ({ _data, onLike }: Props) => {
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

  if (!_data) return null

  return (
    <Column className='border gap-3 p-6 rounded-xl bg-white'>
      {/* user */}
      {_data.user ? (
        <Link href={`/profile/${_data.user?.id}`} className='flex items-center gap-2'>
          <div>
            {_data.user?.profileImage ? (
              <Image
                src={_data.user?.profileImage}
                alt='profile'
                width={100}
                height={100}
                className='rounded-full w-[30px] h-[30px] object-cover'
              />
            ) : <FaUserCircle size={25} />
            }
          </div>
          <div>{_data.user?.username}</div>
        </Link>
      ) : ''}


      {/* content */}
      <div>
        <Link href={`/product/${_data.id}`} className='text-lg font-bold cursor-pointer hover:underline'>
          {_data.name}
        </Link>
        <div>{_data.description}</div>
      </div>

      {/* image */}
      <div
        onClick={() => onOpenModal(_data)}
        className='w-full min-h-[400px] max-h-[500px] relative border border-border rounded-lg'>
        <Image
          src={_data.thumbnail}
          alt='thumbnail'
          fill
          className='cursor-pointer object-contain '
        />
      </div>


      {/* like */}
      <Row className=' justify-between !items-end'>
        <Row className='items-center'>
          {_data.isLiked ? <FaHeart className='text-pink cursor-pointer' onClick={() => handleLike(_data.id)} /> : <FaRegHeart className='cursor-pointer' onClick={() => handleLike(_data.id)} />}
          {_data.totalLikes ? (
            <div className='text-xs'>{_data.totalLikes}</div>
          ) : ''}
        </Row>
      </Row>
    </Column>
  )
}

export default PostCard