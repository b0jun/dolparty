import Link from 'next/link';

import { DIFFICULTY_LIST } from './Home';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { CloseIcon } from '@/svg';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SelectDifficultyModal = ({ open, onClose }: Props) => {
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
              <h2 className="text-lg font-bold">난이도를 선택해주세요.</h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#393E46]/20"
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {DIFFICULTY_LIST.map(difficulty => (
                <li key={difficulty}>
                  <Link
                    href={{
                      pathname: '/score/live',
                      query: {
                        difficulty,
                      },
                    }}
                    className="flex w-[150px] rounded-md bg-[#e0e0e0] px-2 py-1 font-medium transition-all duration-200 ease-in-out focus:outline-none active:scale-95 active:bg-[#e0e0e0]/80"
                  >
                    {difficulty}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectDifficultyModal;
