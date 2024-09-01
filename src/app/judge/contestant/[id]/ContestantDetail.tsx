'use client';

import NumberSearchForm from './NumberSearchForm';
import Problems from './Problems';

const ContestantDetail = () => {
  return (
    <div className="mx-auto w-[1024px] min-w-[768px] bg-white/50 px-[16px] py-[24px]">
      <NumberSearchForm />
      <div className="sticky top-0 z-10 mb-[24px] grid grid-cols-3 gap-4 rounded-lg border border-black/10 bg-[#f4f4f4] p-4">
        <div className="flex flex-col">
          <span className="text-black/60">선수 번호</span>
          <span className="text-[24px]/[32px] font-bold">001</span>
        </div>
        <div className="flex flex-col">
          <span className="text-black/60">난이도</span>
          <span className="text-[24px]/[32px] font-bold">D1</span>
        </div>
        <div className="flex flex-col">
          <span className="text-black/60">이름</span>
          <span className="text-[24px]/[32px] font-bold">아무개</span>
        </div>
      </div>
      <Problems />
    </div>
  );
};

export default ContestantDetail;
