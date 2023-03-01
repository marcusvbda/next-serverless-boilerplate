import { InputSection } from "@/styles/global";

interface IProps {
    label?: string;
    onChange: any;
    value?: string;
    required?: boolean;
    minLength?: number;
    maxlength?: number;
    children?: any;
    options: { value: string | number, label: string }[];
    mb?: string;
}

export default function InputSelect(props: IProps) {

    return (
        <InputSection mbSection={props.mb || '17px'} mbInput={props.mb || '10px'}>
            {props.label && <label>{props.label}</label>}
            <select
                value={props.value ?? ""}
                required={props.required ?? false}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            {props.children}
        </InputSection>
    );
}
