import { Col, Row } from "@/styles/flex";
import { Card, Form, ProgressBar } from "@/styles/global";
import LoadingButton from "@/components/form/LoadingButton";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import InputText from "@/components/form/InputText";
import { useState } from "react";
import { error, success } from "@/libs/alert";
import Router from "next/router";
import Http from "@/libs/http";

export async function getServerSideProps(cx: any) {
  const { rememberToken } = cx.query
  const data = await Http("get", `/api/auth/remember-password/${rememberToken}`);

  if (data.success) {
    return {
      props: { user: data.user }
    }
  }
  return { notFound: true };
}

export default function Page(cx: any) {
  const { user } = cx;
  const [progressValidation, setProgressValidation] = useState(5);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const passValidationRules = [
    (val: string) => val.length >= 6,
    (val: string) => /[A-Z]/.test(val),
    (val: string) => /[0-9]/.test(val),
    (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  ];

  const changePassword = (value: string): void => {
    let progressVal = 0;

    passValidationRules.forEach((rule) => {
      if (rule(value)) progressVal++;
    });

    setProgressValidation(progressVal);
    setForm({ ...form, password: value });
  };

  const isValidPassword = (): boolean => {
    if (form.password !== form.confirmPassword) {
      error("Passwords do not match!");
      return false;
    }

    let isValid = true;

    passValidationRules.forEach((rule) => {
      if (!rule(form.password)) isValid = false;
    });

    if (!isValid) {
      error("Password is not valid!");
    }

    return isValid;
  };

  const onSubmit = (evt: any): void => {
    evt.preventDefault();
    if (!isValidPassword()) {
      return;
    }
    setIsLoading(true);
    Http("post", "/api/auth/remember-password/change-password", { ...form, userId: user._id }).then((data: any) => {
      if (!data.success && data.error) {
        setIsLoading(false);
        error(data.error);
      } else if (data.success && data.message) {
        success(data.message);
        Router.push("/auth/sign-in");
      }
    });
  };

  return (
    <DefaultTemplate title={"New Password"}>
      <Row alignX={"center"} alignY={"center"}>
        <Col size={12} sizeMd={6} paddingTop={50}>
          <h1>Create a new password!</h1>
          <Row direction={"column"}>
            <Col size={12}>
              <p>Enter your new password and confirm it in the form below.</p>
            </Col>
          </Row>
          <Card top={30} bottom={100}>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col size={12}>
                  <InputText
                    required={true}
                    minLength={6}
                    type={"password"}
                    placeholder={"Type your new password"}
                    label={"Password"}
                    value={form.password}
                    onChange={(evt: any) => changePassword(evt.target.value)}
                  >
                    <ProgressBar
                      total={Object.keys(passValidationRules).length}
                      current={progressValidation}
                    />
                  </InputText>
                </Col>
              </Row>
              <Row>
                <Col size={12}>
                  <InputText
                    required={true}
                    minLength={6}
                    placeholder={"Confirm your new password"}
                    type={"password"}
                    label={"Confirm password"}
                    value={form.confirmPassword}
                    onChange={(evt: any) =>
                      setForm({ ...form, confirmPassword: evt.target.value })
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
                    SET NEW PASSWORD
                  </LoadingButton>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
