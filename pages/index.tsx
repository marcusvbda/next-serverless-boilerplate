import Link from "next/link";
import { Col, Row } from "@/styles/flex";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import { Button } from "@/styles/global";

export default function Page(cx: any) {

  const btnLogin = () => (
    <Link href="/auth/sign-in">
      <Button theme={"primary"}>
        Sign in
      </Button>
    </Link>
  )

  return (
    <DefaultTemplate title={"Landing Page"} rightComponent={btnLogin()}>
      <Col size={12} sizeMd={6} paddingTop={50} >
        <Row alignX="center">
          <h1>Next SaaS Boilerplate</h1>
          <span>
            This is a boilerplate for saas applications using nextjs, typescript, mongodb, and more.
          </span>
        </Row>
        <Row alignX="center" marginY={15}>
          <Col size={12} sizeMd={6} paddingTop={10}>
            {btnLogin()}
          </Col>
        </Row>
        <Row alignX="center">
          <Link href="/auth/register">Register</Link>
        </Row>
      </Col>
    </DefaultTemplate>
  );
}
