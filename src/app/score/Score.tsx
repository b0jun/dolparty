'use client';

import { useOverlay } from '@toss/use-overlay';
import cn from 'classnames';
import { Bebas_Neue } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import JudgeAuthModal from './JudgeAuthModal';
import TShirtWithNumber from './TShirtWithNumber';

import Spinner from '@/components/Spinner';
import useAuthVerify from '@/services/useAuthVerify';
import useScoreList from '@/services/useScoreList';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

const Score = () => {
  const overlay = useOverlay();

  const groupRefs = useRef<HTMLTableElement[]>([]);

  const { data, isLoading } = useScoreList();
  const [showAttempts, setShowAttempts] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { mutate } = useAuthVerify();

  useEffect(() => {
    const token = localStorage.getItem('acToken');
    if (!token) return;
    try {
      mutate(
        { acToken: token },
        {
          onSuccess: () => {
            setIsAuth(true);
          },
        },
      );
    } catch (error) {
      localStorage.removeItem('acToken');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuthSuccess = () => {
    setIsAuth(true);
    toast('인증이 완료되었습니다.', { type: 'success' });
  };
  const openJudgeAuthMdoal = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <JudgeAuthModal open={isOpen} close={close} exit={exit} handleAuthSuccess={handleAuthSuccess} />
    ));
  };

  const toggleShowAttempts = () => {
    setShowAttempts(prev => !prev);
  };

  const scrollToGroup = (index: number) => {
    if (groupRefs.current[index]) {
      groupRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="relative w-full bg-black/80">
      {!isAuth && (
        <button
          type="button"
          onClick={openJudgeAuthMdoal}
          className="absolute right-2 top-2 select-none p-1 text-[#2B2B2B]"
        >
          JUDGE
        </button>
      )}
      <div className="mx-auto mb-[24px] w-[1024px]">
        <div className={cn('mb-[60px] mt-[30px] flex flex-col items-center text-center')}>
          <p className={cn('text-[30px] text-[#AAAAAA]', bebasNeue.className)}>2024 DOLMENGE COMPETITION</p>
          <p className={cn('text-[66px]/[60px] text-[#F6F6F6]', bebasNeue.className)}>Live Score</p>
          <p className={cn('rounded-lg bg-white/10 px-2 text-[30px]/[40px] font-medium text-[#AAAAAA]')}>돌잔치</p>
        </div>
        <div className="flex justify-center gap-[16px] px-4">
          <ul className="sticky top-[0px] flex h-full w-[150px] flex-col border-0 border-white/40">
            {isLoading
              ? new Array(6).fill(0).map((_, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => scrollToGroup(index)}
                      className="h-[50px] w-full animate-pulse rounded-md bg-[#aaa]/40 px-2"
                    />
                  </li>
                ))
              : data?.groupedContestants?.map(({ difficulty, gender }, index: number) => (
                  <li key={`${difficulty}-${gender}`}>
                    <button
                      type="button"
                      onClick={() => scrollToGroup(index)}
                      className="h-[50px] w-full rounded-md px-2 text-left text-[14px] font-bold text-[#FEFEFE] transition-transform duration-150 active:scale-95 active:bg-[#cccccc]/10"
                    >
                      <span className="text-[#d0d0d0]">Div. </span>
                      <span className="mr-1 text-[20px]">{difficulty}</span>
                      <span
                        className={cn('rounded px-[2px] py-[1px]', gender === 'Men' ? 'bg-[#3F72AF]' : 'bg-[#FF2E63]')}
                      >
                        {gender}
                      </span>
                    </button>
                  </li>
                ))}
          </ul>
          <div className="w-[800px]">
            <div className="flex flex-col gap-[500px]">
              {isLoading ? (
                <div className="relative min-h-[100vh]">
                  <div className="absolute -top-[50px] right-0 z-50 flex justify-end">
                    <div className="inline-flex items-center rounded-lg bg-black/20 p-2">
                      <div className="peer relative h-[22px] w-[40px] rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-[18px] after:w-[18px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#F4CD5F] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-[#F4CD5F]/30 rtl:peer-checked:after:-translate-x-full" />
                      <span className="ms-2 text-sm font-medium text-white/50">Show Attempts of Problems</span>
                    </div>
                  </div>
                  <table className="mx-auto table-fixed select-none rounded-xl bg-[#202020] text-[#FEFEFE] shadow-md">
                    <thead className="z-[9999] bg-[#4D4D4D]">
                      <tr className="h-[35px] bg-[#4D4D4D] text-[#F9F7F7]">
                        <th className="px-2 text-left text-[14px]" colSpan={2}>
                          <div className="h-[25px] w-[100px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        <th colSpan={10} className="text-left">
                          <div className="h-[25px] w-[100px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        <th />
                        <th />
                        <th colSpan={2} className="text-center text-[#a0a0a0]">
                          <div className="flex justify-center">
                            <div className="h-[25px] w-[80px] animate-pulse rounded-md bg-[#aaa]/40" />
                          </div>
                        </th>
                      </tr>
                      <tr className="bg-[#4D4D4D] text-[#F9F7F7]">
                        <th className="w-[50px] px-2 py-2">
                          <div className="h-[24px] w-[40px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        <th className="w-[200px] px-2 py-2 text-left">
                          <div className="h-[24px] w-[40px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        {new Array(10).fill(0).map((_, index) => (
                          <th key={index}>
                            <div className="flex items-center justify-center">
                              <div className="h-[24px] w-[28px] animate-pulse rounded-md bg-[#aaa]/40" />
                            </div>
                          </th>
                        ))}
                        <th className="w-[60px] px-2">
                          <div className="h-[24px] w-[40px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        <th className="w-[60px] px-2">
                          <div className="h-[24px] w-[40px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        <th className="w-[60px] px-2 text-[#a0a0a0]">
                          <div className="h-[24px] w-[40px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                        <th className="w-[60px] px-2 text-[#a0a0a0]">
                          <div className="h-[24px] w-[40px] animate-pulse rounded-md bg-[#aaa]/40" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {new Array(10).fill(0).map((_, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2 text-center text-[22px] font-black">
                            <div className="flex justify-center">
                              <div className="h-[30px] w-[30px] animate-pulse rounded-md bg-[#aaa]/40" />
                            </div>
                          </td>
                          <td className="px-2 py-2">
                            <div className="flex">
                              <div className="flex animate-pulse items-center gap-[8px]">
                                <TShirtWithNumber backNumber="" />
                                <div className="h-[30px] w-[50px] rounded-md bg-[#aaa]/40" />
                              </div>
                            </div>
                          </td>
                          {new Array(10).fill(0).map((_, index) => (
                            <td key={index} className="px-1 py-2 text-center text-[#202020]">
                              <div className="flex flex-col items-center gap-[2px] text-[15px] font-medium">
                                <div
                                  className={cn(
                                    'flex size-[30px] animate-pulse items-center justify-center rounded-[2px] bg-black/80',
                                  )}
                                />
                                <div
                                  className={cn(
                                    'flex size-[30px] animate-pulse items-center justify-center rounded-[2px] bg-black/80',
                                  )}
                                />
                              </div>
                            </td>
                          ))}
                          <td className="px-2 py-2 text-center font-black">
                            <div className="flex justify-center">
                              <div className="h-[30px] w-[30px] animate-pulse rounded-md bg-[#aaa]/40" />
                            </div>
                          </td>
                          <td className="px-2 py-2 text-center font-black">
                            <div className="flex justify-center">
                              <div className="h-[30px] w-[30px] animate-pulse rounded-md bg-[#aaa]/40" />
                            </div>
                          </td>
                          <td className="px-2 py-2 text-center font-black text-[#909090]">
                            <div className="flex justify-center">
                              <div className="h-[30px] w-[30px] animate-pulse rounded-md bg-[#aaa]/40" />
                            </div>
                          </td>
                          <td className="px-2 py-2 text-center font-black text-[#909090]">
                            <div className="flex justify-center">
                              <div className="h-[30px] w-[30px] animate-pulse rounded-md bg-[#aaa]/40" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                data?.groupedContestants?.map(({ difficulty, gender, problems, scoreList }, index: number) => (
                  <div key={`${difficulty}-${gender}`} className="relative min-h-[100vh]">
                    <div className="absolute -top-[50px] right-0 z-50 flex justify-end">
                      <label className="inline-flex cursor-pointer items-center rounded-lg bg-black/20 p-2">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={showAttempts}
                          onChange={toggleShowAttempts}
                        />
                        <div className="peer relative h-[22px] w-[40px] rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-[18px] after:w-[18px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#F4CD5F] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-[#F4CD5F]/30 rtl:peer-checked:after:-translate-x-full" />
                        <span className="ms-2 text-sm font-medium text-white/50">Show Attempts of Problems</span>
                      </label>
                    </div>
                    <table
                      ref={element => {
                        if (element) {
                          groupRefs.current[index] = element;
                        }
                      }}
                      className="mx-auto table-fixed select-none rounded-xl bg-[#202020] text-[#FEFEFE] shadow-md"
                    >
                      <thead className="sticky top-[0px] z-[9999] bg-[#4D4D4D]">
                        <tr className="h-[35px] bg-[#4D4D4D] text-[#F9F7F7]">
                          <th className="px-2 text-left text-[14px]" colSpan={2}>
                            <span className="text-[#d0d0d0]">Div. </span>
                            <span className="mr-1 text-[20px]">{difficulty}</span>
                            <span
                              className={cn(
                                'rounded px-[2px] py-[1px]',
                                gender === 'Men' ? 'bg-[#3F72AF]' : 'bg-[#FF2E63]',
                              )}
                            >
                              {gender}
                            </span>
                          </th>
                          <th colSpan={10} className="text-left">
                            Problems
                          </th>
                          <th />
                          <th />
                          <th colSpan={2} className="text-center text-[#a0a0a0]">
                            Attempts
                          </th>
                        </tr>
                        <tr className="bg-[#4D4D4D] text-[#F9F7F7]">
                          <th className="w-[50px] px-2 py-2">Rank</th>
                          <th className="w-[200px] px-2 py-2 text-left">name</th>
                          {problems.map(problem => (
                            <th key={problem}>{problem}</th>
                          ))}
                          <th className="w-[60px] px-2">TOP</th>
                          <th className="w-[60px] px-2">ZONE</th>
                          <th className="w-[60px] px-2 text-[#a0a0a0]">TOP</th>
                          <th className="w-[60px] px-2 text-[#a0a0a0]">ZONE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scoreList.map(
                          ({
                            id,
                            rank,
                            name,
                            number,
                            problems,
                            totalTops,
                            totalZones,
                            totalTopAttempts,
                            totalZoneAttempts,
                          }) => (
                            <tr key={number}>
                              <td className="px-2 py-2 text-center text-[22px] font-black">{rank}</td>
                              <td className="px-2 py-2">
                                <div className="flex">
                                  {isAuth ? (
                                    <Link
                                      href={`/judge/contestant/${id}`}
                                      className="flex items-center gap-[8px]"
                                      // aria-disabled
                                      // tabIndex={-1}
                                    >
                                      <TShirtWithNumber backNumber={number} />
                                      {name}
                                    </Link>
                                  ) : (
                                    <div className="flex items-center gap-[8px]">
                                      <TShirtWithNumber backNumber={number} />
                                      {name}
                                    </div>
                                  )}
                                </div>
                              </td>
                              {problems.map(({ name, topReached, topAttempts, zoneReached, zoneAttempts }) => (
                                <td key={name} className="px-1 py-2 text-center text-[#202020]">
                                  <div className="flex flex-col items-center gap-[2px] text-[15px] font-medium">
                                    <div
                                      className={cn(
                                        'flex size-[30px] items-center justify-center rounded-[2px] bg-black',
                                        topReached ? 'bg-reached text-[#202020]' : 'bg-black text-black',
                                      )}
                                    >
                                      {showAttempts ? topAttempts : null}
                                    </div>
                                    <div
                                      className={cn(
                                        'flex size-[30px] items-center justify-center rounded-[2px] bg-black',
                                        zoneReached ? 'bg-reached text-[#202020]' : 'bg-black text-black',
                                      )}
                                    >
                                      {showAttempts ? zoneAttempts : null}
                                    </div>
                                  </div>
                                </td>
                              ))}
                              <td className="px-2 py-2 text-center font-black">{totalTops}</td>
                              <td className="px-2 py-2 text-center font-black">{totalZones}</td>
                              <td className="px-2 py-2 text-center font-black text-[#909090]">{totalTopAttempts}</td>
                              <td className="px-2 py-2 text-center font-black text-[#909090]">{totalZoneAttempts}</td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
