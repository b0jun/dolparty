'use client';

import { useRouter } from 'next/navigation';
import { ComponentType, useEffect } from 'react';

import useAuthVerify from '@/services/useAuthVerify';

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { mutate } = useAuthVerify();
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('acToken');
      if (!token) {
        router.replace('/score');
      }
      try {
        mutate(
          { acToken: token },
          {
            onError: (e: any) => {
              localStorage.removeItem('acToken');
              router.replace('/score');
            },
          },
        );
      } catch (error) {
        localStorage.removeItem('acToken');
        router.replace('/score');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;
