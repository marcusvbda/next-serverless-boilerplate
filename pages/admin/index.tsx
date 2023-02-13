import AdminTemplate from "@/components/templates/AdminTemplate";
import { Col, Row } from "@/styles/flex";
import { Button } from "@/styles/global";
import Link from "next/link";
import Auth from "@/libs/auth";
import { useEffect, useState } from "react";

export default function Page(props: any) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const loggedUser = Auth.user();
    setFirstName(loggedUser.firstname ?? "");
  }, [firstName])

  return (
    <AdminTemplate title={"Admin"}>
      <Col size={12} sizeMd={6} paddingTop={50} >
        <Row alignX={"center"} direction={"column"} alignY={'center'}>
          <h1>Hello, {firstName} !</h1>
          <span>
            Click the button below to manage your created polls.
          </span>
        </Row>
        <Row alignX="center">
          <Col size={12} sizeMd={4} paddingTop={20} >
            <Link href="/admin/polls">
              <Button theme={"primary"}>
                Manage Polls
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </AdminTemplate>
  )
}
