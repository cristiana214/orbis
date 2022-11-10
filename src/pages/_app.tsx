import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Orbis } from '@orbisclub/orbis-sdk';
import { OrbisContext } from '@/orbis/useOrbis';

const orbis = new Orbis();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OrbisContext.Provider value={orbis}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </OrbisContext.Provider>
  );
}

export default MyApp;
