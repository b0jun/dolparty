import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Modal from '@/components/Modal';
import useAuthCode from '@/services/useAuthCode';

type Props = {
  open: boolean;
  close: () => void;
  exit: () => void;
  handleAuthSuccess: () => void;
};

const authCodeSchema = z.object({
  authCode: z.string(),
});

type authCodeSchemaType = z.infer<typeof authCodeSchema>;

const JudgeAuthModal = ({ open, close, exit, handleAuthSuccess }: Props) => {
  const { mutate } = useAuthCode();
  const methods = useForm<authCodeSchemaType>({
    resolver: zodResolver(authCodeSchema),
    defaultValues: {
      authCode: '',
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, errors },
  } = methods;

  const onSubmit: SubmitHandler<authCodeSchemaType> = data => {
    mutate(
      { authCode: data.authCode },
      {
        onSuccess: () => {
          close();
          setTimeout(() => {
            exit();
            handleAuthSuccess();
          }, 200);
        },
        onError: (error: any) => {
          if (error.response) {
            const message = error.response.data?.message || '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.';
            setError('authCode', { message });
          } else {
            setError('authCode', { message: '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.' });
          }
        },
      },
    );
  };

  return (
    <Modal
      title="인증 코드를 입력해주세요."
      open={open}
      onClose={() => {
        close();
        setTimeout(() => {
          exit();
        }, 200);
      }}
      onConfirm={() => {
        handleSubmit(onSubmit)();
      }}
      cancelLabel="닫기"
      confirmLabel="인증하기"
      disabled={!isDirty}
    >
      <div className="mx-[px]">
        <input
          autoComplete="off"
          {...register('authCode')}
          className="w-[200px] rounded-sm bg-[#e0e0e0] p-1 focus:outline-none"
        />
        {!!errors.authCode && <p className="mt-1 text-[14px] text-[#BE3144]">{errors.authCode.message?.toString()}</p>}
      </div>
    </Modal>
  );
};

export default JudgeAuthModal;
