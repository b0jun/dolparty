import { TshirtIcon } from '@/svg';

const TShirtWithNumber = ({ backNumber }: { backNumber: string }) => {
  return (
    <div className="relative flex size-[50px] items-center justify-center">
      <TshirtIcon width={50} height={50} fill="#c0c0c0" outline="#fff" className="absolute top-0" />
      <div className="z-10 text-[12px] font-black text-[#333]">{backNumber}</div>
    </div>
  );
};

export default TShirtWithNumber;
