import { TshirtIcon } from '@/svg';

const TShirtWithNumber = ({ backNumber }: { backNumber: string }) => {
  return (
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <TshirtIcon width={40} height={40} fill="#a0a0a0" className="absolute top-0" />
      <div className="z-10 text-[10px] font-black text-black/80">{backNumber}</div>
    </div>
  );
};

export default TShirtWithNumber;
