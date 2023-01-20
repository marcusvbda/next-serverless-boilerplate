import Head from "next/head";
import Link from "next/link";
import { StyledLink } from "@/components/global";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <main>
        <h1>Landing Page Here</h1>
        <div className="flex-row justify-start gap-5">
          <StyledLink href="/auth/sign-in">Login</StyledLink>
        </div>
        <Link href="/admin">Admin</Link>
      </main>
    </>
  );
}
