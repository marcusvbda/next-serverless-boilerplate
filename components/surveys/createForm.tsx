import InputText from "@/components/form/InputText";
import InputTextarea from "@/components/form/InputTextarea";
import LoadingButton from "@/components/form/LoadingButton";
import { Col, Row } from "@/styles/flex";
import { Card, CloseButton, Form } from "@/styles/global";
import { useState } from "react";
import OverflowDialog from "@/components/modal/overflowDialog";
import { confirm } from "@/libs/message";

export default function CreateForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const [form, setForm] = useState({
        title: "LOREM IPSUM",
        description: ""
    });

    const onSubmit = (evt: any): void => {
        evt.preventDefault();
        setDialogVisible(true);
    }

    const dialogConfirmClose = () => {
        confirm("Confirmation", "Do you want to close the survey creating form ?", (clicked: boolean) => {
            if (clicked) {
                setDialogVisible(false);
            }
        })
    }

    const CreateDialog = () => {
        return (
            <>
                {dialogVisible &&
                    <OverflowDialog overflowClick={() => dialogConfirmClose()}>
                        <Col size={8} sizeSm={12}>
                            <Card>
                                <CloseButton onClick={() => dialogConfirmClose()}>X</CloseButton>
                            </Card>
                        </Col>
                    </OverflowDialog>}
            </>
        );
    }

    return (
        <>
            <CreateDialog />
            <Card>
                <Row>
                    <Col size={12}>
                        <h4>Fill the form bellow to create a new survey</h4>
                        <span>
                            First thing first, you need to tell us what is the title and the description of your survey and then you will be able to add questions to it.
                        </span>
                    </Col>
                </Row>
                <Form onSubmit={onSubmit} blocked={isLoading} marginY={'50px'}>
                    <Row>
                        <Col size={12}>
                            <InputText
                                label={"Title"}
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
                                placeholder={'Describe your survey'}
                                value={form.description}
                                onChange={(evt: any) =>
                                    setForm({ ...form, description: evt.target.value })
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
                                ADD SURVEY
                            </LoadingButton>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
