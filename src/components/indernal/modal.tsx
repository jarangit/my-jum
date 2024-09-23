"use client"
import useModal from '@/hooks/useModal'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

type Props = {}

const Modal = (props: Props) => {
  const store = useSelector((state: any) => state.uiState.value)
  console.log("🚀 ~ store:", store)
  const { isOpen } = useModal()
  useEffect(() => {
    console.log("🚀 ~ Modal ~ isOpen:", isOpen)
  }, [isOpen])

  return (
    <div>
      <div className={`${isOpen ? 'bg-green-700' : 'bg-red-700'}`} >Modal</div>
    </div>
  )
}

export default Modal