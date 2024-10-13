import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import Grid from '../ui-center/grid'
import ProfileImage from '../atoms/profile-image'
import Column from '../ui-center/column'
import Row from '../ui-center/row'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'
import CardProduct from '../molecules/product/card-product'
import { set } from 'react-hook-form'

type Props = {
  userData: any
  userProduct?: any[]
}
const bannerImage = 'https://img.freepik.com/free-photo/abstract-empty-smooth-light-pink-studio-room-background-use-as-montage-product-display-banner-template_1258-63825.jpg?t=st=1728830257~exp=1728833857~hmac=0734292db1208850b5f8907ac29840e9011f29827142a50d7b2a70ee88f64a4d&w=2000'
const Iam = 'ฉันเป็นนักพัฒนาเว็บไซต์ เชี่ยวชาญในการทำงาน backend ด้วย NestJS และ TypeORM มุ่งมั่นที่จะพัฒนาสิ่งที่แก้ปัญหาในชีวิตประจำวันของผู้ใช้'


const ProfileDetailTemplate = ({ userData, userProduct }: Props) => {
  const [currentCollection, setCurrentCollection] = useState<any>()
  const [products, setProducts] = useState<any[]>()
  const onSelectedCollection = useCallback((col: any) => {
    if (!col) return
    setCurrentCollection(col)
    const filterProduct = userProduct?.filter((product: any) => product.collection?.id === col.id)
    if (filterProduct) {
      setProducts(filterProduct)
    } else {
      setProducts(userProduct);
    }
  }, [currentCollection, userProduct])

  const onInit = useCallback(() => {
    if (userProduct && userProduct.length) {
      setProducts(userProduct)
    }
  }, [userProduct, userData])

  useEffect(() => {
    onInit()
  }, [userData, userProduct])

  useEffect(() => {
  }, [currentCollection])



  if (!userData) return null
  return (
    <>
      {/* banner */}
      <div className='relative w-full h-96 !z-0'>
        <Image
          src={bannerImage}
          alt=''
          fill
          className='object-cover w-full h-96 rounded-lg !z-0'
        />
        <div className='absolute -bottom-12 left-4 z-50'>
          <ProfileImage
            profileImageUrl={userData.profileImage}
          />
        </div>
      </div>

      {/* content */}
      <div className='w-full  z-50  overflow-hidden h-full relative mt-12'>
        <Grid className='grid-cols-12 gap-6'>
          {/* profile */}
          <Column className='col-span-3 gap-6 px-6 relatives'>

            <div>
              <div className='text-xl font-bold'>{userData.username}</div>
              <div className='text-gray'>@{userData.username}</div>
            </div>

            <div className='text-gray '>{Iam}</div>

            <Row className='gap-3'>
              <FaFacebookSquare size={20} />
              <FaSquareXTwitter size={20} />
              <FaInstagramSquare size={20} />
            </Row>

            <Row className='justify-between  gap-0'>
              <Column className='px-auto items-center'>
                <div className='font-bold text-lg'>2.3k</div>
                <div className='text-gray font-medium'>Follower</div>
              </Column>
              <Column className='px-auto items-center'>
                <div className='font-bold text-lg'>69</div>
                <div className='text-gray font-medium'>Items</div>
              </Column>
              <Column className='px-auto items-center'>
                <div className='font-bold text-lg'>2.3k</div>
                <div className='text-gray font-medium'>Following</div>
              </Column>
            </Row>
          </Column>

          {/* product */}
          <div className='col-span-9'>
            <ul className='flex gap-6  pb-3 items-center border-b mb-6'>
              <li onClick={() => {
                setProducts(userProduct)
                setCurrentCollection(undefined)
              }}
                className={`${!currentCollection?.id ? 'bg-black text-white px-6 rounded-full py-1' : 'text-gray'} font-semibold cursor-pointer`}
              >All</li>
              {userData.collections && userData.collections.length ? userData.collections.map((col: any, index: any) => (
                <li className={`${currentCollection?.id === col.id ? 'bg-black text-white px-4 rounded-full py-1' : 'text-gray'} cursor-pointer font-semibold`} key={index} onClick={() => onSelectedCollection(col)}>{col.name}</li>
              )) : ''}
            </ul>

            {/* list */}
            <Grid className='grid-cols-3 w-full gap-3'>
              {products && products.length ? products.map((product: any, index: any) => (
                <div key={index} className='col-span-1'>
                  <CardProduct
                    data={product}
                  />
                </div>
              )) : ''}
            </Grid>
          </div>
        </Grid>
      </div>
    </>
  )
}

export default ProfileDetailTemplate