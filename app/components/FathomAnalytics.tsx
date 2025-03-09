'use client';

import { useEffect } from 'react';
import { load, trackPageview } from 'fathom-client';

const FATHOM_SITE_ID = 'JCWQDOLY';

export function FathomAnalytics() {
  useEffect(() => {
    load(FATHOM_SITE_ID, {
      includedDomains: ['glitch.maketheinternetweirdagain.com'],
      url: 'https://cdn.usefathom.com/script.js',
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