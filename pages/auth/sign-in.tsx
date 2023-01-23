import Head from "next/head";
import Link from "next/link";
import { Row, Col } from "@/styles/flex";
import { Container, Card } from "@/styles/global";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <Container>
          <Row alignX={"center"} alignY={"center"}>
            <Col size={12} sizeMd={6}>
              <h1>Sign in</h1>
              <span>
                Don't have an account to sign in to?{" "}
                <a href="#">Register an account instead</a>
              </span>
              <Card>
                <Link href="/">Index</Link>
                <Link href="/admin">Admin</Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
