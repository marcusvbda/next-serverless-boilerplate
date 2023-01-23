import Head from "next/head";
import Link from "next/link";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <main>
        <h1>Landing Page Here</h1>
        <Link href="/auth/sign-in">Login</Link>
      </main>
    </>
  );
}
