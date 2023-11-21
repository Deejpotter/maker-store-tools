import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ItemProvider } from '../contexts/ItemContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maker Store Calculations',
  description: 'Calculation tool for CNC components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ItemProvider>
        <body className={inter.className}>{children}</body>
      </ItemProvider>
    </html>
  );
}
