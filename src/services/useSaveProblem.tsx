import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type ReturnType = {
  contestantId: string;
};
type ErrorResponse = {
  message: string;
};

type BodyType = {
  contestantId: string;
  problemId: number;
  zoneAttempts: number;
  topAttempts: number;
  zoneReached: boolean;
  topReached: boolean;
};

const mutationFn = async (body: BodyType) => {
  const { contestantId, ...bodyData } = body;
  const response: AxiosResponse<ReturnType> = await axios.post(`/api/contestant/${contestantId}/submission`, {
    body: bodyData,
  });
  return response.data;
};

const useSaveProblem = () => {
  return useMutation({
    mutationFn,
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

export default useSaveProblem;
