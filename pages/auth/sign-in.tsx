import Link from "next/link";
import { Col, Row } from "@/styles/flex";
import { Card, Form } from "@/styles/global";
import LoadingButton from "@/components/form/LoadingButton";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import InputText from "@/components/form/InputText";
import InputSwitch from "@/components/form/InputSwitch";
import { useEffect, useState } from "react";
import { error, success } from "@/libs/message";
import Http from "@/libs/http";
import Router from "next/router";
import Auth from "@/libs/auth";
import type { IConfig } from "@/libs/auth";

export async function getServerSideProps(cx: any) {
  const message = cx.query?.message ?? "";
  return { props: { message } };
}
export default function Page(cx: any) {
  const { message } = cx;

  useEffect(() => {
    if (message) {
      success(message);
      Router.replace('/auth/sign-in', undefined, { shallow: true });
    }
    Auth.logout();
  }, [message]);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (evt: any): void => {
    evt.preventDefault();
    setIsLoading(true);

    Http("post", "/api/auth/login", form).then((data: any) => {
      if (!data.success && data.error) {
        error(data.error);
        return setIsLoading(false);
      }

      const cookiePayload: IConfig = {};
      if (!form.rememberMe) {
        cookiePayload.maxAge = 60 * 60 * 24 * 1;
      }

      Auth.login(data.token, data.user, cookiePayload);
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("continue") ?? "/admin";
      Router.push(redirectUrl);
    });
  };

  return (
    <DefaultTemplate title={"Login"}>
      <Row alignX={"center"} alignY={"center"}>
        <Col size={12} sizeMd={6} paddingTop={50}>
          <h1>Sign in</h1>
          <span>
            {"Don't "}have an account to sign in to?{" "}
            <Link href="/auth/register">Register an account instead</Link>.
          </span>
          <Card top={30} bottom={100}>
            <Form onSubmit={onSubmit} blocked={isLoading}>
              <Row>
                <Col size={12}>
                  <InputText
                    label={"Email Address"}
                    value={form.email}
                    required={true}
                    type={"email"}
                    onChange={(evt: any) =>
                      setForm({ ...form, email: evt.target.value })
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col size={12}>
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
                </Col>
              </Row>
              <Row>
                <Col size={12}>
                  <LoadingButton
                    marginBottom={20}
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    theme={"primary"}
                  >
                    SIGN IN
                  </LoadingButton>
                </Col>
              </Row>
            </Form>
            <Link href="/auth/reset-password">Forgot your password?</Link>
          </Card>
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
