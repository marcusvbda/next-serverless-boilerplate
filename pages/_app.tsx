import type { AppProps } from "next/app";
import Head from "next/head";
import GlobalStyle from "@/styles/global";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
