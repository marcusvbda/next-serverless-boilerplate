import styled from "styled-components";
import { color, size } from "@/styles/variables";

interface IProps {
    step: number,
    items: { title: string }[];
    onClick?: (index: any) => void;
}

const StepsRow = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

const StepItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    position: relative;

    ::before {
        content: '';
        width: 100%;
        height: 6px;
        background-color: ${color.dark.backgroundDarkest};
        position: absolute;
        top: 25%;
        left: 0;
        z-index: 0;
        transition: all 0.3s ease-in-out;

        @media ${size.small} {
            top: 44%;
        }
    }

    .step-item-number {
        font-weight: 700;
        font-size: 14px;
        margin-right: 5px;
        height: 35px;
        width: 35px;
        z-index: 1;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        background-color: ${color.dark.backgroundDarkest};
    }

    &.active {
        cursor: pointer;
        .step-item-number {
            background-color: ${color.dark.primary}
        }

        ::before {
            background-color: ${color.dark.primary};
        }
    }
`;

const StepItemDescription = styled.span`
    font-weight: 500;
    font-size: 12px;
    margin-top: 8px;
    
    @media ${size.small} {
        display: none;
    }
`;


export default function WizardSteps(props: IProps) {

    const isActive = (index: number) => (props.step >= index)
    return (
        <StepsRow>
            {props.items.map((item, index) => (
                <StepItem className={isActive(index) ? 'active' : ''} key={index} onClick={() => (props.onClick && isActive(index) && props.onClick(index)) as any}>
                    <div className="step-item-number">{index + 1}</div>
                    <StepItemDescription>{item.title}</StepItemDescription>
                </StepItem>
            ))}
        </StepsRow>
    );
}
