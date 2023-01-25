import Link from "next/link";
import { Col } from "@/styles/flex";
import { Card, Button } from "@/styles/global";
import AuthTemplate from "@/components/auth/AuthTemplate";
import InputText from "@/components/form/InputText";
import InputSwitch from "@/components/form/InputSwitch";
import styled from "styled-components";
import { useState } from "react";
import { success } from "@/libs/alert";

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export default function Home() {
  const [form, setForm] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      success("[TESTE] - Formulário enviado com sucesso!");
      console.log("Form submitted", form);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AuthTemplate title={"Reset your password"}>
      <Col size={12} sizeMd={6} paddingTop={50}>
        <Title>Reset your password</Title>
        <span>
          Enter the email address you signed up with and {"we'll"} send you
          instructions as how to reset your password. Or go back to{" "}
          <Link href="/auth/sign-in">sign in page</Link>.
        </span>
        <Card top={30} bottom={100}>
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
            <Button
              marginBottom={20}
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              theme={"primary"}
            >
              RESET PASSWORD
            </Button>
          </form>
        </Card>
      </Col>
    </AuthTemplate>
  );
}
