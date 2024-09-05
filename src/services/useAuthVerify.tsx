import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type ReturnType = {
  accessToken: string;
};
type ErrorResponse = {
  message: string;
};
const mutationFn = async (body: any) => {
  const response: AxiosResponse<ReturnType> = await axios.post('/api/judge/verify', { body });
  return response.data;
};

const useAuthVerify = () => {
  return useMutation({
    mutationFn,
    onError: (error: AxiosError<ErrorResponse>) => {
      localStorage.removeItem('acToken');
      if (error.response) {
        const message = error.response.data?.message || '권한이 없습니다.';
        if (message === 'TokenExpiredError') {
          toast('토큰이 만료되었습니다.');
          return;
        }
        toast('권한이 없습니다.');
      } else {
        toast('예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
};

export default useAuthVerify;
