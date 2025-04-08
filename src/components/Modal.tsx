import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
  onReset: () => void;
}

function Modal({ isOpen, onClose, children, title, onReset }: ModalProps) {
  // Prevent backdrop click from closing modal
  //   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //     if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
  //       onClose?.();
  //     }
  //   };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      //   onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div className="modal-backdrop bg-black/50" aria-hidden="true" />
      <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-2 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <IoMdCloseCircle />
        </button>

        {title && (
          <div className="border-b px-6 py-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
        )}

        <div className="px-6 py-4">{children}</div>

        <div className="flex ">
          <button
            onClick={onReset}
            className="w-full p-3 text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
