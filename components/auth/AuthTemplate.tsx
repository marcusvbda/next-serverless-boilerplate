import Head from "next/head";
import { Row } from "@/styles/flex";
import { Container } from "@/styles/global";
import Image from "next/image";
import styled from "styled-components";
import { makeTitle } from "@/pages/index";
import Link from "next/link";

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
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container>
          <TopBar>
            <Link href="/auth/sign-in">
              <Image
                src="/logo-light.svg"
                alt="Picture of the author"
                width={48}
                height={48}
              />
            </Link>
          </TopBar>
          <Row alignX={"center"} alignY={"center"}>
            {props.children}
          </Row>
        </Container>
      </main>
    </>
  );
}
