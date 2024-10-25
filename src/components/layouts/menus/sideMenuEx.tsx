import Link from 'next/link'
import React from 'react'

type Props = {}

const SideMenuEx = (props: Props) => {
  const listMenu = [
    {
      label: 'Feed',
      url: '/'
    },
    {
      label: 'Community',
      url: '/community'
    },
  ]
  const ListItem = ({ label, url }: {
    label: string,
    url: string
  }) => {
    return (
      <Link href={url} >
        <div className='border p-3 hover:bg-gray transition-all cursor-pointer w-full'>
          {label}
        </div>
      </Link>
    )
  }

  return (
    <div>
      <ul >
        {listMenu.map((item, index) => (
          <li key={index}>
            <ListItem label={item.label} url={item.url} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideMenuEx