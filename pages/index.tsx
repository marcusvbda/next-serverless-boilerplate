import Head from 'next/head'
import { useEffect } from 'react'
import { getResponse } from "@/pages/api/get";
import Link from 'next/link'

export async function getServerSideProps(cx:any) {
  const response = getResponse({ name: "GET SERVERSIDE RESULT" })
  
  return {
    props: {
      ...response
    }, 
  }
}

export default function Home(props:any) {
  // console.log(props) 

  const fetchData = () => {  
    fetch("/api/get", {
      method: "GET",
    }).then((response:any) => {
      response.json().then((data:any) => {
        console.log(data)
      })
    })

    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({name : "POST CLIENTSIDE RESULT"})
    }).then((response:any) => {
      response.json().then((data:any) => {
        console.log(data)
      })
    })
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <main>
       <h1>Index</h1>
       <Link href="/auth/sign-in">Login</Link>
       <Link href="/admin">Admin</Link>
      </main>
    </>
  )
}
