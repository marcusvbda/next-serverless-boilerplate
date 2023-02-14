import { InputSection } from "@/styles/global";

interface IProps {
  label?: string;
  type?: string;
  onChange: any;
  value?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxlength?: number;
  children?: any;
}

export default function InputText(props: IProps) {
  const type = props.type ?? "text";

  return (
    <InputSection type={type}>
      {props.label && <label>{props.label}</label>}
      <input
        type={type}
        minLength={props.minLength ?? 0}
        maxLength={props.maxlength ?? 255}
        placeholder={props.placeholder ?? ""}
        value={props.value ?? ""}
        required={props.required ?? false}
        onChange={props.onChange}
      />
      {props.children}
    </InputSection>
  );
}
