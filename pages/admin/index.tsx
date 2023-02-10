import Head from 'next/head'
import Link from 'next/link'

export default function Home(props:any) {
  return (
    <>
      <Head>
        <title>ADMIN</title>
      </Head>
      <main>
       <h1>ADMIN</h1>
       <Link href="/">Index</Link>
       <Link href="/auth/sign-in">Login</Link>
      </main>
    </>
  )
}
