import Head from "next/head";
import { Row } from "@/styles/flex";
import { Card, Container } from "@/styles/global";
import Image from "next/image";
import styled from "styled-components";
import { makeTitle } from "@/pages/_document";
import Link from "next/link";
import { color } from "@/styles/variables";
import Auth from "@/libs/auth";
import OverflowDialog from "../modal/overflowDialog";
import { useEffect, useState } from "react";

interface IProps {
  title: string;
  children: any;
}

const TopBar = styled.section`
  padding: 7px 0;
  display:flex;
  padding: 7px 30px;
  background-color: ${color.dark.backgroundDarkest};
  margin-bottom: 50px;
  align-items: center;
`;

const TopRight = styled.section`
  margin-left: auto;
`;

const InitialBall = styled.div`
  height: 45px;
  width: 45px;
  background-color: #979797;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export default function Template(props: IProps) {
  const [initials, setInitials] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setInitials(getInitials());
  },[initials])

  const getInitials = ():string => {
    const user = Auth.user();
    if (user?.firstname && user?.lastname) {
      const values = (user.firstname[0] + user.lastname[0]).toUpperCase();
      return values;
    }
    return '';
  }

  const DropdownMenu = (props:any) => {
    return <>
      <InitialBall onClick={() =>setDropdownVisible(!dropdownVisible)}>{props.initials}</InitialBall>
      {dropdownVisible &&  
      <OverflowDialog  overflowClick={() =>setDropdownVisible(false)}>
        <Card>OVERFLOW</Card>
      </OverflowDialog>}
    </>;
  }

  return (
    <>
      <Head>
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container paddingX={'0px'} paddingY={'0px'}>
          <TopBar>
            <Link href='/admin'>
              <Image
                src="/logo-light.svg"
                alt="Picture of the author"
                width={48}
                height={48}
              />
            </Link>
            <TopRight>
              <DropdownMenu initials={initials} />
            </TopRight>
          </TopBar>
          <Row alignX={"center"} alignY={"center"}>
            {props.children}
          </Row>
        </Container>
      </main>
    </>
  );
}
