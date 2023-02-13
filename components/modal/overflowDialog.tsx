import { Overflow } from "@/styles/global";

interface IProps {
    children: any;
    overflowClick?: () => void;
}

export default function OverflowDialog(props: IProps) {
    const handleClick = (e: any) => {
        if(e.target !== e.currentTarget) return;
        props.overflowClick && props.overflowClick();
    }
    
    return (
        <Overflow onClick={handleClick}>
            {props.children}
        </Overflow>
    );
}
