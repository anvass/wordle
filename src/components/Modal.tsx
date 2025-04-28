import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
}

// добавить крестик
function Modal({ onClose, children, title }: ModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="text-center relative transform overflow-hidden rounded-md bg-white shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
            {title && (
              <div className="py-4 border-b">
                <h2 className="font-semibold text-lg">{title}</h2>
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
