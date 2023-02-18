import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/index.css'
import { useEffect } from 'react';
import { initFirebase } from '@/firebase/config';

export default function App({ Component, pageProps }: AppProps) {

  // Needed to load tw-elements on client side only (See: https://stackoverflow.com/questions/71875270/how-to-install-the-tailwind-elements-in-nextjs)
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  // Code that we want in the app level, but not when testing components
  useEffect(() => {
    initFirebase();
  }, []);

  return <Component {...pageProps} />
}
