import Image from 'next/image'
import React from 'react'

type Props = {}

const CreateProductPage = (props: Props) => {
  return (
    <div>
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-3'>
          <div className='min-w-screen bg-gray-200 rounded-xl p-6'>
            <div className='border border-white w-72 rounded-3xl overflow-hidden mx-auto'>
              <div className='bg1 w-full  h-72 relative'>
                <Image
                  src={'/assets/images/jum-product.png'}
                  alt='product'
                  fill
                  style={{ objectFit: 'contain' }}
                  className='py-3'
                />
              </div>
              <div className='flex p-6 justify-between items-center bg-white'>
                <strong>Jaran</strong>
                <strong>$79</strong>
              </div>
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