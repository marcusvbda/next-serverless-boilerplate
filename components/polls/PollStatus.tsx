import { B } from "@/styles/global";
import { color } from "@/styles/variables";

export default function PollStatus(props: { status: string }) {
  const status = () => {
    const options: any = {
      ST: <B color={color.dark.stopped}>Stopped</B>,
      IP: <B color={color.dark.inProgress}>In progress</B>,
      WA: <B color={color.dark.waiting}>Waiting</B>,
    }
    return options[props.status] ?? <B color={color.dark.error}>Unknown</B>;
  }


  return <>{status()}</>
}