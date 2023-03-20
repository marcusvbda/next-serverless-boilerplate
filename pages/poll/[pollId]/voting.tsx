import DefaultTemplate from "@/components/templates/DefaultTemplate";
import Http from "@/libs/http";
import { size } from "@/styles/variables";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { TopBar } from "@/styles/global";
import LineLabelValue from "@/components/form/LineLabelValue";
import { formatDate } from "@/libs/date";
import { Col, Row } from "@/styles/flex";
import RateInput from "@/components/form/RateInput";
import { useEffect, useState } from "react";
import PollStatus from "@/components/polls/PollStatus";


export async function getServerSideProps(cx: any) {
  const { token, pollId } = cx.query
  const data = await Http("get", `/api/poll/unauthenticated/${pollId}/check-token?token=${token}`)

  if (data.success) {
    const poll = data.foundPoll;
    const author = data.foundAuthor;
    const votes = data?.vote?.votes || {};

    return {
      props: { poll, author, email: data.email, token, votes }
    }
  }
  return { notFound: true };
}

interface IRate {
  [index: string]: {
    trust: number,
    effort: number,
    impact: number
  }
}

export default function Page(props: any) {
  const [firstInit, setFirstInit] = useState<boolean>(true);
  const [poll, setPoll] = useState<any>(props.poll);
  const [intervalValue, setIntervalValue] = useState<any>();
  const [rate, setRate] = useState<IRate>(props.votes);

  interface ISideContainer {
    bgColor?: string;
    size?: string;
  }

  const SideContainer = styled.section<ISideContainer>`
    width: ${props => props.size ? props.size : '50%'};
    ${props => props.bgColor && `background-color: ${props.bgColor};`}
    padding: 1.5rem;
    position: relative;
    @media ${size.small} {
      width: 100%!important;
    }
  `

  const FlexTemplate = styled.section`
    display: flex;
    width: 100%;
    min-height: 100vh;
    flex-direction: row;

    @media ${size.small} {
      flex-direction: column;
    }
  `

  interface ITitle {
    size: string;
    mt?: string;
    align?: string;
  }

  const Title = styled.h2<ITitle>`
    font-size: ${props => props.size ? props.size : '2.5rem'};
    ${props => props.mt && `margin-top: ${props.mt};`}
    font-weight: bold;
    color: #4CC5BB;
    text-align: ${props => props.align ? props.align : 'center'};
    margin-bottom: 30px;
  `

  const Card = styled.div`
    background: rgba(217, 217, 217, 0.1);
    border-radius: 10px;
    width: 100%;
    padding: 1.5rem;
    margin-bottom: 30px;
  `

  interface ICardBody {
    direction?: string;
    gap?: string;
    align?: string;
  }

  const CardBody = styled.div<ICardBody>`
    display: flex;
    flex-direction: ${props => props.direction ? props.direction : 'row'};
    align-items: ${props => props.align ? props.align : 'center'};
    gap: ${props => props.gap ? props.gap : '30px'};
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
    margin-bottom: 10px;
  `

  const EmailSection = styled.div`
    display: flex;
    gap: 5px;
  `

  const WaitingSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `

  const author = props.author;

  const setRateValue = (index: string, subIndex: string, value: number) => {
    const newRate: IRate = { ...rate };

    if (!newRate[index]) {
      newRate[index] = {
        trust: 0,
        effort: 0,
        impact: 0
      }
    }
    if (subIndex === "trust") newRate[index].trust = value;
    if (subIndex === "effort") newRate[index].effort = value;
    if (subIndex === "impact") newRate[index].impact = value;

    setRate(newRate);
  }

  useEffect(() => {
    const checkUpdate = async () => {
      const data = await Http("get", `/api/poll/unauthenticated/${poll._id}/find`)
      if (data.success) {
        // if (data.poll.status !== poll.status) {
        setPoll({ ...poll, status: data.poll.status });
        // }
      }
    }

    clearInterval(intervalValue);
    let _interval = setInterval(async () => {
      await checkUpdate();
    }, 5000);

    setIntervalValue(_interval)

    if (firstInit) {
      setFirstInit(false);
      return;
    }

    const storeVote = async () => {
      await Http("post", `/api/poll/unauthenticated/${poll._id}/store-votes?token=${props.token}`, { votes: rate })
    }

    storeVote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate])

  return (
    <DefaultTemplate title={"Voting"} showTopbar={false} padding="0px">
      <FlexTemplate>
        <SideContainer bgColor="#1D1F2C" size="40%" >
          <TopBar justifyContent="center">
            <Link href='/'>
              <Image
                src="/logo-light.svg"
                alt="Picture of the author"
                width={48}
                height={48}
              />
            </Link>
          </TopBar>
          <Title size="2.5rem">{poll.title}</Title>
          {poll.description && <div style={{ marginBottom: 50 }}>
            poll.description</div>
          }
          <Title size="1.5rem" align="left">About it</Title>
          <LineLabelValue label="Created at" value={formatDate(poll.createdAt)} />
          <LineLabelValue label="Author" value={`${author.firstname} ${author.lastname}`} />
          <LineLabelValue label="Status">
            <PollStatus status={poll.status} />
          </LineLabelValue>
          <Title size="1.5rem" mt="50px" align="left">Guests</Title>
          <EmailSection>
            {Object.keys(poll.voters).map((guest: any, index: number) => (
              <EmailBadge key={index}>{guest}</EmailBadge>
            ))}
          </EmailSection>
        </SideContainer>
        <SideContainer size="60%">
          {poll.status == "ST" && (
            <WaitingSection>
              <h1>Polling time is stopped !</h1>
            </WaitingSection>
          )}
          {poll.status == "WA" && (
            <WaitingSection>
              <h1>Polling time is paused !</h1>
            </WaitingSection>
          )}
          {poll.status == "IP" && (
            <>
              <Title size="2.5rem">Polling time is in progress !</Title>
              <Row>
                {poll.options.map((option: any, index: number) => (
                  <Col size={12} sizeMd={6} key={index}>
                    <Card>
                      <Title size="1.5rem" align="left">{option}</Title>
                      <CardBody direction="column" gap="8px" align="flex-start">
                        <RateInput label="Impact" value={rate[option]?.impact ?? 0} onChange={(val: number) => setRateValue(option, "impact", val)} />
                        <RateInput label="Trust" value={rate[option]?.trust ?? 0} onChange={(val: number) => setRateValue(option, "trust", val)} />
                        <RateInput label="Effort" value={rate[option]?.effort ?? 0} onChange={(val: number) => setRateValue(option, "effort", val)} />
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </SideContainer>
      </FlexTemplate>
    </DefaultTemplate >
  )
}
