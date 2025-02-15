'use client';
import { cookies } from 'next/headers';
import { use } from 'react';

import Header from '@/components/common/Header';
import SignUpForm from '@/components/SignUpForm';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface SignUpPageProps {
  searchParams: SearchParams;
}

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  // console.log(searchParams);
  // const cookieHeader = cookies().toString();
  // console.log(cookieHeader);

  const params = use(searchParams);

  console.log('code', params.code);

  // const code = searchParams.code || '';

  // FIXME: 실제 데이터로 변경할 것
  const userInfo = {
    email: 'example@tribe.com',
    name: '홍길동',
  };

  // const userInfo = await fetch(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/naver/user_info`,
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Cookie: decodeURIComponent(cookieHeader),
  //     },
  //     method: 'POST',
  //     body: JSON.stringify({ code }),
  //     credentials: 'include',
  //   }
  // ).then<{ email: string; name: string }>((res) => res.json());

  // console.log('userInfo');
  // console.log(userInfo);

  return (
    <>
      <Header back="/" onClose={() => {}}>
        회원가입
      </Header>
      {/* <SignUpForm code={code} email={userInfo.email} name={userInfo.name} /> */}
    </>
  );
}
