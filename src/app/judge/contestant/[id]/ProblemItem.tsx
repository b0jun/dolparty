import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Spinner from '@/components/Spinner';
import { contestantKeys } from '@/lib/react-query/factory';
import { Submission } from '@/services/useContestantProblems';
import useSaveProblem from '@/services/useSaveProblem';
import { MinusIcon, PlusIcon } from '@/svg';

const ProblemSchema = z
  .object({
    zoneAttempts: z.number().min(0),
    zoneReached: z.boolean(),
    topAttempts: z.number().min(0),
    topReached: z.boolean(),
  })
  .refine(data => data.zoneAttempts <= data.topAttempts, {
    message: 'Zone attempts must be less than or equal to top attempts',
    path: ['zoneAttempts'],
  });

type ProblemSchemaType = z.infer<typeof ProblemSchema>;

type Props = {
  id: number;
  name: string;
  submission: Submission;
};

const ProblemItem = ({ id: problemId, name, submission }: Props) => {
  const queryClient = useQueryClient();
  const { id: contestantId } = useParams();
  const { mutate: saveProblem } = useSaveProblem();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const methods = useForm<ProblemSchemaType>({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      zoneAttempts: submission.zoneAttempts,
      zoneReached: submission.zoneReached,
      topAttempts: submission.topAttempts,
      topReached: submission.topReached,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset({
      zoneAttempts: submission.zoneAttempts,
      zoneReached: submission.zoneReached,
      topAttempts: submission.topAttempts,
      topReached: submission.topReached,
    });
    setIsSaveLoading(false);
  }, [submission, reset]);

  const [zoneAttempts, zoneReached, topAttempts, topReached] = watch([
    'zoneAttempts',
    'zoneReached',
    'topAttempts',
    'topReached',
  ]);

  // const increment = (property: 'zoneAttempts' | 'topAttempts') => {
  //   const currentValue = Number(watch(property));
  //   if (currentValue < 1000) {
  //     setValue(property, currentValue + 1, { shouldDirty: true });
  //   }
  // };

  // const decrement = (property: 'zoneAttempts' | 'topAttempts') => {
  //   const currentValue = Number(watch(property));

  //   if (currentValue > 0) {
  //     setValue(property, currentValue - 1, { shouldDirty: true });
  //   }
  // };

  const increment = (property: 'zoneAttempts' | 'topAttempts') => {
    const currentZoneAttempts = Number(watch('zoneAttempts'));
    const currentTopAttempts = Number(watch('topAttempts'));

    if (property === 'zoneAttempts') {
      setValue('zoneAttempts', currentZoneAttempts + 1, { shouldDirty: true });
      if (currentZoneAttempts + 1 > currentTopAttempts) {
        setValue('topAttempts', currentZoneAttempts + 1, { shouldDirty: true });
      }
    } else if (property === 'topAttempts') {
      setValue('topAttempts', currentTopAttempts + 1, { shouldDirty: true });
    }
  };

  const decrement = (property: 'zoneAttempts' | 'topAttempts') => {
    const currentZoneAttempts = Number(watch('zoneAttempts'));
    const currentTopAttempts = Number(watch('topAttempts'));

    if (property === 'zoneAttempts' && currentZoneAttempts > 0) {
      setValue('zoneAttempts', currentZoneAttempts - 1, { shouldDirty: true });
    } else if (property === 'topAttempts' && currentTopAttempts > 0) {
      setValue('topAttempts', currentTopAttempts - 1, { shouldDirty: true });
    }
  };

  const onSubmit: SubmitHandler<ProblemSchemaType> = data => {
    setIsSaveLoading(true);
    saveProblem(
      {
        contestantId: contestantId as string,
        problemId,
        ...data,
      },
      {
        onSuccess: async (_, variables) => {
          await queryClient.invalidateQueries({
            queryKey: contestantKeys.problems(variables.contestantId),
          });
          toast('문제 점수가 반영되었습니다.', { type: 'success' });
        },
      },
    );
  };
  const onInvalid = (errors: any) => {
    if (errors.zoneAttempts.message) {
      toast('Zone 시도 횟수는 Top 시도 횟수보다 많을 수 없습니다.', {
        type: 'warning',
      });
    }
  };

  return (
    <li className="relative flex h-[100px] items-center overflow-hidden rounded-lg border border-black/10 bg-white/20">
      {isSaveLoading && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center bg-[#0a0a0a]/20">
          <div className="flex items-center gap-2 rounded-md bg-[#3C3D37]/100 px-4 py-3">
            <Spinner />
            <span className="text-white">점수가 제출되고 있습니다.</span>
          </div>
        </div>
      )}
      <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="mr-2 flex h-full w-[90px] items-center justify-center bg-white/30 font-black">
          <div>
            <span className="text-[#45474B]">No.</span>
            <span className="text-[34px]">{name}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-[30px] px-3">
            <div className="flex">
              <div className="flex h-[70px] flex-col justify-center rounded-lg rounded-br-[50px_160px] border border-black/[0.05] px-3 pb-2 pt-1 shadow-md">
                <label htmlFor={`zoneAttempts_${problemId}`} className="mb-1 flex text-[12px] text-black/60">
                  Zone Attempts
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/5 bg-[#f4f4f4] text-sm font-medium text-gray-800 shadow-sm outline-none transition-all duration-200 ease-in-out hover:bg-gray-50 focus:bg-gray-50 active:scale-95 active:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Decrease"
                    onClick={() => decrement('zoneAttempts')}
                  >
                    <MinusIcon stroke="#00000066" />
                  </button>
                  <input
                    {...register('zoneAttempts')}
                    type="number"
                    id={`zoneAttempts_${problemId}`}
                    tabIndex={-1}
                    readOnly
                    onMouseDown={e => e.preventDefault()}
                    className="w-[60px] border-0 bg-transparent text-center text-[20px] text-gray-800 focus:outline-[#323232]/70 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-roledescription="Number field"
                  />
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/5 bg-[#f4f4f4] text-sm font-medium text-gray-800 shadow-sm outline-none transition-all duration-200 ease-in-out hover:bg-gray-50 focus:bg-gray-50 active:scale-95 active:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Increase"
                    onClick={() => increment('zoneAttempts')}
                  >
                    <PlusIcon stroke="#00000066" />
                  </button>
                </div>
              </div>
              <label htmlFor={`zoneReached_${problemId}`} className="flex cursor-pointer items-end">
                <input
                  {...register('zoneReached')}
                  type="checkbox"
                  id={`zoneReached_${problemId}`}
                  className="peer hidden"
                />
                <span className="flex size-[70px] select-none items-center justify-center rounded-lg rounded-tl-[50px_160px] border border-black/[0.05] bg-white/60 shadow-md transition-all duration-200 ease-in-out active:scale-95 active:bg-gray-300 peer-checked:bg-reached peer-checked:font-bold peer-checked:text-[#222831]">
                  Zone
                </span>
              </label>
            </div>
            <div className="flex">
              <div className="flex h-[70px] flex-col justify-center rounded-lg rounded-tr-[50px_160px] border border-black/[0.05] px-3 pb-2 pt-1 shadow-md">
                <label htmlFor={`topAttempts_${problemId}`} className="mb-1 flex text-[12px] text-black/60">
                  Top Attempts
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/5 bg-[#f4f4f4] text-sm font-medium text-gray-800 shadow-sm outline-none transition-all duration-200 ease-in-out hover:bg-gray-50 focus:bg-gray-50 active:scale-95 active:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Decrease"
                    onClick={() => decrement('topAttempts')}
                  >
                    <MinusIcon stroke="#00000066" />
                  </button>
                  <input
                    {...register('topAttempts')}
                    type="number"
                    id={`topAttempts_${problemId}`}
                    tabIndex={-1}
                    readOnly
                    onMouseDown={e => e.preventDefault()}
                    className="w-[60px] border-0 bg-transparent text-center text-[20px] text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-roledescription="Number field"
                  />
                  <button
                    type="button"
                    className="inline-flex size-[35px] items-center justify-center gap-x-2 rounded-md border border-black/5 bg-[#f4f4f4] text-sm font-medium text-gray-800 shadow-sm outline-none transition-all duration-200 ease-in-out hover:bg-gray-50 focus:bg-gray-50 active:scale-95 active:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    tabIndex={-1}
                    aria-label="Increase"
                    onClick={() => increment('topAttempts')}
                  >
                    <PlusIcon stroke="#00000066" />
                  </button>
                </div>
              </div>
              <label htmlFor={`topReached_${problemId}`} className="cursor-pointer">
                <input
                  {...register('topReached')}
                  type="checkbox"
                  id={`topReached_${problemId}`}
                  className="peer hidden"
                />
                <span className="flex size-[70px] select-none items-center justify-center rounded-lg rounded-bl-[50px_160px] border border-black/[0.05] bg-white/60 shadow-md transition-all duration-200 ease-in-out active:scale-95 active:bg-gray-300 peer-checked:bg-reached peer-checked:font-bold peer-checked:text-[#222831]">
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
                disabled={!isDirty || isSaveLoading}
                className={cn(
                  'mr-4 flex h-[40px] w-full items-center justify-center rounded-lg border bg-[#393E46] font-bold text-[#f7f7f7] shadow-sm',
                  !isDirty || isSaveLoading
                    ? 'opacity-50'
                    : 'transition-all duration-200 ease-in-out active:scale-95 active:bg-[#393E46]/60',
                )}
              >
                {isSaveLoading ? <Spinner /> : '저장'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </li>
  );
};

export default ProblemItem;
