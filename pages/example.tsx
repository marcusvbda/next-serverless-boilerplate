import { TopContent, BodyContent } from "@/fragments/example";
import Http from "@/libs/http";
import { useEffect } from "react";

export async function getServerSideProps(cx: any) {
  const data = await Http("get", `/api/example`)

  if (data.success) {
    const content = data.content;
    console.log(content)

    return {
      props: { content }
    }
  }
  return { notFound: true };
}

export default function Page(props: any) {

  useEffect(() => {
    Http("get", `/api/example2`).then(resp => {
      console.log(resp)
    })
  }, []);

  return (
    <>
      <TopContent />
      <BodyContent content={props.content} />
    </>
  );
}
