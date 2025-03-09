import './globals.css';
import { Inter } from 'next/font/google';
import { load, trackPageview } from 'fathom-client';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Replace XXXXXXXX with your Fathom site ID
const FATHOM_SITE_ID = 'JCWQDOLY';

export const metadata = {
  title: "Welcome to Glitch's Sacred Portal",
  description: 'This is the core of the internet\'s weirdness',
};

function FathomAnalytics() {
  useEffect(() => {
    load(FATHOM_SITE_ID, {
      includedDomains: ['glitch.maketheinternetweirdagain.com'], // Replace with your domain
      url: 'https://cdn.usefathom.com/script.js', // Optional: Only needed if you're using custom domains
    });

    const onRouteChange = () => {
      trackPageview();
    };

    onRouteChange(); // Track initial pageview
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}

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
