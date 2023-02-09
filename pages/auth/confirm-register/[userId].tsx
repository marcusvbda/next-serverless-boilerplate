import Http from "@/libs/http";

export async function getServerSideProps(cx: any) {
  const { userId }  = cx.query
  const data = await Http("get", `/api/auth/confirm-register/${userId}`); 
  if(data.success) {
    const message = "Your account has been confirmed!";
    return {redirect : {destination: `/auth/sign-in?message=${message}`, permanent: false}}
  }
  return {notFound: true};
}

export default function Page() {
  return (<></>);
}
