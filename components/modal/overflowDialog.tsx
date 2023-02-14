import { Overflow } from "@/styles/global";
import { useEffect, useState } from "react";

interface IProps {
    children: any;
    overflowClick?: () => void;
}

export default function OverflowDialog(props: IProps) {
    const [oldScroll, setOldScroll] = useState("");

    useEffect(() => {
        setOldScroll(document.body.style.overflow);
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = oldScroll;
        }
    }, [])

    const handleClick = (e: any) => {
        if (e.target !== e.currentTarget) return;
        props.overflowClick && props.overflowClick();
    }

    return (
        <Overflow onClick={handleClick}>
            {props.children}
        </Overflow>
    );
}
