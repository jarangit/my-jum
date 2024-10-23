import Link from 'next/link'
import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaUserCircle } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import Column from '../ui-center/column'
import Grid from '../ui-center/grid'
import Row from '../ui-center/row'
import Image from 'next/image'
import CardProduct from '../molecules/product/card-product'

type Props = {
  product: any
  ownerProduct?: any[]
}

const ProductDetailTemplate = ({ product, ownerProduct }: Props) => {
  return (
    <>
      {product ? (
        <Column className='bg-white w-full  rounded-xl backdrop-blur-lg backdrop-brightness-50 divide-y gap-24'>
          <Grid className='grid-cols-1 md:grid-cols-6 p-6 h-full gap-6' >
            {/* image */}
            <div className='col-span-4 h-full '>
              <div className='bg-bg-gray rounded-lg h-full flex justify-center items-center relative'>
                <div className='relative w-full h-[500px]'>
                  <Image
                    src={product.thumbnail}
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
                    <div className='text-xl font-bold'>{product.name}</div>

                  </Row>
                  <div className='text-gray-500 indent-8'>{product.description}</div>
                  <Row className='items-center'>
                    {product.isLiked ?
                      <FaHeart className='text-pink cursor-pointer' size={20} /> :
                      <FaRegHeart className='cursor-pointer' size={20} />
                    }
                    {product.totalLikes ? (
                      <div className='text-xs'>{product.totalLikes}</div>
                    ) : ''}
                  </Row>
                </Column>

                <Row className='justify-between'>
                  {/* user */}
                  {/* <Link href={`/profile/${product.user?.id}`} className='flex items-center gap-2'>
                    <div>
                      {product.user?.profileImage ? (
                        <Image
                          src={product.user?.profileImage}
                          alt='profile'
                          width={100}
                          height={100}
                          className='rounded-full w-[40px] h-[40px] object-cover'
                        />
                      ) : <FaUserCircle size={25} />
                      }
                    </div>
                    <div>
                      <strong>{product.user?.username}</strong>
                      <div className='text-gray'>{product.user?.email}</div>
                    </div>
                  </Link> */}


                </Row>
              </Column>
            </div>
          </Grid>

          {/* user product */}
          <Column className=' gap-6 pt-12'>
            <Row className='justify-between'>
              {/* user */}
              <Link href={`/profile/${product.user?.id}`} className='flex items-center gap-2'>
                <div>
                  {product.user?.profileImage ? (
                    <Image
                      src={product.user?.profileImage}
                      alt='profile'
                      width={100}
                      height={100}
                      className='rounded-full w-[80px] h-[80px] object-cover'
                    />
                  ) : <FaUserCircle size={25} />
                  }
                </div>
                <div>
                  <strong>{product.user?.username}</strong>
                  <div className='text-gray'>{product.user?.email}</div>
                </div>
              </Link>
            </Row>
            <Grid className='grid-cols-4 w-full'>
              {ownerProduct?.map((product, index) => (
                <div key={index}>
                  <CardProduct data={product} />
                </div>
              ))}
            </Grid>
          </Column>
        </Column>
      ) : ''}
    </>
  )
}

export default ProductDetailTemplate