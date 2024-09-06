import { Suspense } from 'react';

import LiveScore from './LiveScore';

const LiveScorePage = () => {
  return (
    <Suspense>
      <LiveScore />
    </Suspense>
  );
};
export default LiveScorePage;
