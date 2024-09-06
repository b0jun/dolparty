'use client';

import { useOverlay } from '@toss/use-overlay';
import cn from 'classnames';
import { Bebas_Neue } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import SelectDifficultyModal from './SelectDifficultyModal';

import Modal from '@/components/Modal';
import useContestantList from '@/services/useContestantList';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });
export const DIFFICULTY_LIST = ['D1', 'D2', 'D3', 'D4'];
export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const overlay = useOverlay();
  const difficultyList = ['all', ...DIFFICULTY_LIST];
  const currentType = searchParams.get('difficulty') || 'all';

  const headerRef = useRef<HTMLTableRowElement>(null);
  const [isScrollTop, setIsScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const { top } = headerRef.current.getBoundingClientRect();
        setIsScrollTop(top <= 0);
      }
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data, isLoading } = useContestantList();
  const openSelectDifficulty = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <SelectDifficultyModal
        open={isOpen}
        onClose={() => {
          close();
          setTimeout(() => {
            exit();
          }, 200);
        }}
      />
    ));
  };
  return (
    <main className="flex min-h-full min-w-[576px] flex-col bg-backdrop bg-cover bg-fixed bg-center bg-no-repeat">
      <section className="flex flex-1">
        <article className="mx-auto my-[30px] w-[576px] px-[16px]">
          <div className="mb-[24px] text-center">
            <p className={cn('text-[30px] text-black/40', bebasNeue.className)}>2024 DOLMENGE COMPETITION</p>
            <p className="text-[56px]/[60px] font-black tracking-tight">1st, 돌잔치</p>
            <div className="flex justify-center">
              <p className="mt-3 rounded-md bg-black/40 px-2 py-1 text-[14px] font-bold text-[#f0f0f0]">
                2024년 9월 7일 (토) 09:00 ~ 21:00
              </p>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <ul className="flex rounded-lg shadow-sm">
              {difficultyList.map(item => (
                <li key={item} className="group">
                  <Link
                    href={{
                      pathname,
                      ...(item !== 'all' && {
                        query: {
                          difficulty: item,
                        },
                      }),
                    }}
                    replace
                    className={cn(
                      '-ms-px flex h-[35px] w-[45px] items-center justify-center gap-x-2 border border-gray-200 bg-white/70 text-[14px] hover:bg-gray-50 focus:z-10 focus:outline-none group-first:ms-0 group-first:rounded-s-lg group-last:rounded-e-lg',
                      { '!bg-white !font-semibold': currentType === item },
                    )}
                  >
                    {item === 'all' ? '전체' : item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <button
                type="button"
                onClick={openSelectDifficulty}
                className="flex h-[35px] items-center rounded-lg bg-gray-500/30 px-2 text-[14px] font-medium transition-all hover:bg-gray-500/50"
              >
                실시간 점수 조회
              </button>
            </div>
          </div>
          <table className="text-md mx-auto mb-4 w-full table-fixed rounded-lg bg-white/50 shadow-md">
            <thead>
              <tr className={cn('sticky top-0 bg-white/60', { '!bg-white': isScrollTop })} ref={headerRef}>
                <th className={cn('w-[70px] px-2 py-2', { 'rounded-tl-lg': !isScrollTop })}>번호</th>
                <th className="px-4 py-2 text-left">이름</th>
                <th className="w-[80px] px-4 py-2">라운드</th>
                <th className={cn('w-[80px] px-2 py-2', { 'rounded-tr-lg': !isScrollTop })}>구분</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/20 text-[12px] font-semibold">
              {!isLoading
                ? data?.contestantList?.map(({ number, name, difficulty, gender }) => (
                    <tr key={number}>
                      <td className="px-2 py-2 text-center text-black/60">{number}</td>
                      <td className="truncate px-4 py-2 text-left">{name}</td>
                      <td className="px-4 py-2 text-center">{difficulty}</td>
                      <td className="px-2 py-2 text-center">{gender}</td>
                    </tr>
                  ))
                : new Array(15).fill(0).map((_, index) => (
                    <tr key={index}>
                      <td className="flex h-[34px] justify-center px-2 py-2">
                        <div className="h-full w-[30px] animate-pulse rounded-md bg-[#AAAAAA]/80" />
                      </td>
                      <td className="h-[34px] px-4 py-2">
                        <div className="h-full w-[70px] animate-pulse rounded-md bg-[#AAAAAA]/80" />
                      </td>
                      <td className="h-[34px] px-4 py-2">
                        <div className="h-full w-full animate-pulse rounded-md bg-[#AAAAAA]/80" />
                      </td>
                      <td className="h-[34px] px-2 py-2">
                        <div className="h-full w-full animate-pulse rounded-md bg-[#AAAAAA]/80" />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
