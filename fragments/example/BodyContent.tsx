interface IProps {
  content: string;
}

export const BodyContent = (props: IProps) => {
  return (
    <span>
      {props.content}
    </span>
  )
};