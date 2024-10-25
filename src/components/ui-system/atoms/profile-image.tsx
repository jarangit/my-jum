import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  profileImageUrl: string
  size?: 's' | 'm' | 'l' | 'xl'
}

const ProfileImage = ({ profileImageUrl, size }: Props) => {
  const classSize = () => {
    switch (size) {
      case 's':
        return 'w-6 h-6'
      case 'm':
        return 'w-8 h-8'
      case 'l':
        return 'w1-6 h1-6'
      case 'xl':
        return 'w-[80px] h-[80px]'
      default:
        return 'w-8 h-8'
    }
  }
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
              className={`rounded-full object-cover border border-white ${classSize()}`}
            />
          ) : <FaUserCircle size={25} />
          }
        </div>
      </Link>
    </div>
  )
}

export default ProfileImage