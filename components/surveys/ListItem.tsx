import { Col, Row } from "@/styles/flex";
import { Arrow, B, ItemList } from "@/styles/global";
import { color } from "@/styles/variables";

interface IProps {
    title: string;
    description?: string;
    status: string;
    qtyVotes: number;
}

export default function ListItem(props: IProps) {
    const cutedDescription = () => {
        const limiter = 200;
        if ((props.description ?? '').length > limiter) {
            return props.description?.slice(0, limiter) + '...';
        } else {
            return props.description;
        }
    }

    const qtyVotes = () => {
        const qty = props.qtyVotes ?? 0;
        return `${qty} vote${qty > 1 ? 's' : ''}`;
    }

    const status = () => {
        const options: any = {
            DO: <B color={color.dark.done}>Done</B>,
            IP: <B color={color.dark.inProgress}>In progress</B>,
            WA: <B color={color.dark.waiting}>Waiting</B>,
        }
        return options[props.status] ?? <B color={color.dark.error}>Unknown</B>;
    }

    return (
        <Row>
            <Col size={12}>
                <ItemList direction={'row'} wrap={'inherit'} alignY={'center'}>
                    <Arrow direction={'right'} />
                    <Row direction={'column'} marginX={15}>
                        <h3>{props.title}</h3>
                        {props.description && <p>{cutedDescription()}</p>}
                        <p>{status()}</p>
                        <small>{qtyVotes()}</small>
                    </Row>
                </ItemList>
            </Col >
        </Row>
    )
}
