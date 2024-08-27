import { Difficulty } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

import { contestantKeys } from '@/lib/react-query/factory';

const queryFn = async ({ queryKey }: any) => {
  const { difficulty } = queryKey[0];
  return axios('/api/contestant/list', { params: { difficulty } }).then((res: any) => res.data);
};

const useContestantList = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('type');

  return useQuery({
    queryKey: contestantKeys.list(difficulty as Difficulty),
    queryFn,
    placeholderData: keepPreviousData,
  });
};

export default useContestantList;
