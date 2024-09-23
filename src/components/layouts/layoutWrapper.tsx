import React, { useEffect, useState } from 'react'
import LayoutExternal from './layoutExternal'
import LayoutInternal from './layoutInternal'
import { useRouter } from 'next/router'

type Props = {
  children: JSX.Element
}

const LayoutWrapper = ({ children }: Props) => {
  const [currentLayout, setCurrentLayout] = useState('EX')
  const router = useRouter()

  useEffect(() => {
    if (router.asPath.includes('creator')) {
      setCurrentLayout('IN')
    } else {
      setCurrentLayout('EX')
    }
  }, [router])

  return (
    <div>
      {/* external */}
      {currentLayout === "EX" ? (
        <LayoutExternal>
          <div>{children}</div>
        </LayoutExternal>
      ) : ''}

      {/* internal */}
      {currentLayout === "IN" ? (
        <LayoutInternal>
          <div>{children}</div>
        </LayoutInternal>
      ) : ''}
    </div>
  )
}

export default LayoutWrapper