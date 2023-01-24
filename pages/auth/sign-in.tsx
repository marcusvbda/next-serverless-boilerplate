import Link from "next/link";
import { Col } from "@/styles/flex";
import { Card, Button } from "@/styles/global";
import AuthTemplate from "@/components/auth/AuthTemplate";
import InputText from "@/components/form/InputText";
import InputSwitch from "@/components/form/InputSwitch";
import styled from "styled-components";
import { useState } from "react";

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export default function Home() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form submitted", form);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AuthTemplate title={"Login"}>
      <Col size={12} sizeMd={6} paddingTop={50}>
        <Title>Sign in</Title>
        <span>
          {"Don't "}have an account to sign in to?{" "}
          <Link href="/auth/register">Register an account instead</Link>
        </span>
        <Card top={30}>
          <form onSubmit={onSubmit}>
            <InputText
              label={"Email Address"}
              value={form.email}
              required={true}
              type={"email"}
              onChange={(evt: any) =>
                setForm({ ...form, email: evt.target.value })
              }
            />
            <InputText
              required={true}
              minLength={6}
              type={"password"}
              label={"Password"}
              value={form.password}
              onChange={(evt: any) =>
                setForm({ ...form, password: evt.target.value })
              }
            />
            <InputSwitch
              label={"Remember me"}
              value={form.rememberMe}
              onChange={() =>
                setForm({ ...form, rememberMe: !form.rememberMe })
              }
            />
            <Button
              marginBottom={20}
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              theme={"primary"}
            >
              SIGN IN
            </Button>
          </form>
          <Link href="/auth/reset-password">Forgot your password?</Link>
        </Card>
      </Col>
    </AuthTemplate>
  );
}
