import { ReactNode } from 'react';

export default function PageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section className="m-auto flex h-svh w-[300px] items-center justify-center">
      {children}
    </section>
  );
}
