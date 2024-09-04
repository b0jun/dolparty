'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

import Spinner from '@/components/Spinner';
import useContestantSearch from '@/services/useContestantSearch';
import { SearchIcon } from '@/svg';

const SearchSchema = z.object({
  contestantNumber: z.string().refine(val => /^\d{3}$/.test(val), {
    message: 'contestantNumber must be exactly 3 digits',
  }),
});

type SearchSchemaType = z.infer<typeof SearchSchema>;

const NumberSearchForm = ({ isAtTop }: { isAtTop: boolean }) => {
  const methods = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      contestantNumber: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;
  const { mutate, isPending } = useContestantSearch();
  const onSubmit: SubmitHandler<SearchSchemaType> = data => {
    mutate({ number: data.contestantNumber });
  };
  const isSearchValid = isValid && !isPending && !isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('z-50 mb-[24px] flex items-center justify-end gap-4 px-[16px]', { 'sticky top-[18px]': isAtTop })}
    >
      <label htmlFor="contestantNumber" className="font-medium">
        선수 번호
      </label>
      <div className="flex overflow-hidden rounded-lg border border-black/10 bg-white/30">
        <Controller
          control={control}
          name="contestantNumber"
          render={({ field }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...rest } = field;
            return (
              <PatternFormat
                {...rest}
                format="###"
                mask="_"
                placeholder="___"
                className="h-[50px] w-[80px] border-none bg-transparent p-4 text-[22px] tracking-widest outline-none"
              />
            );
          }}
        />
        <div className="flex p-1">
          <button
            type="submit"
            disabled={!isSearchValid}
            className={cn(
              'flex items-center justify-center rounded-lg bg-[#3F4E4F] p-2',
              isSearchValid
                ? 'transition-all duration-200 ease-in-out active:scale-95 active:bg-[#3F4E4F]/70'
                : 'opacity-50',
            )}
          >
            {isPending ? <Spinner /> : <SearchIcon fill={isSearchValid ? 'white' : '#aaaaaa'} width={24} height={24} />}
          </button>
        </div>
      </div>
    </form>
  );
};
export default NumberSearchForm;
