"use client"
import React from 'react'
import useModal from '../../hooks/useModal'
import { useAppDispatch } from '@/store/hook'
import { openCenterModal } from '@/store/redux/slice/ui-state'

type Props = {}

const AdminPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const onOpenModal = () => {
    dispatch(
      openCenterModal()
    )
  }
  return (
    <div>
      <div>AdminPage</div>
      <button onClick={() => onOpenModal()}>Open modal</button>
    </div>
  )
}

export default AdminPage