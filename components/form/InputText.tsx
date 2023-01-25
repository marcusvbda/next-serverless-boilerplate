import { InputSection } from "@/styles/global";

interface IProps {
  label: string;
  type?: string;
  onChange: any;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxlength?: number;
  children?: any;
}

export default function InputText(props: IProps) {
  const type = props.type ?? "text";

  return (
    <InputSection type={type}>
      <label>{props.label}</label>
      <input
        type={type}
        minLength={props.minLength ?? 0}
        maxLength={props.maxlength ?? 255}
        value={props.value ?? ""}
        required={props.required ?? false}
        onChange={props.onChange}
      />
      {props.children}
    </InputSection>
  );
}
