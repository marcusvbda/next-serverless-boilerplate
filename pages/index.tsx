import Head from "next/head";
import Link from "next/link";

export const makeTitle = (subtitle: string) => `${subtitle} - SaaS Boilerplate`;

export default function Home() {
  return (
    <>
      <Head>
        <title>{makeTitle("index")}</title>
      </Head>
      <main>
        <h1>Landing Page Here</h1>
        <Link href="/auth/sign-in">Login</Link>
      </main>
    </>
  );
}
