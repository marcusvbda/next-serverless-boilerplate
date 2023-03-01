import { Button } from "@/styles/global";
import { LoadingOverflow, LoadingSpinner } from "@/styles/global";

interface IProps {
  marginBottom?: number;
  type?: string;
  disabled?: boolean;
  isLoading?: boolean;
  theme?: string;
  children: string;
  opacity?: number;
  onClick?: (evt: any) => void;
}

export default function LoadingButton(props: IProps) {
  return (
    <Button
      onClick={(evt) => props.onClick ? props.onClick(evt) : false}
      marginBottom={props.marginBottom ?? 0}
      type={(props?.type ?? "button") as any}
      disabled={(props.disabled || props.isLoading) ?? false}
      opacity={props.opacity ?? 1}
      theme={props.theme ?? "default"}
    >
      {props.isLoading ? (
        <LoadingOverflow>
          <LoadingSpinner />
        </LoadingOverflow>
      ) : (
        props.children
      )}
    </Button>
  );
}
