import DefaultTemplate from "@/components/templates/DefaultTemplate";
import Http from "@/libs/http";

export async function getServerSideProps(cx: any) {
  const { token, pollId } = cx.query
  const data = await Http("get", `/api/poll/unauthenticated/${pollId}/check-token?token=${token}`)
  const poll = data.foundPoll;
  delete poll.voters;

  if (data.success) {
    return {
      props: { poll, email: data.email }
    }
  }
  return { notFound: true };
}

export default function Page(props: any) {
  console.log(props)
  return (
    <DefaultTemplate title={"Voting"} showTopbar={false}>
      <h1>Teste</h1>
    </DefaultTemplate>
  )
}
