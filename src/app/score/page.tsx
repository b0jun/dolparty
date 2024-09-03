import Score from './Score';

// async function fetchScoreList() {
//   try {
//     const res = await fetch(`${process.env.BASE_URL}/api/score/list`, {
//       cache: 'no-cache',
//     });
//     if (!res.ok) {
//       throw new Error('Failed to fetch consent information');
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return { message: 'Error fetching consent information' };
//   }
// }

const ScorePage = async () => {
  // const data = await fetchScoreList();
  return <Score />;
};

export default ScorePage;
