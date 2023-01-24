import Head from "next/head";
import { Row } from "@/styles/flex";
import { Container } from "@/styles/global";
import Image from "next/image";
import styled from "styled-components";

interface IProps {
  title: string;
  children: any;
}

export const TopBar = styled.section`
  padding: 7px 0;
`;

export default function AuthTemplate(props: IProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <main>
        <Container>
          <TopBar>
            <Image
              src="/logo-light.svg"
              alt="Picture of the author"
              width={48}
              height={48}
            />
          </TopBar>
          <Row alignX={"center"} alignY={"center"}>
            {props.children}
          </Row>
        </Container>
      </main>
    </>
  );
}
