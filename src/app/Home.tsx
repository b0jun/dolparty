'use client';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const difficultyList = ['all', 'd1', 'd2', 'd3', 'd4'];
  const currentType = searchParams.get('type') || 'all';

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

  return (
    <main className="flex min-h-full min-w-[576px] flex-col bg-backdrop bg-cover bg-center bg-no-repeat">
      <section className="flex flex-1">
        <article className="mx-auto my-[24px] w-[576px] px-[16px]">
          <div className="mb-[24px] text-center">
            <p className="text-[56px] font-black">1st, 돌잔치</p>
            <p className="font-medium text-[#181411]">9월 7일 토요일 대회 참가자 현황</p>
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
                          type: item,
                        },
                      }),
                    }}
                    replace
                    className={cn(
                      '-ms-px flex h-[35px] w-[45px] items-center justify-center gap-x-2 border border-gray-200 bg-white/70 text-[14px] hover:bg-gray-50 focus:z-10 focus:outline-none group-first:ms-0 group-first:rounded-s-lg group-last:rounded-e-lg',
                      { ['!bg-white !font-semibold']: currentType === item },
                    )}
                  >
                    {item === 'all' ? '전체' : item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/score"
                className="flex h-[35px] items-center rounded-lg bg-gray-500/30 px-2 text-[14px] font-medium transition-all hover:bg-gray-500/50"
              >
                실시간 점수 조회
              </Link>
            </div>
          </div>
          <table className="text-md mx-auto mb-4 w-full table-fixed rounded-lg bg-white/50 shadow-md">
            <thead>
              <tr className={cn('sticky top-0 bg-white/60', { ['!bg-white']: isScrollTop })} ref={headerRef}>
                <th className={cn('[50px] px-2 py-2', { ['rounded-tl-lg']: !isScrollTop })}>번호</th>
                <th className="w-[150px] px-4 py-2 text-left">이름</th>
                <th className="w-[150px] px-4 py-2 text-left">소속</th>
                <th className="w-[80px] px-4 py-2">라운드</th>
                <th className={cn('[50px] px-2 py-2', { ['rounded-tr-lg']: !isScrollTop })}>구분</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/20 text-[12px] font-semibold">
              {new Array(30).fill(0).map((_, index) => (
                <tr key={index}>
                  <td className="px-2 py-2 text-center text-black/60">{100 + index + 1}</td>
                  <td className="truncate px-4 py-2 text-left">아무개{index === 2 ? 'Long Long Long Name' : ''}</td>
                  <td className="truncate px-4 py-2 text-left">
                    아무개클라이밍 {index === 2 ? 'Long Long Long Name' : ''}
                  </td>
                  <td className="px-4 py-2 text-center">D1</td>
                  <td className="px-2 py-2 text-center">남자부</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
