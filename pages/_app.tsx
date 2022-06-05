import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/Auth/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {

  //resolvendo bug de client server do next e pushando js do bootstrap
  useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
