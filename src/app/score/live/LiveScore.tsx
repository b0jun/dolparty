'use client';

import { useOverlay } from '@toss/use-overlay';
import cn from 'classnames';
import { Bebas_Neue } from 'next/font/google';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import JudgeAuthModal from './JudgeAuthModal';
import TShirtWithNumber from './TShirtWithNumber';

import { DIFFICULTY_LIST } from '@/app/Home';
import useAuthVerify from '@/services/useAuthVerify';
import useLiveScore from '@/services/useLiveScore';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

const LiveScore = () => {
  const overlay = useOverlay();

  const groupRefs = useRef<HTMLTableElement[]>([]);
  const searchParams = useSearchParams();
  const difficultyQuery = searchParams.get('difficulty');
  const { data, isLoading } = useLiveScore();
  const [showAttempts, setShowAttempts] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  // 자동 스크롤 제어를 위한 상태값
  const [autoScroll, setAutoScroll] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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
      const element = groupRefs.current[index];
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 16; // 상단에 10px의 여백을 추가

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth', // 부드러운 스크롤
      });
    }
  };

  // 자동 스크롤 시작 함수
  const startAutoScroll = () => {
    if (intervalId) return; // 이미 스크롤이 진행 중이면 중복 시작 방지
    let currentIndex = 0;

    const id = setInterval(() => {
      scrollToGroup(currentIndex); // 현재 인덱스 그룹으로 스크롤
      currentIndex = (currentIndex + 1) % groupRefs.current.length; // 인덱스를 순환시킴
    }, 30000); // 30초마다 스크롤

    setIntervalId(id);
    setAutoScroll(true);
  };

  // 자동 스크롤 멈추기 함수
  const stopAutoScroll = () => {
    if (intervalId) {
      clearInterval(intervalId); // 스크롤을 멈춤
      setIntervalId(null);
      setAutoScroll(false);
    }
  };
  return (
    <div className="relative w-full bg-black/80">
      <div className="absolute left-[10px] top-[10px]">
        <ul className="flex gap-2">
          {DIFFICULTY_LIST.map(difficulty => (
            <li key={difficulty}>
              <Link
                href={{ query: { difficulty } }}
                className={cn(
                  'text-[22px] text-[#aaa]',
                  bebasNeue.className,
                  difficulty === difficultyQuery ? 'opacity-60' : 'opacity-30',
                )}
              >
                {difficulty}
              </Link>
            </li>
          ))}
        </ul>
        {isAuth && (
          <button
            type="button"
            onClick={autoScroll ? stopAutoScroll : startAutoScroll}
            className={cn('rounded text-[#aaa]/30', bebasNeue.className)}
          >
            {autoScroll ? 'Stop Auto Scroll' : 'Start Auto Scroll'}
          </button>
        )}
      </div>
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
          <div className="w-[1000px]">
            <div className="flex flex-col gap-[100px]">
              {isLoading ? (
                <div />
              ) : (
                data?.groupedContestants?.map(({ difficulty, gender, problems, scoreList }, index: number) => (
                  <div key={`${difficulty}-${gender}`} className="relative">
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
                      className="mx-auto w-full table-fixed select-none rounded-xl bg-[#202020] text-[#FEFEFE] shadow-md"
                    >
                      <colgroup>
                        <col width={70} />
                        <col />
                        {problems.map((_, index) => (
                          <col key={index} width={50} />
                        ))}
                        <col width={58} />
                        <col width={58} />
                        <col width={58} />
                        <col width={58} />
                      </colgroup>
                      <thead className="sticky top-[0px] z-[9999] bg-[#4D4D4D]">
                        <tr className="h-[35px] bg-[#4D4D4D] text-[#F9F7F7]">
                          <th className="rounded-tl-lg px-2 text-left text-[14px]" colSpan={2}>
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
                          <th colSpan={2} className="rounded-tr-lg text-center text-[#a0a0a0]">
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
                                    <Link href={`/judge/contestant/${id}`} className="flex items-center gap-[12px]">
                                      <TShirtWithNumber backNumber={number} />
                                      <span className="text-[18px] font-medium tracking-wide">{name}</span>
                                    </Link>
                                  ) : (
                                    <div className="flex items-center gap-[12px]">
                                      <TShirtWithNumber backNumber={number} />
                                      <span className="text-[18px] font-medium tracking-wide">{name}</span>
                                    </div>
                                  )}
                                </div>
                              </td>
                              {problems.map(({ name, topReached, topAttempts, zoneReached, zoneAttempts }) => (
                                <td key={name} className="px-1 py-2 text-center text-[#202020]">
                                  <div className="flex flex-col items-center gap-[3px] text-[16px] font-bold">
                                    <div
                                      className={cn(
                                        'flex size-[35px] items-center justify-center rounded-[2px] bg-black',
                                        topReached ? 'bg-reached text-[#202020]' : 'bg-black text-black',
                                      )}
                                    >
                                      {showAttempts ? topAttempts : null}
                                    </div>
                                    <div
                                      className={cn(
                                        'flex size-[35px] items-center justify-center rounded-[2px] bg-black',
                                        zoneReached ? 'bg-reached text-[#202020]' : 'bg-black text-black',
                                      )}
                                    >
                                      {showAttempts ? zoneAttempts : null}
                                    </div>
                                  </div>
                                </td>
                              ))}
                              <td className="px-2 py-2 text-center text-[20px] font-black">{totalTops}</td>
                              <td className="px-2 py-2 text-center text-[20px] font-black">{totalZones}</td>
                              <td className="px-2 py-2 text-center text-[20px] font-black text-[#909090]">
                                {totalTopAttempts}
                              </td>
                              <td className="px-2 py-2 text-center text-[20px] font-black text-[#909090]">
                                {totalZoneAttempts}
                              </td>
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

export default LiveScore;
