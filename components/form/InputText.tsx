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
  width?: string;
  autofocus?: boolean;
  mbSection?: string;
  mbInput?: string;
  onBlur?: any;
  onKeyDown?: any;
}

export default function InputText(props: IProps) {
  const type = props.type ?? "text";

  return (
    <InputSection type={type} width={props.width ?? '100%'} mbSection={props.mbSection}>
      {props.label && <label>{props.label}</label>}
      <input
        type={type}
        minLength={props.minLength ?? 0}
        autoFocus={props.autofocus ?? false}
        maxLength={props.maxlength ?? 255}
        placeholder={props.placeholder ?? ""}
        value={props.value ?? ""}
        required={props.required ?? false}
        onChange={props.onChange}
        style={{ marginBottom: props.mbInput }}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
      />
      {props.children}
    </InputSection >
  );
}
