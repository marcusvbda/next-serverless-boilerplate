import InputText from "@/components/form/InputText";
import InputTextarea from "@/components/form/InputTextarea";
import LoadingButton from "@/components/form/LoadingButton";
import { Card, Form } from "@/styles/global";
import { useState } from "react";

export default function CreateForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const onSubmit = (evt: any): void => {
        evt.preventDefault();
        setIsLoading(true);
    }

    return (
        <Card>
            <h4>Fill the form bellow to create a new survey</h4>
            <span>
                First thing first, you need to tell us what is the title and the description of your survey and then you will be able to add questions to it.
            </span>
            <Form onSubmit={onSubmit} blocked={isLoading} marginY={'50px'}>
                <InputText
                    label={"Title"}
                    value={form.title}
                    required={true}
                    type={"text"}
                    onChange={(evt: any) =>
                        setForm({ ...form, title: evt.target.value })
                    }
                />
                <InputTextarea
                    label={"Description"}
                    value={form.description}
                    required={false}
                    onChange={(evt: any) =>
                        setForm({ ...form, description: evt.target.value })
                    }
                />
                <LoadingButton
                    marginBottom={20}
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    theme={"primary"}
                >
                    ADD SURVEY
                </LoadingButton>
            </Form>
        </Card>
    )
}
