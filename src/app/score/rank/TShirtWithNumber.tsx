import { TshirtIcon } from '@/svg';

const TShirtWithNumber = ({ backNumber }: { backNumber: string }) => {
  return (
    <div className="relative flex h-[45px] w-[45px] items-center justify-center">
      <TshirtIcon width={45} height={45} fill="#a0a0a0" outline="#fff" className="absolute top-0" />
      <div className="z-10 text-[11px] font-black text-[#333]">{backNumber}</div>
    </div>
  );
};

export default TShirtWithNumber;
