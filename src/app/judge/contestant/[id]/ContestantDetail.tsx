'use client';

import { Difficulty, Gender } from '@prisma/client';
import cn from 'classnames';
import { Lobster } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';

import NumberSearchForm from './NumberSearchForm';
import ProblemItem from './ProblemItem';

import useContestantProblems from '@/services/useContestantProblems';

type Props = {
  number: string;
  difficulty: Difficulty;
  gender: Gender;
  name: string;
};

const font = Lobster({ subsets: ['latin'], weight: ['400'] });

const ContestantDetail = ({ number, difficulty, gender, name }: Props) => {
  const { data, isLoading, isError } = useContestantProblems();
  const targetRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  const handleScroll = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setIsAtTop(rect.top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto w-[1024px] min-w-[768px] bg-white/50 px-[16px] py-[24px]">
      <NumberSearchForm isAtTop={isAtTop} />
      <div
        ref={targetRef}
        className="sticky top-0 z-10 mb-[24px] grid grid-cols-4 gap-4 rounded-lg border border-black/10 bg-[#f4f4f4] p-4 pr-[230px]"
      >
        <div className="flex flex-col">
          <span className="text-[14px] text-black/60">선수 번호</span>
          <span className="text-[20px]/[28px] font-bold">{number}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-black/60">난이도</span>
          <span className="text-[20px]/[28px] font-bold">{difficulty}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-black/60">구분</span>
          <span className="text-[20px]/[28px] font-bold">{gender}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-black/60">이름</span>
          <span className="text-[20px]/[28px] font-bold">{name}</span>
        </div>
      </div>
      <div className="mb-[120px] px-[16px]">
        <div className="mb-[6px] flex h-[40px] items-center gap-2 text-[18px] text-black/60">
          <span>Problems</span>
          <div
            className={cn(
              'peer flex h-[20px] w-[20px] items-center justify-center rounded-[10px] border border-black/60 bg-[#aaa]/20 text-[14px]',
              font.className,
            )}
          >
            i
          </div>
          <div className="invisible relative flex h-[40px] items-center rounded-lg bg-[#aaa]/70 px-2 text-[12px] opacity-0 transition-all peer-hover:visible peer-hover:opacity-100">
            <div className="absolute left-[-10px] top-[50%] h-0 w-0 -translate-y-1/2 border-[5px] border-transparent border-r-[#aaa]/70" />
            변경 사항을 적용하려면 문제를 수정한 후 반드시{' '}
            <span className="mx-1 rounded-md bg-[#393E46] p-1 text-[#f7f7f7]">저장</span>
            버튼을 눌러주세요.
          </div>
        </div>
        {!isLoading && data?.problems?.length === 0 && <p>할당된 문제가 없습니다.</p>}
        {isError && <p>유저 정보를 불러오지 못했습니다.</p>}
        <ul className="flex flex-col gap-5">
          {isLoading
            ? new Array(10)
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex h-[100px] animate-pulse items-center overflow-hidden rounded-lg border border-black/10 bg-[#AAAAAA]/70"
                  />
                ))
            : data?.problems?.map(({ id, name, submission }) => (
                <ProblemItem id={id} key={id} name={name} submission={submission} />
              ))}
        </ul>
        {/* TODO: REMOVE */}
        {/* <ul>
          <li>Top, Zone은 처음에 누를 수 없다. 눌렀을때 안된다고 토스트 메세지로 알림</li>
          <li />
        </ul> */}
      </div>
    </div>
  );
};

export default ContestantDetail;
