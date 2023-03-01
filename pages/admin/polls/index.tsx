import CreatePollForm from "@/components/polls/createForm";
import ListPolls from "@/components/polls/List";
import AdminTemplate from "@/components/templates/AdminTemplate";
import { Col, Row } from "@/styles/flex";
import { useRef } from "react";

export default function Page() {
  const listRef = useRef<any>();

  const onCreated = (): void => {
    listRef.current.refresh();
  }

  return (
    <AdminTemplate title={"Admin"}>
      <Row>
        <Col size={4} sizeSm={12} smOrder={1} id="create-form">
          <CreatePollForm onCreated={onCreated} />
        </Col>
        <Col size={8} sizeSm={12}>
          <ListPolls listRef={listRef} />
        </Col>
      </Row>
    </AdminTemplate >
  )
}
