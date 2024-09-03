import ContestantDetail from './ContestantDetail';

async function fetchContestantInfo(id: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/contestant/${id}/info`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch consent information');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { message: 'Error fetching consent information' };
  }
}

const ContestantDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const contestantInfo = await fetchContestantInfo(id);
  return (
    <main className="flex min-h-full flex-col">
      <div className="flex min-w-[768px] flex-1 bg-backdrop bg-cover bg-center bg-no-repeat">
        <ContestantDetail
          number={contestantInfo.number}
          difficulty={contestantInfo.difficulty}
          gender={contestantInfo.gender}
          name={contestantInfo.name}
        />
      </div>
    </main>
  );
};

export default ContestantDetailPage;
