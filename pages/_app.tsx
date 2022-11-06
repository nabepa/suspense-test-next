import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DataStoreProvider } from '../context/DataStore';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataStoreProvider>
      <Component {...pageProps} />
    </DataStoreProvider>
  );
}
