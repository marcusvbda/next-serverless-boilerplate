import Link from 'next/link'
import AdminTemplate from "@/components/templates/AdminTemplate";

export default function Home(props:any) {
  return (
    <AdminTemplate title={"Admin"}>
      <main>
       <h1>ADMIN</h1>
       <Link href="/">Index</Link>
       <Link href="/auth/sign-in">Login</Link>
      </main>
    </AdminTemplate>
  )
}
