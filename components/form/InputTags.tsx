import styled from "styled-components";
import { Button, InputSection } from "@/styles/global";
import { Row } from "@/styles/flex";
import { useEffect, useState } from "react";
import InputText from "./InputText";
import { error } from "@/libs/message";
import { color } from "@/styles/variables";
import { size } from "@/styles/variables";

interface IProps {
  label?: string;
  type?: string;
  value: any[],
  unique?: boolean,
  width?: string;
  onChange: any;
  description?: string;
  newBtnText: string;
  inputValidator?: (value: string) => boolean;
}

const Tag = styled.div`
  border: 1px solid ${({ theme }) => color.dark.borderColor}};
  border-radius: 10px;
  padding: 3px 8px 3px 20px;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  width: 12px;
  height: 12px;
  border: unset;
  color: ${({ theme }) => color.dark.backgroundDarkest}};
  background-color: white;
  border-radius: 100%;
  margin-left: 8px;
  font-size: 8px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const ButtonResponsive = styled(Button)`
  @media ${size.small} {
    width: 100%!important;
  }
`;

export default function InputTags(props: IProps) {
  const type = props.type ?? "text";
  const [adding, setAdding] = useState(false);
  const [addingValue, setAddingValue] = useState("");
  const [values, setValues] = useState(props.value as string[]);

  const blurInput = (evt: any) => {
    evt.preventDefault && evt.preventDefault();
    evt.stopPropagation && evt.stopPropagation();

    if (!addingValue) {
      setAddingValue("");
      setAdding(false);
      return;
    }

    const validator = props.inputValidator ?? (() => true);

    if (!validator(addingValue)) return;

    if (props.unique && values.includes(addingValue)) {
      return error('This value already exists');
    }

    setAdding(false);
    setValues([...values, addingValue]);
    props.onChange && props.onChange(values);
    setAddingValue("");
  }

  useEffect(() => {
    props.onChange && props.onChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <InputSection type={type}>
      {props.label && <label>{props.label}</label>}
      {props.description && <small style={{ marginBottom: 15 }}>{props.description}</small>}
      <Row gap={'15px'} alignY={'center'}>
        {values.map((value, index) => (
          <Tag key={index}>
            {value}
            <CloseButton type="button" onClick={() => setValues(values.filter((_, i) => i !== index))}>X</CloseButton>
          </Tag>
        ))}
        {!adding && <ButtonResponsive autoFocus={true} type="button" width={props.width || '30%'} height={'40px'} onClick={() => setAdding(true)}>
          + {props.newBtnText}
        </ButtonResponsive>}
        {adding &&
          <InputText
            block={true}
            placeholder={'Type a short title'}
            value={addingValue}
            required={true}
            type={"text"}
            width={props.width || '30%'}
            autofocus={true}
            mbSection={'0'}
            mbInput={'0'}
            onBlur={blurInput}
            onKeyDown={(evt: any) => evt.key === 'Enter' && blurInput(evt)}
            onChange={(evt: any) => setAddingValue(evt.target.value)}
          />}
      </Row>
    </InputSection >
  );
}
