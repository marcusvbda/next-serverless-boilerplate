import styled from "styled-components";
import { InputRow } from "@/styles/global";

interface IProps {
  label: string;
}

// export const TopBar = styled.section`
//   padding: 7px 0;
// `;

export default function InputText(props: IProps) {
  return (
    <InputRow>
      <label>{props.label}</label>
      <input type="text" />
    </InputRow>
  );
}
