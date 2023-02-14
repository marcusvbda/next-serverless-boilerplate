import { InputSection } from "@/styles/global";

interface IProps {
  label?: string;
  onChange: any;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxlength?: number;
  children?: any;
  rows?: number;
}

export default function InputTextarea(props: IProps) {
  const rowQty = props.rows ?? 6;

  return (
    <InputSection>
      {props.label && <label>{props.label}</label>}
      <textarea
        rows={rowQty}
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
