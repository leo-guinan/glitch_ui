import './globals.css';
import { Inter } from 'next/font/google';
import { FathomAnalytics } from './components/FathomAnalytics';

const inter = Inter({ subsets: ['latin'] });

// Replace XXXXXXXX with your Fathom site ID
const FATHOM_SITE_ID = 'JCWQDOLY';

export const metadata = {
  title: "Welcome to Glitch's Sacred Portal",
  description: 'This is the core of the internet\'s weirdness',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FathomAnalytics />
        {children}
      </body>
    </html>
  );
}
