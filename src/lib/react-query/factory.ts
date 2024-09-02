import { Difficulty } from '@prisma/client';

const contestantKeys = {
  base: [{ scope: 'contestant' }] as const,
  lists: () => [{ ...contestantKeys.base[0], entity: 'contestantList' }] as const,
  list: (difficulty: Difficulty | null) => [{ ...contestantKeys.lists()[0], difficulty }] as const,
  problems: (id: string) => [{ ...contestantKeys.base[0], entity: 'contestantProblems', id }] as const,
};

export { contestantKeys };
