import Head from "next/head";
import { Container, TopBar, TopRight } from "@/styles/global";
import Image from "next/image";
import { makeTitle } from "@/pages/_document";
import Link from "next/link";

interface IProps {
  title: string;
  children: any;
  rightComponent?: any;
}

export default function Template(props: IProps) {
  return (
    <>
      <Head>
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container paddingX={'1.5rem'} paddingY={'1.5rem'}>
          <TopBar >
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
          {props.children}
        </Container>
      </main>
    </>
  );
}
