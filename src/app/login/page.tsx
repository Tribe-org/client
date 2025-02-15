'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const { push, replace } = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const code = searchParams.get('code');

    // 회원가입을 해야함
    if (code) {
      replace(`/signup?${searchParams.toString()}`);
    }

    // 로그인을 성공함
    if (accessToken) {
      replace('/');
    }
  }, []);

  const handleLogin = () => {
    push('/api/auth/start');
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <Image src="/images/tribe.svg" width={140} height={48} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-2xl leading-[33.6px] font-bold">
            트라이브에 잘 오셨어요!
          </p>
          <p className="text-base leading-[22.4px] font-normal -tracking-[2%]">
            마음껏 도전하고 경험하며 원하는 삶을 그려가요
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-4">
        <Button
          color="primary"
          className="flex items-center justify-center bg-[#03C75A]"
          onClick={handleLogin}
        >
          <Image src="/images/naver.svg" width={16} height={16} alt="" />
          네이버로 시작하기
        </Button>
      </div>
    </section>
  );
}
