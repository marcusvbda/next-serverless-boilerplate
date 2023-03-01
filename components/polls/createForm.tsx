import InputText from "@/components/form/InputText";
import InputTextarea from "@/components/form/InputTextarea";
import LoadingButton from "@/components/form/LoadingButton";
import { Col, Row } from "@/styles/flex";
import { Card, CloseButton, Form } from "@/styles/global";
import { useState } from "react";
import OverflowDialog from "@/components/modal/overflowDialog";
import { confirm, error, success } from "@/libs/message";
import WizardSteps from "@/components/modal/WizardSteps";
import InputTags from "@/components/form/InputTags";
import LineLabelValue from "@/components/form/LineLabelValue";
import Http from "@/libs/http";

interface IProps {
    onCreated?: () => void;
}

export default function CreateForm(props: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const initialFormValue = {
        step: 1,
        title: "",
        description: "",
        voters: [],
        options: []
    }

    const [form, setForm] = useState(initialFormValue);

    const onSubmit = (evt: any): void => {
        evt.preventDefault();
        setDialogVisible(true);
    }

    const nextStep = (evt: any) => {
        evt.preventDefault();
        setForm({ ...form, step: form.step + 1 })
    }

    const dialogConfirmClose = () => {
        confirm("Confirmation", "Do you want to close the survey creating form ?", (clicked: boolean) => {
            if (clicked) {
                setDialogVisible(false);
                setForm(initialFormValue)
            }
        })
    }

    const isEmail = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = re.test(String(email).toLowerCase());
        if (!result) {
            error("Invalid email address!");
        }
        return result;
    }

    const onSubmitStore = (evt: any) => {
        evt.preventDefault();
        setIsLoading(true);
        Http("post", "/api/poll/store", form).then((data: any) => {
            if (!data.success && data.error) {
                error(data.error);
            } else if (data.success && data.message) {
                setDialogVisible(false);
                setForm(initialFormValue)
                success(data.message);
                props.onCreated && props.onCreated();
            }
            setIsLoading(false);
        });
    }

    const CreateFormStep0 = () => (
        <Form onSubmit={nextStep} marginY={'20px'}>
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
                        Next step
                    </LoadingButton>
                </Col>
            </Row>
        </Form>
    )

    const CreateFormStep1 = () => (
        <Form onSubmit={nextStep} marginY={'20px'}>
            <Row>
                <Col size={12}>
                    <InputTags
                        newBtnText={"Add option"}
                        label={"Options"}
                        description={"Type the options and press enter to add"}
                        value={form.options}
                        unique={true}
                        onChange={(val: any) => setForm({ ...form, options: val })}
                    />
                </Col>
            </Row>
            <Row mt={15}>
                <Col size={12}>
                    <LoadingButton
                        marginBottom={20}
                        type="submit"
                        opacity={form.options.length > 0 ? 1 : 0.2}
                        disabled={isLoading || !form.options.length}
                        isLoading={isLoading}
                        theme={"primary"}
                    >
                        Next step
                    </LoadingButton>
                </Col>
            </Row>
        </Form >
    )

    const CreateFormStep2 = () => (
        <Form onSubmit={nextStep} marginY={'20px'}>
            <Row>
                <Col size={12}>
                    <InputTags
                        newBtnText={"Add guest voter"}
                        label={"Guest voters"}
                        description={"Type the emails and press enter to add"}
                        value={form.voters}
                        inputValidator={(val: string) => isEmail(val)}
                        unique={true}
                        onChange={(val: any) => setForm({ ...form, voters: val })}
                    />
                </Col>
            </Row>
            <Row mt={15}>
                <Col size={12}>
                    <LoadingButton
                        marginBottom={20}
                        type="submit"
                        opacity={form.voters.length > 0 ? 1 : 0.2}
                        disabled={isLoading || !form.voters.length}
                        isLoading={isLoading}
                        theme={"primary"}
                    >
                        Next step
                    </LoadingButton>
                </Col>
            </Row>
        </Form >
    )

    const SubmitingFormReview = () => (
        <>
            <Row marginY={15}>
                <Col size={12}>
                    <h4>Review the informations before finish</h4>
                    <LineLabelValue label="Title" value={form.title} />
                    {form.description && <LineLabelValue label="Description" value={form.description} />}
                    <LineLabelValue label="Options" value={`${form.options.length} option${form.options.length > 1 ? 's' : ''}`} />
                    <LineLabelValue label="Voter" value={`${form.voters.length} option${form.voters.length > 1 ? 's' : ''}`} />
                </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
                <Col size={12}>
                    <LoadingButton
                        marginBottom={20}
                        onClick={onSubmitStore}
                        isLoading={isLoading}
                        theme={"primary"}
                    >
                        Create poll
                    </LoadingButton>
                </Col>
            </Row>
        </>
    )

    const CreateDialog = () => {
        return (
            <>
                {dialogVisible &&
                    <OverflowDialog overflowClick={() => dialogConfirmClose()}>
                        <Col size={6} sizeSm={12}>
                            <Card>
                                <CloseButton onClick={() => dialogConfirmClose()}>X</CloseButton>
                                <Row>
                                    <Col size={12}>
                                        <h4>Creating a new poll</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={12}>
                                        <WizardSteps step={form.step} onClick={(val) => setForm({ ...form, step: val })} items={[
                                            { title: "Basic Info" },
                                            { title: "Options" },
                                            { title: "Invites" },
                                            { title: "Conclusion" },
                                        ]} />
                                    </Col>
                                </Row>
                                {form.step === 0 && CreateFormStep0()}
                                {form.step === 1 && CreateFormStep1()}
                                {form.step === 2 && CreateFormStep2()}
                                {form.step === 3 && SubmitingFormReview()}
                            </Card>
                        </Col>
                    </OverflowDialog>}
            </>
        );
    }

    return (
        <>
            {CreateDialog()}
            <Card>
                <Row>
                    <Col size={12}>
                        <h4>Fill the form bellow to create a new poll</h4>
                        <span>
                            First thing first, you need to tell us what is the title and the description of your poll and then you will be able to add questions to it.
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
                            <LoadingButton
                                marginBottom={20}
                                type="submit"
                                disabled={isLoading}
                                isLoading={isLoading}
                                theme={"primary"}
                            >
                                ADD POLL
                            </LoadingButton>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
