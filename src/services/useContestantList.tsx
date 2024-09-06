import { Difficulty, Gender } from '@prisma/client';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';

import { contestantKeys } from '@/lib/react-query/factory';

type Contestant = {
  number: string;
  name: string;
  difficulty: Difficulty;
  gender: Gender;
};
type BodyType = {
  contestantList: Contestant[];
};

const queryFn = async ({ queryKey }: QueryFunctionContext<ReturnType<typeof contestantKeys.list>>) => {
  const { difficulty } = queryKey[0];
  const response: AxiosResponse<BodyType> = await axios('/api/contestant/list', { params: { difficulty } });
  return response.data;
};

const useContestantList = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty') as Difficulty | null;

  return useQuery({
    queryKey: contestantKeys.list(difficulty),
    queryFn,
  });
};

export default useContestantList;
