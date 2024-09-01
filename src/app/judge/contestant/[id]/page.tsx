import Problems from './Problems';

const ContestantDetail = () => {
  return (
    <main className="flex min-h-full flex-col">
      <div className="flex min-w-[768px] flex-1 bg-backdrop bg-cover bg-center bg-no-repeat">
        <div className="mx-auto w-[1024px] min-w-[768px] bg-white/50 px-[16px] py-[24px]">
          <div className="mb-[24px] flex items-center gap-4">
            <label htmlFor="contestantNumber" className="font-medium">
              선수 번호
            </label>
            <input
              id="contestantNumber"
              placeholder="번호를 입력해주세요."
              className="flex-1 rounded-lg border border-black/10 bg-transparent p-4 outline-none"
            />
          </div>
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
      </div>
    </main>
  );
};

export default ContestantDetail;
