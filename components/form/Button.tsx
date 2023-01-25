import { Button } from "@/styles/global";
import { LoadingOverflow, LoadingSpinner } from "@/styles/global";

interface IProps {
  marginBottom?: number;
  type?: string;
  disabled?: boolean;
  isLoading?: boolean;
  theme?: string;
  children: string;
}

export default function CustomButton(props: IProps) {
  return (
    <Button
      marginBottom={props.marginBottom ?? 0}
      type={(props?.type ?? "button") as any}
      disabled={(props.disabled || props.isLoading) ?? false}
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
