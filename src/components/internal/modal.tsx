"use client"
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { closeCenterModal } from '@/store/redux/slice/ui-state'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const Modal = (props: Props) => {
  const { isOpenModal } = useAppSelector((store) => store.uiState)
  const dispatch = useAppDispatch()
  const [showAnimation, setShowAnimation] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // Ref สำหรับ Modal

  // Handle click outside modal
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      dispatch(closeCenterModal());
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      setShowAnimation(true);
      document.addEventListener('mousedown', handleClickOutside); // เมื่อเปิด Modal, ฟังการคลิกนอก modal
    } else {
      setTimeout(() => setShowAnimation(false), 100); // delay fade out
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // ลบ event เมื่อปิด modal
    };
  }, [isOpenModal]);

  if (!isOpenModal && !showAnimation) return null;


  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-500`}
    >
      <div
        ref={modalRef} // ใช้ Ref นี้ในตัว modal
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modal Title</h2>
          <button onClick={() => dispatch(closeCenterModal())} className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="modal-content">
          modal content
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={() => dispatch(closeCenterModal())} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal