"use client"
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}
const bgData = [
  {
    label: '1',
    value: 'at-bg-white'
  },
  {
    label: '2',
    value: 'at-bg-pink'
  },
  {
    label: '3',
    value: 'at-bg-blue'
  },
  {
    label: '1',
    value: 'at-bg-black'
  },
  {
    label: '1',
    value: 'at-bg-gold'
  },
]
const CreateProductPage = (props: Props) => {
  const [bgSelected, setBgSelected] = useState(bgData[0].value)
  return (
    <div>
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-3'>
          <div className='min-h-[80vh] bg-gray-100 rounded-xl p-6'>
            <div className='border border-white w-72 rounded-3xl overflow-hidden mx-auto p-3 bg-white'>
              <div className={`${bgSelected} w-full  h-72 relative rounded-3xl`}>
                <Image
                  src={'/assets/images/jum-product.png'}
                  alt='product'
                  fill
                  style={{ objectFit: 'contain' }}
                  className='my-3'
                />
              </div>
              <div className='flex p-6 justify-between items-center bg-white'>
                <strong>Jaran</strong>
                <strong>$79</strong>
              </div>
            </div>

            {/* bg color */}
            <div className='flex gap-3 justify-center mt-3'>
              {bgData.map((item: any, key) => (
                <div key={key}>
                  <div className={`${item.value} ${bgSelected == item.value ? 'border-2 border-blue-300':''}  w-6 h-6 rounded-full cursor-pointer`} onClick={() => setBgSelected(item.value)}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <h3 className='text-xl font-bold'>Detail</h3>
          <form>
            <div className='flex flex-col gap-6'>
              <input type="text" placeholder='name' />
              <input type="text" placeholder='story' />
              <input type="text" placeholder='price' />
              <div className='flex justify-end'>
                <button className='ad-button'>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductPage