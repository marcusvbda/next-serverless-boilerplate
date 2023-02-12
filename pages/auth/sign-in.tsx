import Link from "next/link";
import { Col } from "@/styles/flex";
import { Card, Form } from "@/styles/global";
import Button from "@/components/form/Button";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import InputText from "@/components/form/InputText";
import InputSwitch from "@/components/form/InputSwitch";
import { useEffect, useState } from "react";
import { error, success} from "@/libs/alert";
import Http from "@/libs/http";
import Router from "next/router";
import { setCookie,deleteCookie } from 'cookies-next';

export async function getServerSideProps(cx: any) {
  const message  = cx.query?.message ?? "";
  return {props: {message}};
}
export default function Page(cx:any) {
  const {message} = cx;

  useEffect(() => {
    if (message) {
      success(message);
      Router.replace('/auth/sign-in', undefined, { shallow: true });
    }
    deleteCookie("jwtToken");
    deleteCookie("user");
  }, [message]);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    setIsLoading(true);

    Http("post", "/api/auth/login", form).then((data: any) => {
      if (!data.success && data.error) {
        error(data.error);
        return setIsLoading(false);
      }

      const cookiePayload:{maxAge? :number} = {};
      if (!form.rememberMe) {
        cookiePayload.maxAge = 60 * 60 * 24 * 1;
      }

      setCookie("jwtToken", data.token, cookiePayload);
      setCookie("user", JSON.stringify(data.user), cookiePayload);
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("continue") ?? "/admin";
      Router.push(redirectUrl);
    });
  };

  return (
    <DefaultTemplate title={"Login"}>
      <Col size={12} sizeMd={6} paddingTop={50}>
        <h1>Sign in</h1>
        <span>
          {"Don't "}have an account to sign in to?{" "}
          <Link href="/auth/register">Register an account instead</Link>.
        </span>
        <Card top={30} bottom={100}>
          <Form onSubmit={onSubmit} blocked={isLoading}>
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
              isLoading={isLoading}
              theme={"primary"}
            >
              SIGN IN
            </Button>
          </Form>
          <Link href="/auth/reset-password">Forgot your password?</Link>
        </Card>
      </Col>
    </DefaultTemplate>
  );
}
