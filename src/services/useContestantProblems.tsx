import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';

import { contestantKeys } from '@/lib/react-query/factory';

export type Submission = {
  topAttempts: number;
  topReached: boolean;
  zoneAttempts: number;
  zoneReached: boolean;
};
type Problem = {
  id: number;
  name: string;
  submission: Submission;
};
type BodyType = {
  problems: Problem[];
};

const queryFn = async ({ queryKey }: QueryFunctionContext<ReturnType<typeof contestantKeys.problems>>) => {
  const { id } = queryKey[0];
  const response: AxiosResponse<BodyType> = await axios(`/api/contestant/${id}/problems`);
  return response.data;
};

const useContestantProblems = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: contestantKeys.problems(id as string),
    queryFn,
  });
};

export default useContestantProblems;
