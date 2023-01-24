import Link from "next/link";
import { Col } from "@/styles/flex";
import { Card } from "@/styles/global";
import AuthTemplate from "@/components/auth/AuthTemplate";
import InputText from "@/components/form/InputText";
import styled from "styled-components";

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export default function Home() {
  return (
    <AuthTemplate title={"Login"}>
      <Col size={12} sizeMd={6} paddingTop={50}>
        <Title>Sign in</Title>
        <span>
          {"Don't "}have an account to sign in to?{" "}
          <Link href="/auth/register">Register an account instead</Link>
        </span>
        <Card top={30}>
          <InputText label={"Email Address"} />
          <InputText label={"Password"} />
        </Card>
      </Col>
    </AuthTemplate>
  );
}
