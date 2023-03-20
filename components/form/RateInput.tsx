import { InputSection } from "@/styles/global";
import { Row } from "@/styles/flex";
import StarRating from "react-star-ratings";
import { color } from "@/styles/variables";
import styled from "styled-components";

interface IProps {
  label: string;
  onChange: any;
  value: number;
}

const ButtonClear = styled.button`
  height: 40px;
  border: none;
  margin: 0 10px;
  padding: 0 10px;
  border-radius: 5px;
  &:hover:enabled {
    filter: brightness(150%);
  }
`

export default function RateInput(props: IProps) {
  return (
    <InputSection type={"rate"} cursor={"pointer"}>
      <Row alignY={"center"} marginX={0}>
        <b> {props.label} :</b>
        <ButtonClear onClick={() => props.onChange(0)}>
          None
        </ButtonClear>
        <StarRating
          rating={props.value}
          changeRating={props.onChange}
          numberOfStars={5}
          starDimension="40px"
          starSpacing="0px"
          name='rating'
          starRatedColor={color.dark.primary}
          starHoverColor={color.dark.primary}
        />
      </Row>
    </InputSection >
  );
}
