import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={`${process.env.SERVER_URL}/v1/auth/start`}>
        <button className="w-full rounded-[4px] border-[1px] border-solid border-[#35c5f0] bg-[#35c5f0] px-3 py-4 text-[17px] text-white">
          네이버로 시작하기
        </button>
      </Link>
    </div>
  );
}
