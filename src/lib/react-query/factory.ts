import { Difficulty } from '@prisma/client';

const contestantKeys = {
  base: [{ scope: 'contestant' }] as const,
  lists: () => [{ ...contestantKeys.base[0], entity: 'contestantList' }] as const,
  list: (difficulty: Difficulty | null) => [{ ...contestantKeys.lists()[0], difficulty }] as const,
  problems: (id: string) => [{ ...contestantKeys.base[0], entity: 'contestantProblems', id }] as const,
};

const scoreKeys = {
  base: [{ scope: 'score' }] as const,
  lists: () => [{ ...scoreKeys.base[0], entity: 'scoreList' }] as const,
  liveScoreLists: () => [{ ...scoreKeys.base[0], entity: 'liveScoreList' }] as const,
  liveScoreList: (difficulty: Difficulty) => [{ ...scoreKeys.liveScoreLists()[0], difficulty }] as const,
};

export { contestantKeys, scoreKeys };
