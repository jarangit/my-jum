import useOutsideClick from '@/hooks/useClickOutsite';
import useScroll from '@/hooks/useScrol';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { _toggleModalProduct } from '@/store/redux/slice/modal-product';
import { stat } from 'fs';
import React, { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode;
}

const ModalLayout = ({ children }: Props) => {
  const state: any = useAppSelector(state => state.modalProductState.data);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    dispatch(_toggleModalProduct({
      product: '',
      isOpen: false
    }
    ))
  }

  // useScroll(100);
  useOutsideClick(modalRef, onClose);

  useEffect(() => {
  }, [state.isOpen])


  if (!state.isOpen) return null;



  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-500`}
    >
      <div ref={modalRef} >
        {children}
      </div>
    </div>
  )
}

export default ModalLayout