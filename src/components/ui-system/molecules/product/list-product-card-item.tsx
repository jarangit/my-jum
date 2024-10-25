import Image from 'next/image'
import React, { useEffect } from 'react'
import Row from '../../ui-center/row'
import ProfileImage from '../../atoms/profile-image'
import Column from '../../ui-center/column'

type Props = {
  data: any
}

const ListProductCardItem = ({ data }: Props) => {
  return (
    <div className='border-b rounded-md py-1'>
      {data ? (
        <Row key={data.id} className='gap-2 text-sm'>
          <div className='relative w-12 h-12  bg-bg-gray'>
            <Image src={data.thumbnail} alt={data.thumbnail} fill className='object-cover rounded-md' />
          </div>
          <Column className='gap-1'>
            <h2 className='font-medium'>{data.name}</h2>
            <Row className=' w-full text-gray text-sm'>
              <ProfileImage profileImageUrl={data.user.profileImage} size='s' />
              <div>{data.user.username}</div>
            </Row>
          </Column>
        </Row>
      ) : ''}
    </div>
  )
}

export default ListProductCardItem