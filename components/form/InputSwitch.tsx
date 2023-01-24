import { InputSection } from "@/styles/global";
import { Row } from "@/styles/flex";

interface IProps {
  label: string;
  onChange: any;
  value: boolean;
}

export default function InputText(props: IProps) {
  return (
    <InputSection type={"checkbox"} cursor={"pointer"}>
      <label data-checked={props.value}>
        <Row alignY={"center"}>
          <span> {props.label}</span>
          <input
            type="checkbox"
            checked={props.value}
            onChange={props.onChange}
          />
          <i />
        </Row>
      </label>
    </InputSection>
  );
}
