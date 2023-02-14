import Link from "next/link";
import { Col, Row } from "@/styles/flex";
import { Card, Form } from "@/styles/global";
import LoadingButton from "@/components/form/LoadingButton";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import InputText from "@/components/form/InputText";
import { useState } from "react";
import { success, error } from "@/libs/alert";
import Http from "@/libs/http";
import Router from "next/router";

export default function Page() {
  const [form, setForm] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (evt: any): void => {
    evt.preventDefault();
    setIsLoading(true);

    Http("post", "/api/auth/send-reset-password", form).then((data: any) => {
      if (!data.success && data.error) {
        error(data.error);
        return setIsLoading(false);
      }
      if (data.message) {
        success(data.message);
      }
      Router.push("/auth/sign-in");
    });
  };

  return (
    <DefaultTemplate title={"Reset your password"}>
      <Row alignX={"center"} alignY={"center"}>
        <Col size={12} sizeMd={6} paddingTop={50}>
          <h1>Reset your password</h1>
          <span>
            Enter the email address you signed up with and {"we'll"} send you
            instructions as how to reset your password. Or go back to{" "}
            <Link href="/auth/sign-in">sign in page</Link>.
          </span>
          <Card top={30} bottom={100}>
            <Form onSubmit={onSubmit}>
              <InputText
                label={"Email Address"}
                value={form.email}
                placeholder={"Enter your email address"}
                required={true}
                type={"email"}
                onChange={(evt: any) =>
                  setForm({ ...form, email: evt.target.value })
                }
              />
              <LoadingButton
                marginBottom={20}
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                theme={"primary"}
              >
                RESET PASSWORD
              </LoadingButton>
            </Form>
          </Card>
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
