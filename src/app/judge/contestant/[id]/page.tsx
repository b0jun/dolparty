import ContestantDetail from './ContestantDetail';

const ContestantDetailPage = () => {
  return (
    <main className="flex min-h-full flex-col">
      <div className="flex min-w-[768px] flex-1 bg-backdrop bg-cover bg-center bg-no-repeat">
        <ContestantDetail />
      </div>
    </main>
  );
};

export default ContestantDetailPage;
