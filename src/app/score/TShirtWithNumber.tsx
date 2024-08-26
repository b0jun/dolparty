import { TshirtIcon } from '@/svg';

const TShirtWithNumber = ({ backNumber }: { backNumber: number }) => {
  return (
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <TshirtIcon width={40} height={40} fill="#6482AD" className="absolute top-0" />
      <div className="z-10 text-[10px] font-black text-black">{backNumber}</div>
    </div>
  );
};

export default TShirtWithNumber;
