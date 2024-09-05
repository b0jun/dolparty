import cn from 'classnames';
import React from 'react';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { CloseIcon } from '@/svg';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  title: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

const Modal = ({ disabled = false, open, onClose, onConfirm, cancelLabel, confirmLabel, title, children }: Props) => {
  useLockBodyScroll();
  return (
    <>
      <div className={`fixed inset-0 z-[10000] bg-black duration-200 ${open ? 'opacity-40' : 'opacity-0'}`} />
      <div className="fixed inset-0 z-[10001] mx-auto h-full max-w-sm">
        <div className="flex min-h-full items-center justify-center">
          <div
            className={`relative w-full max-w-3xl rounded-xl bg-white p-4 shadow-xl transition-all duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#393E46]/20"
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div>
            {children && <div>{children}</div>}
            <div className="mt-4 flex gap-2">
              <button
                onClick={onClose}
                type="button"
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-all duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 active:scale-95 active:bg-gray-100"
              >
                {cancelLabel ?? '취소'}
              </button>
              <button
                onClick={onConfirm}
                type="button"
                disabled={disabled}
                className={cn(
                  'w-full rounded-lg bg-[#393E46] px-5 py-2.5 text-sm font-medium text-[#f7f7f7] transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#aaa] active:scale-95 active:bg-[#393E46]/80 disabled:bg-gray-300',
                )}
              >
                {confirmLabel ?? '확인'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
