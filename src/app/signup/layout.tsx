import { ReactNode } from 'react';

export default function SignUpLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <section>{children}</section>;
}
