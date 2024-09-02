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
        toast(message, { position: 'top-center' });
      } else {
        toast('예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.');
      }
      // 2. 요청이 서버에 도달하지 못한 경우 (네트워크 에러)
      // else if (error.request) {
      //   alert('Network Error: Failed to reach the server. Please try again later.');
      // }
      // // 3. 기타 클라이언트 에러 처리
      // else {
      //   alert(`Client Error: ${error.message}`);
      // }
    },
  });
};

export default useContestantSearch;
