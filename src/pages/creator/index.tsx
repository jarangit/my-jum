"use client"
import React from 'react'
import useModal from '../../hooks/useModal'

type Props = {}

const AdminPage = (props: Props) => {
  const { openModal } = useModal()
  return (
    <div>
      <div>AdminPage</div>
      <button onClick={() => openModal()}>Open modal</button>
    </div>
  )
}

export default AdminPage