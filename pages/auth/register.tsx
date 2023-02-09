import Link from "next/link";
import { Col, Row } from "@/styles/flex";
import { Card, ProgressBar } from "@/styles/global";
import Button from "@/components/form/Button";
import AuthTemplate from "@/components/auth/AuthTemplate";
import InputText from "@/components/form/InputText";
import styled from "styled-components";
import { useState } from "react";
import { error, success } from "@/libs/alert";
import Router from "next/router";
import Http from "@/libs/http";

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export default function Page() {
  const [progressValidation, setProgressValidation] = useState(0);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
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

  const changePassword = (value: string) => {
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

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    if (!isValidPassword()) {
      return;
    }
    setIsLoading(true);
    Http("post", "/api/auth/register", form).then((data: any) => {
      setIsLoading(false);
      if (!data.success && data.error) {
        error(data.error);
      } else if (data.success && data.message) {
        success(data.message);
        Router.push("/auth/sign-in");
      }
    });
  };

  return (
    <AuthTemplate title={"Register"}>
      <Col size={12} sizeMd={6} paddingTop={50}>
        <Title>{"Let's"} get you signed up!</Title>
        <Row direction={"column"}>
          <p>Enter your details in the form below to create a new account.</p>
          <p>
            <span>Already have an account? </span>{" "}
            <Link href="/auth/sign-in">Sign in instead</Link>.
          </p>
        </Row>
        <Card top={30} bottom={100}>
          <form onSubmit={onSubmit}>
            <Row>
              <Col size={12} sizeMd={6}>
                <InputText
                  label={"First name"}
                  value={form.firstname}
                  required={true}
                  onChange={(evt: any) =>
                    setForm({ ...form, firstname: evt.target.value })
                  }
                />
              </Col>
              <Col size={12} sizeMd={6}>
                <InputText
                  label={"Last name"}
                  value={form.lastname}
                  required={true}
                  onChange={(evt: any) =>
                    setForm({ ...form, lastname: evt.target.value })
                  }
                />
              </Col>
            </Row>
            <InputText
              required={true}
              minLength={6}
              type={"email"}
              label={"Email Address"}
              value={form.email}
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
              onChange={(evt: any) => changePassword(evt.target.value)}
            >
              <ProgressBar
                total={Object.keys(passValidationRules).length}
                current={progressValidation}
              />
            </InputText>
            <InputText
              required={true}
              minLength={6}
              type={"password"}
              label={"Confirm password"}
              value={form.confirmPassword}
              onChange={(evt: any) =>
                setForm({ ...form, confirmPassword: evt.target.value })
              }
            />
            <Button
              marginBottom={20}
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              theme={"primary"}
            >
              REGISTER
            </Button>
          </form>
        </Card>
      </Col>
    </AuthTemplate>
  );
}
