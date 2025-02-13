import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "MultiAplication",
    icons: {icon: '/logo.png'}
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
          <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
