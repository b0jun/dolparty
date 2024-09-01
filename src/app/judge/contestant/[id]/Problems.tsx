'use client';

import ProblemItem from './ProblemItem';

const Problems = () => {
  return (
    <div className="px-[16px]">
      <p className="mb-[6px] text-[18px] text-black/60">Problems</p>
      <ul className="flex flex-col gap-4">
        {new Array(10).fill(0).map((_, index) => (
          <ProblemItem index={index} key={index} />
        ))}
      </ul>
      {/* TODO: REMOVE */}
      <ul>
        <li>Top, Zone은 처음에 누를 수 없다. 눌렀을때 안된다고 토스트 메세지로 알림</li>
        <li />
      </ul>
    </div>
  );
};

export default Problems;
