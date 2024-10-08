import Image from 'next/image'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  data: any
}

const CardProduct = ({ data }: Props) => {
  if (!data) return null
  return (
    <div className='flex flex-col gap-2 '>
      <div className='relative w-full max-w-[250px] h-[250px] min-h-[50px] max-h-[250px] rounded-xl overflow-hidden'>
        <Image
          src={data.thumbnail}
          alt='thumbnail'
          fill
          className='object-cover'
        />
      </div>
      <div className='text-lg font-bold'>
        {data.name}
      </div>

      {/* price */}
      <div className='flex gap-4 items-center'>
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

      <div className='flex items-center gap-2 mt-3'>
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
      </div>
    </div>
  )
}

export default CardProduct