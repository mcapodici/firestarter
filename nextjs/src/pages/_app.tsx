import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/index.css'
import { useEffect } from 'react';
import { initFirebase } from '@/firebase/init';
import { useToasts } from '@/components/Toasts';
import { Context } from '@/context/Context';
import { Backend } from '@/backend/Backend';
import { AlertLevel } from '@/components/Alert';
import useAuthState from '@/auth/useAuthState';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const backend = new Backend();

export default function App({ Component, pageProps }: AppProps) {

  // Code that we want in the app level, but not when testing components
  useEffect(() => {
    initFirebase();
  }, []);

  const [toasts, addToast] = useToasts();

  const [user, authLoading, authError] = useAuthState();

  const addToastThenScroll = (message: string, level?: AlertLevel, tag?: string, removeOthersWithTag?: boolean) => {
    addToast(message, level, tag, removeOthersWithTag);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return <Context.Provider value={{ backend, toasts, addToast: addToastThenScroll, user, authLoading }}>
    <Component {...pageProps} />
  </Context.Provider>
}
