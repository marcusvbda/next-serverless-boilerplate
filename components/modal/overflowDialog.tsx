import { Overflow } from "@/styles/global";
import { useEffect, useState } from "react";

interface IProps {
    children: any;
    overflowClick?: () => void;
}

export default function OverflowDialog(props: IProps) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const html = document.querySelector('html');
        if (html) {
            html.style.overflow = "hidden";
        }
        const body = document.body;
        setHeight(body.offsetHeight ?? 0);

        return () => {
            const html = document.querySelector('html');
            if (html) {
                html.style.overflow = '';
            }
        }
    }, [])

    const handleClick = (e: any) => {
        if (e.target !== e.currentTarget) return;
        props.overflowClick && props.overflowClick();
    }

    return (
        <Overflow onClick={handleClick} height={height}>
            {props.children}
        </Overflow>
    );
}
