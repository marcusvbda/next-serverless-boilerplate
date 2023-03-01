import CreatePollForm from "@/components/polls/createForm";
import ListPolls from "@/components/polls/List";
import AdminTemplate from "@/components/templates/AdminTemplate";
import { Col, Row } from "@/styles/flex";

export default function Page() {

  return (
    <AdminTemplate title={"Admin"}>
      <Row>
        <Col size={4} sizeSm={12} smOrder={1} id="create-form">
          <CreatePollForm />
        </Col>
        <Col size={8} sizeSm={12}>
          <ListPolls />
        </Col>
      </Row>
    </AdminTemplate >
  )
}
