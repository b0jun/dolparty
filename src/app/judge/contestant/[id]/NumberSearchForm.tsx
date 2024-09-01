'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

import { SearchIcon } from '@/svg';

const SearchSchema = z.object({
  contestantNumber: z.string(),
});
type SearchSchemaType = z.infer<typeof SearchSchema>;

const NumberSearchForm = () => {
  const methods = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      contestantNumber: '',
    },
  });
  const { register, control, handleSubmit, watch, setValue } = methods;
  console.log(watch());
  return (
    <form className="mb-[24px] flex items-center justify-end gap-4">
      <label htmlFor="contestantNumber" className="font-medium">
        선수 번호
      </label>
      <div className="flex overflow-hidden rounded-lg border border-black/10 bg-white/30">
        <Controller
          control={control}
          name="contestantNumber"
          render={({ field }) => {
            const { ...rest } = field;
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
          <button type="button" className="flex items-center justify-center rounded-lg bg-[#3F4E4F] p-2">
            <SearchIcon fill="white" width={24} height={24} />
          </button>
        </div>
      </div>
    </form>
  );
};
export default NumberSearchForm;
