import Head from "next/head";
import { Row } from "@/styles/flex";
import { Container } from "@/styles/global";
import Image from "next/image";
import styled from "styled-components";
import { makeTitle } from "@/pages/_document";
import Link from "next/link";
import { getCookie } from 'cookies-next';
import Router from "next/router";

interface IProps {
  title: string;
  children: any;
  rightComponent?: any;
}

export const TopBar = styled.section`
  padding: 7px 0;
  display:flex;
`;

export const TopRight = styled.section`
  margin-left: auto;
  width: 150px;
`;

export const isLogged = () => getCookie("jwtToken") ? true : false;
export const user = () => JSON.parse(isLogged() ? getCookie("user") as any : "{}");

export default function template(props: IProps) {
  const handleDefaultRoute = (evt:any) => {
    evt.preventDefault();
    const route  = isLogged() ? "/admin" : "/";
    Router.push(route);
  }

  return (
    <>
      <Head>
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container>
          <TopBar>
            <Link href='#' onClick={handleDefaultRoute}>
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
