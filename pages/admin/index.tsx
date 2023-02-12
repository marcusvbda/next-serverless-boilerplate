import Head from 'next/head'
import Link from 'next/link'
import DefaultTemplate from "@/components/templates/DefaultTemplate";

export default function Home(props:any) {
  return (
    <DefaultTemplate title={"Admin"}>
      <Head>
        <title>ADMIN</title>
      </Head>
      <main>
       <h1>ADMIN</h1>
       <Link href="/">Index</Link>
       <Link href="/auth/sign-in">Login</Link>
      </main>
    </DefaultTemplate>
  )
}
