import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
  onReset: () => void;
}

function Modal({ isOpen, onClose, children, title, onReset }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden={!isOpen}
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="text-center relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {title && (
              <div className="py-4 border-b">
                <h2 className="font-semibold text-lg">{title}</h2>
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
      </div>
    </div>
  );
}

export default Modal;
