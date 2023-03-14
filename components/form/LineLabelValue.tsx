import styled from "styled-components";

interface IProps {
  label: string;
  value?: string;
  children?: any;
}

export default function LineLabelValue(props: IProps) {

  const Bold = styled.b`
    margin-right: 5px;
  `;

  const P = styled.p`
    word-wrap: break-word;
    font-size: 13px;
    margin-bottom: 10px;
  `;

  return (
    <P><Bold>{props.label} :</Bold> {props.value ? props.value : ''} {props.children ? props.children : ''}</P>
  );
}
