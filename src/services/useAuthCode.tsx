import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

type ReturnType = {
  accessToken: string;
};

const mutationFn = async (body: { authCode: string }) => {
  const response: AxiosResponse<ReturnType> = await axios.post('/api/judge/authCode', { body });
  return response.data;
};

const useAuthCode = () => {
  return useMutation({
    mutationFn,
    onSuccess: ({ accessToken }) => {
      localStorage.setItem('acToken', accessToken);
    },
  });
};

export default useAuthCode;
