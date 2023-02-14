import CreateSurveyForm from "@/components/surveys/createForm";
import ListSurveys from "@/components/surveys/List";
import AdminTemplate from "@/components/templates/AdminTemplate";
import { Col, Row } from "@/styles/flex";

export default function Page() {

  return (
    <AdminTemplate title={"Admin"}>
      <Row>
        <Col size={4} sizeSm={12} smOrder={1} id="create-form">
          <CreateSurveyForm />
        </Col>
        <Col size={8} sizeSm={12}>
          <ListSurveys />
        </Col>
      </Row>
    </AdminTemplate >
  )
}
