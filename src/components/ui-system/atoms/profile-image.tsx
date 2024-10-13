import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  profileImageUrl: string

}

const ProfileImage = ({ profileImageUrl }: Props) => {
  return (
    <div>
      <Link href={`#`} className='flex items-center gap-2'>
        <div>
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt='profile'
              width={100}
              height={100}
              className='rounded-full w-[80px] h-[80px] object-cover border border-white'
            />
          ) : <FaUserCircle size={25} />
          }
        </div>
        <div>
          {/* <strong>{product.user?.username}</strong>
                  <div className='text-gray'>{product.user?.email}</div> */}
        </div>
      </Link>
    </div>
  )
}

export default ProfileImage