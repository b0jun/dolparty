import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { MinusIcon, PlusIcon } from '@/svg';

const ProblemSchema = z.object({
  zoneAttempts: z.number(),
  zoneReached: z.boolean(),
  topAttempts: z.number(),
  topReached: z.boolean(),
});

type ProblemSchemaType = z.infer<typeof ProblemSchema>;

const ProblemItem = ({ index }: { index: number }) => {
  const methods = useForm<ProblemSchemaType>({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      zoneAttempts: 0,
      zoneReached: false,
      topAttempts: 0,
      topReached: false,
    },
  });
  const { register, handleSubmit, watch, setValue } = methods;
  const [zoneAttempts, zoneReached, topAttempts, topReached] = watch([
    'zoneAttempts',
    'zoneReached',
    'topAttempts',
    'topReached',
  ]);

  const increment = (property: 'zoneAttempts' | 'topAttempts') => {
    const currentValue = Number(watch(property));
    if (currentValue < 1000) {
      setValue(property, currentValue + 1);
    }
  };

  const decrement = (property: 'zoneAttempts' | 'topAttempts') => {
    const currentValue = Number(watch(property));

    if (currentValue > 0) {
      setValue(property, currentValue - 1);
    }
  };

  const onSubmit: SubmitHandler<ProblemSchemaType> = data => {
    console.log('onSubmit:', index, data);
  };
  console.log(watch());

  return (
    <li
      key={index}
      className="flex h-[100px] items-center overflow-hidden rounded-lg border border-black/10 bg-white/20"
    >
      <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-full w-[90px] items-center justify-center bg-white/30 font-black">
          <div>
            <span className="text-[#45474B]">No.</span>
            <span className="text-[34px]">{22 + index}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-[30px] px-3">
            <div className="flex">
              <div className="flex h-[70px] flex-col justify-center rounded-lg rounded-br-[50px_160px] border border-black/[0.05] px-3 pb-2 pt-1 shadow-md">
                <label htmlFor={`zoneAttempts_${index}`} className="mb-1 flex text-[12px] text-black/60">
                  Zone Attempts
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/10 bg-[#f4f4f4] text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Decrease"
                    onClick={() => decrement('zoneAttempts')}
                  >
                    <MinusIcon stroke="#00000066" />
                  </button>
                  <input
                    {...register('zoneAttempts')}
                    type="number"
                    id={`zoneAttempts_${index}`}
                    tabIndex={-1}
                    readOnly
                    onMouseDown={e => e.preventDefault()}
                    className="w-[60px] border-0 bg-transparent text-center text-[20px] text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-roledescription="Number field"
                  />
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/10 bg-white/60 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Increase"
                    onClick={() => increment('zoneAttempts')}
                  >
                    <PlusIcon stroke="#00000066" />
                  </button>
                </div>
              </div>
              <label htmlFor={`zoneReached_${index}`} className="cursor-pointer">
                <input
                  {...register('zoneReached')}
                  type="checkbox"
                  id={`zoneReached_${index}`}
                  className="peer hidden"
                />
                <span className="flex h-[70px] w-[70px] items-center justify-center rounded-lg rounded-tl-[50px_160px] border border-black/[0.05] bg-white/60 shadow-md peer-checked:bg-reached peer-checked:font-bold">
                  Zone
                </span>
              </label>
            </div>
            <div className="flex">
              <div className="flex h-[70px] flex-col justify-center rounded-lg rounded-tr-[50px_160px] border border-black/[0.05] px-3 pb-2 pt-1 shadow-md">
                <label htmlFor={`topAttempts_${index}`} className="mb-1 flex text-[12px] text-black/60">
                  Top Attempts
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/10 bg-[#f4f4f4] text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Decrease"
                    onClick={() => decrement('topAttempts')}
                  >
                    <MinusIcon stroke="#00000066" />
                  </button>
                  <input
                    {...register('topAttempts')}
                    type="number"
                    id={`topAttempts_${index}`}
                    tabIndex={-1}
                    readOnly
                    onMouseDown={e => e.preventDefault()}
                    className="w-[60px] border-0 bg-transparent text-center text-[20px] text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-roledescription="Number field"
                  />
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/10 bg-white/60 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Increase"
                    onClick={() => increment('topAttempts')}
                  >
                    <PlusIcon stroke="#00000066" />
                  </button>
                </div>
              </div>
              <label htmlFor={`topReached_${index}`} className="cursor-pointer">
                <input {...register('topReached')} type="checkbox" id={`topReached_${index}`} className="peer hidden" />
                <span className="flex h-[70px] w-[70px] items-center justify-center rounded-lg rounded-bl-[50px_160px] border border-black/[0.05] bg-white/60 shadow-md peer-checked:bg-reached peer-checked:font-bold">
                  Top
                </span>
              </label>
            </div>
          </div>
          {/* 버튼영역 */}
          <div className="flex h-full w-[100px] flex-col">
            <div className="flex flex-1 p-1">
              <div className="flex w-full justify-center gap-2 rounded-md bg-[#AAAAAA]/10 px-[6px] py-1">
                <div className="flex flex-col gap-[2px] text-[8px]">
                  <div
                    className={cn('flex size-[16px] items-center justify-center rounded-sm border border-black', {
                      'bg-reached': topReached,
                    })}
                  >
                    T
                  </div>
                  <div
                    className={cn('flex size-[16px] items-center justify-center rounded-sm border border-black', {
                      'bg-reached': zoneReached,
                    })}
                  >
                    Z
                  </div>
                </div>
                <div className="mt-[2px] w-[55px] text-[14px]">
                  <p className="text-[7px] text-black/30">Attempts</p>
                  <p className="text-[10px] text-black/80">{`${topAttempts}T / ${zoneAttempts}Z`}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-1">
              <button
                type="submit"
                className="mr-4 h-[40px] w-full rounded-lg border bg-[#393E46] font-bold text-[#f7f7f7] shadow-sm"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </form>
    </li>
  );
};

export default ProblemItem;
