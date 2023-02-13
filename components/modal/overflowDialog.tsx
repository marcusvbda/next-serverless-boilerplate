import styled from "styled-components";

interface IProps {
    children: any;
    overflowClick?: () => void;
}

const Overflow = styled.div`
    position: absolute;
    background-color: #000000c4;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade .3s;
`

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
