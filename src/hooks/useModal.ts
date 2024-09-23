"use client"
import { useState, useCallback } from 'react';

// กำหนดประเภท (interface) สำหรับ hook ที่จะส่งออกไป
interface UseModalReturnType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    console.log('open modal')
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
