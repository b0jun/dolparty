import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type ReturnType = {
  contestantId: string;
};
type ErrorResponse = {
  message: string;
};
const mutationFn = async (body: { number: string }) => {
  const response: AxiosResponse<ReturnType> = await axios.post('/api/contestant/search', { body });
  return response.data;
};

const useContestantSearch = () => {
  const router = useRouter();
  return useMutation({
    mutationFn,
    onSuccess: ({ contestantId }) => {
      router.push(`/judge/contestant/${contestantId}`);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const message = error.response.data?.message || '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.';
        toast(message);
      } else {
        toast('예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
};

export default useContestantSearch;
