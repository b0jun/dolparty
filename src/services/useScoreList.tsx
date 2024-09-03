import { Difficulty, Gender } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

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
  rank: number;
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

const queryFn = async () => {
  const response: AxiosResponse<BodyType> = await axios('/api/score/list');
  return response.data;
};

const useScoreList = () => {
  return useQuery({
    queryKey: scoreKeys.lists(),
    queryFn,
  });
};

export default useScoreList;
