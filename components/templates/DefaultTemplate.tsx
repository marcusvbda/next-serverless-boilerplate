import Head from "next/head";
import { Container, TopBar, TopRight } from "@/styles/global";
import Image from "next/image";
import { makeTitle } from "@/pages/_document";
import Link from "next/link";

interface IProps {
  title: string;
  children: any;
  rightComponent?: any;
  showTopbar?: boolean;
  padding?: string;
}

export default function Template(props: IProps) {
  const showTopbar = props.showTopbar === undefined ? true : props.showTopbar;

  const padding = props.padding ? props.padding : '1.5rem';
  return (
    <>
      <Head>
        <title>{makeTitle(props.title)}</title>
      </Head>
      <main>
        <Container paddingX={padding} paddingY={padding}>
          {showTopbar &&
            <TopBar>
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
          }
          {props.children}
        </Container>
      </main>
    </>
  );
}
