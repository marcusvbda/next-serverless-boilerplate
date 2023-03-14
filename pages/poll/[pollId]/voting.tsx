import DefaultTemplate from "@/components/templates/DefaultTemplate";
import Http from "@/libs/http";
import { size } from "@/styles/variables";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { TopBar, TopRight } from "@/styles/global";
import LineLabelValue from "@/components/form/LineLabelValue";
import { formatDate } from "@/libs/date";

export async function getServerSideProps(cx: any) {
  const { token, pollId } = cx.query
  const data = await Http("get", `/api/poll/unauthenticated/${pollId}/check-token?token=${token}`)

  if (data.success) {
    const poll = data.foundPoll;
    const author = data.foundAuthor;

    return {
      props: { poll, author, email: data.email }
    }
  }
  return { notFound: true };
}

export default function Page(props: any) {

  interface ISideContainer {
    bgColor?: string;
  }

  const SideContainer = styled.section<ISideContainer>`
    width: 50%;
    ${props => props.bgColor && `background-color: ${props.bgColor};`}
    padding: 1.5rem;
    position: relative;
    @media ${size.small} {
      width: 100%;
    }
  `

  const FlexTemplate = styled.section`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: row;

    @media ${size.small} {
      flex-direction: column;
    }
  `

  interface ITitle {
    size: string;
    mt?: string;
  }

  const Title = styled.h2<ITitle>`
    font-size: ${props => props.size ? props.size : '2.5rem'};
    ${props => props.mt && `margin-top: ${props.mt};`}
    font-weight: bold;
    color: #4CC5BB;
    text-align: center;
    margin-bottom: 30px;
  `

  const Card = styled.div`
    background: rgba(217, 217, 217, 0.1);
    border-radius: 10px;
    width: 100%;
    padding: 1.5rem;
    margin-bottom: 30px;
  `

  const CardBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    @media ${size.small} {
      flex-direction: column;
      gap: 10px;
    }
  `

  const EmailBadge = styled.div`
    font-size: 12px;
    padding: 3px 15px;
    background-color: #181821;
    border-radius: 10px;
  `

  const poll = props.poll;
  const author = props.author;

  return (
    <DefaultTemplate title={"Voting"} showTopbar={false} padding="0px">
      <FlexTemplate>
        <SideContainer bgColor="#1D1F2C">
          <TopBar justifyContent="center">
            <Link href='/'>
              <Image
                src="/logo-light.svg"
                alt="Picture of the author"
                width={48}
                height={48}
              />
            </Link>
            {props.rightComponent && <TopRight width={'150px'}>{props.rightComponent}</TopRight>}
          </TopBar>
          <Title size="2.5rem">{poll.title}</Title>
          <Card>{poll.description ? poll.description : "Without description ..."}</Card>
          <Card>
            <Title size="1.5rem">About it</Title>
            <CardBody>
              <LineLabelValue label="Created at" value={formatDate(poll.createdAt)} />
              <LineLabelValue label="Author" value={`${author.firstname} ${author.lastname}`} />
            </CardBody>
            <Title size="1.5rem" mt="50px">Guests</Title>
            <CardBody>
              {Object.keys(poll.voters).map((guest: any, index: number) => (
                <EmailBadge key={index}>{guest}</EmailBadge>
              ))}
              {Object.keys(poll.voters).map((guest: any, index: number) => (
                <EmailBadge key={index}>{guest}</EmailBadge>
              ))}
              {Object.keys(poll.voters).map((guest: any, index: number) => (
                <EmailBadge key={index}>{guest}</EmailBadge>
              ))}
            </CardBody>
          </Card>
        </SideContainer>
        <SideContainer>
          <h1>Teste</h1>
        </SideContainer>
      </FlexTemplate>
    </DefaultTemplate>
  )
}
