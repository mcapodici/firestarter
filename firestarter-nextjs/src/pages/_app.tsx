import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/index.css'
import { useEffect } from 'react';
import { initFirebase } from '@/firebase/config';
import { useToasts } from '@/components/Toasts';
import { Context } from '@/context/Context';
import { Backend } from '@/backend/Backend';
import { AlertLevel } from '@/components/Alert';

const backend = new Backend();

export default function App({ Component, pageProps }: AppProps) {

  // Code that we want in the app level, but not when testing components
  useEffect(() => {
    initFirebase();
  }, []);

  const [toasts, addToast] = useToasts();

  const addToastThenScroll = (message: string, level?: AlertLevel, tag?: string, removeOthersWithTag?: boolean) => {
    addToast(message, level, tag, removeOthersWithTag);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return <Context.Provider value={{ backend, toasts, addToast: addToastThenScroll }}>
    <Component {...pageProps} />
  </Context.Provider>
}
