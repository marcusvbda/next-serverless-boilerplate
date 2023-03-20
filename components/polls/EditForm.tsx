import { useState } from "react";
import InputText from "../form/InputText";
import LoadingButton from "../form/LoadingButton";
import Http from "@/libs/http";
import InputTextarea from "../form/InputTextarea";
import InputTags from "../form/InputTags";
import { isEmail } from "./CrudForm";
import { error, success } from "@/libs/message";
import { Col, Row } from "@/styles/flex";
import { Form } from "@/styles/global";

interface IEditForm {
  onSaved?: () => void;
  poll: {
    _id: string;
    title: string;
    description?: string;
    options: string[];
    voters: string[];
  }
}

export default function EditForm(props: IEditForm) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: props.poll.title,
    description: props.poll?.description || '',
    options: (props.poll?.options || []) as string[],
    voters: Object.keys((props.poll?.voters || {})) as string[],
  });

  const submit = (evt: any) => {
    setIsLoading(true);
    evt.preventDefault();
    Http("put", `/api/poll/authenticated/${props.poll._id}/edit`, form).then((data: any) => {
      if (!data.success && data.error) {
        error(data.error);
      } else if (data.success && data.message) {
        success(data.message);
        props.onSaved && props.onSaved();
      }
      setIsLoading(false);
    });
  }

  const canSave = () => {
    return form.voters.length > 0 && form.options.length > 0 && form.title.length > 0;
  }

  return <>
    <Row>
      <Col size={12}>
        <h4>Editing a poll</h4>
      </Col>
    </Row>
    <Form onSubmit={submit} marginY={'20px'}>
      <Row>
        <Col size={12}>
          <InputText
            label={"Title *"}
            placeholder={'Type a short title'}
            value={form.title}
            required={true}
            type={"text"}
            onChange={(evt: any) =>
              setForm({ ...form, title: evt.target.value })
            }
          />
        </Col>
      </Row>
      <Row>
        <Col size={12}>
          <InputTextarea
            label={"Description"}
            placeholder={'Describe your poll'}
            value={form.description}
            onChange={(evt: any) =>
              setForm({ ...form, description: evt.target.value })
            }
          />
        </Col>
      </Row>
      <Row>
        <Col size={12}>
          <InputTags
            newBtnText={"Add option"}
            label={"Options *"}
            description={"Type the options and press enter to add"}
            value={form.options}
            unique={true}
            onChange={(val: any) => setForm({ ...form, options: val })}
          />
        </Col>
      </Row>
      <Row>
        <Col size={12}>
          <InputTags
            newBtnText={"Add guest voter"}
            label={"Guest voters *"}
            description={"Type the emails and press enter to add"}
            value={form.voters}
            inputValidator={(val: string) => isEmail(val)}
            unique={true}
            onChange={(val: any) => setForm({ ...form, voters: val })}
          />
        </Col>
      </Row>
      <Row mt={30}>
        <Col size={12}>
          <LoadingButton
            marginBottom={20}
            type="submit"
            opacity={canSave() ? 1 : 0.2}
            disabled={isLoading || !canSave()}
            isLoading={isLoading}
            theme={"primary"}
          >
            Save
          </LoadingButton>
        </Col>
      </Row>
    </Form>
  </>
}