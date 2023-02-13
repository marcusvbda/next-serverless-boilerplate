import Head from "next/head";
import { Row } from "@/styles/flex";
import { Container } from "@/styles/global";
import Image from "next/image";
import styled from "styled-components";
import { makeTitle } from "@/pages/_document";
import Link from "next/link";

interface IProps {
  title: string;
  children: any;
  rightComponent?: any;
}

const TopBar = styled.section`
  padding: 7px 0;
  display:flex;
`;

const TopRight = styled.section`
  margin-left: auto;
  width: 150px;
`;

export default function Template(props: IProps) {

  return (
    <>
      <Head>
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container paddingX={'2rem'} paddingY={'2rem'}>
          <TopBar>
            <Link href='/'>
              <Image
                src="/logo-light.svg"
                alt="Picture of the author"
                width={48}
                height={48}
              />
            </Link>
            {props.rightComponent && <TopRight>{props.rightComponent}</TopRight>}
          </TopBar>
          <Row alignX={"center"} alignY={"center"}>
            {props.children}
          </Row>
        </Container>
      </main>
    </>
  );
}
