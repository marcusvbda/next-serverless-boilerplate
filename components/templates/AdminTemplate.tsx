import Head from "next/head";
import { Col, Row } from "@/styles/flex";
import { Card, Container, InitialBall, TopBar, TopRight, CloseButton, CardItem } from "@/styles/global";
import Image from "next/image";
import styled from "styled-components";
import { makeTitle } from "@/pages/_document";
import Link from "next/link";
import { color } from "@/styles/variables";
import Auth from "@/libs/auth";
import OverflowDialog from "@/components/modal/overflowDialog";
import { useEffect, useState } from "react";


const DropdownMenu = () => {
  const [initials, setInitials] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setInitials(getInitials());
  }, [initials])

  const getInitials = (): string => {
    const user = Auth.user();
    if (user?.firstname && user?.lastname) {
      const values = (user.firstname[0] + user.lastname[0]).toUpperCase();
      return values;
    }
    return '';
  }

  return <>
    <InitialBall onClick={() => setDropdownVisible(!dropdownVisible)}>{initials}</InitialBall>
    {dropdownVisible &&
      <OverflowDialog overflowClick={() => setDropdownVisible(false)}>
        <Col size={4} sizeSm={12}>
          <Card>
            <CloseButton onClick={() => setDropdownVisible(false)}>X</CloseButton>
            <Link href='/auth/sign-in'>
              <CardItem>Logoff</CardItem>
            </Link>
          </Card>
        </Col>
      </OverflowDialog>}
  </>;
}

interface IProps {
  title: string;
  children: any;
}

export default function Template(props: IProps) {

  const TopBarAdmin = styled(TopBar)`
    padding: 7px 30px;
    background-color: ${color.dark.backgroundDarkest};
  `;

  return (
    <>
      <Head>
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container paddingX={'0px'} paddingY={'0px'}>
          <TopBarAdmin>
            <Link href='/admin'>
              <Image
                src="/logo-light.svg"
                alt="Picture of the author"
                width={48}
                height={48}
              />
            </Link>
            <TopRight>
              <DropdownMenu />
            </TopRight>
          </TopBarAdmin>
        </Container>
        <Container paddingX={'1.5rem'} paddingY={'1.5rem'} marginB={'100px'}>
          <Col size={12}>
            <Row alignX={"center"} alignY={"center"}>
              {props.children}
            </Row>
          </Col>
        </Container>
      </main>
    </>
  );
}
