import { Difficulty, Gender } from '@prisma/client';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';

import { scoreKeys } from '@/lib/react-query/factory';

type Problem = {
  name: string;
  topAttempts: number;
  topReached: boolean;
  zoneAttempts: number;
  zoneReached: boolean;
};
type Score = {
  id: string;
  name: string;
  number: string;
  problems: Problem[];
  rank: number | '-';
  totalTopAttempts: number;
  totalTops: number;
  totalZoneAttempts: number;
  totalZones: number;
};

type groupedContestant = {
  difficulty: Difficulty;
  gender: Gender;
  problems: Array<string>;
  scoreList: Score[];
};
type BodyType = {
  groupedContestants: groupedContestant[];
};

const queryFn = async ({ queryKey }: QueryFunctionContext<ReturnType<typeof scoreKeys.liveScoreList>>) => {
  const { difficulty } = queryKey[0];
  const response: AxiosResponse<BodyType> = await axios('/api/score/live', { params: { difficulty } });
  return response.data;
};

const useLiveScore = () => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty');
  return useQuery({
    queryKey: scoreKeys.liveScoreList(difficulty as Difficulty),
    queryFn,
    enabled: !!difficulty,
    refetchInterval: 60000, // 데이터 갱신 주기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 데이터 갱신
  });
};

export default useLiveScore;
