import Head from 'next/head'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home(props:any) {
  useEffect(() => {
    // 
  },[])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
       <h1>LOGIN</h1>
       <Link href="/">Index</Link>
       <Link href="/admin">Admin</Link>
      </main>
    </>
  )
}
