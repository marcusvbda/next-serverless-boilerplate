import styled from "styled-components";

interface IProps {
  label: string;
  value: string;
}

export default function LineLabelValue(props: IProps) {

  const Bold = styled.b`
    margin-right: 5px;
  `;

  return (
    <p><Bold>{props.label} :</Bold> {props.value}</p>
  );
}
