import Link from "next/link";
import { Col } from "@/styles/flex";
import { Card } from "@/styles/global";
import Button from "@/components/form/Button";
import AuthTemplate from "@/components/auth/AuthTemplate";
import InputText from "@/components/form/InputText";
import styled from "styled-components";
import { useState } from "react";
import { success ,error } from "@/libs/alert";
import Http from "@/libs/http";
import Router from "next/router";

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export default function Home() {
  const [form, setForm] = useState({
    email: "bassalobre.vinicius@gmail.com",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    setIsLoading(true);
    

    Http("post", "/api/auth/send-reset-password", form).then((data: any) => {
      // if (!data.success && data.error) {
      //   error(data.error);
      //   return setIsLoading(false);
      // }
      // success("Password reset email sent");
      // Router.push("/auth/login");
    });

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
