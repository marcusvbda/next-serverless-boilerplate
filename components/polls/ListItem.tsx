import { Col, Row } from "@/styles/flex";
import { Arrow, B, Card, CloseButton, ItemList } from "@/styles/global";
import { color } from "@/styles/variables";
import { useState } from "react";
import styled from "styled-components";
import OverflowDialog from "@/components/modal/overflowDialog";
import { FaPause, FaPlay, FaStop, FaPencilAlt, FaTimes } from "react-icons/fa";
import LineLabelValue from "../form/LineLabelValue";
import { confirm } from "@/libs/message";

const makeInviteRoute = (pollId: string, voterId: string) => {
    const host = window.location.origin;
    return `${host}/poll/${pollId}/vote/${voterId}`;
}

interface IProps {
    _id: string;
    title: string;
    description?: string;
    status: string;
    qtyVotes: number;
    voters?: { [key: string]: string };
    onClickClose?: () => void;
    onDeleted?: () => void;
    refreshList?: (pageNumber: number, action: any) => void;
}

const EditDialogContent = (props: IProps) => {
    const [action, setAction] = useState('stop');

    interface IGroupedButton {
        theme: String;
    }

    const GroupedButton = styled.button<IGroupedButton>`
        background-color: ${(props: IGroupedButton) => color.dark[props.theme as any]};
        flex: 1;
        padding: 10px;
        border: unset;
        
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &:hover {
            filter: brightness(150%);
            transition: 0.2s ease-in-out;
        }
    `;

    const GroupButton = styled(Col)`
        justify-content: center;
        flex-direction: row;
        margin: 10px 0;
    `

    const handleDelete = () => {
        confirm("Confirmation", "Do you want to delete this survey ?", (clicked: boolean) => {
            if (clicked) {
                props.onDeleted && props.onDeleted();
            }
        })
    }

    return (
        <Col size={8} sizeSm={12}>
            <Card>
                <CloseButton onClick={props.onClickClose}>X</CloseButton>
                <Row alignX="center" alignY="center" mt={30} mb={30}>
                    <Col size={10} sizeSm={12}>
                        <ListItemContent {...props} />
                    </Col>
                    <GroupButton size={2} sizeSm={12}>
                        <GroupedButton theme="primary" disabled={action !== 'stop'}>
                            <FaPencilAlt size={15} />
                        </GroupedButton>
                        <GroupedButton theme="error" disabled={action !== 'stop'} onClick={handleDelete}>
                            <FaTimes size={15} />
                        </GroupedButton>
                    </GroupButton>
                </Row>
                <Row mb={50}>
                    <Col size={12}>
                        <B mb={10}>Guest voters</B>
                        {props.voters && (Object.keys(props.voters)).map((key) => (
                            <LineLabelValue key={key} label={key} value={makeInviteRoute(props._id, props.voters && props.voters[key as any] || '')} />
                        ))}
                    </Col>
                </Row>
                <Row alignX="center" marginY={50}>
                    <GroupButton size={9}>
                        <GroupedButton theme={action === 'play' ? 'primary' : 'backgroundDarkest'}
                            onClick={() => setAction("play")}
                        >
                            <FaPlay size={30} />
                        </GroupedButton>
                        <GroupedButton theme={action === 'pause' ? 'primary' : 'backgroundDarkest'}
                            onClick={() => setAction("pause")}
                        >
                            <FaPause size={30} />
                        </GroupedButton>
                        <GroupedButton theme={action === 'stop' ? 'primary' : 'backgroundDarkest'}
                            onClick={() => setAction("stop")}
                        >
                            <FaStop size={30} />
                        </GroupedButton>
                    </GroupButton>
                </Row>
            </Card>
        </Col >
    )
}

export const ListItemContent = (props: IProps) => {
    const P = styled.p`
        font-size: 12px;
        margin-bottom: 6px!important;
    `;

    const H4 = styled.h4`
        font-size: 18px;
        margin-bottom: 6px!important;
    `;

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
        <>
            <H4>{props.title}</H4>
            {props.description && <P>{cutedDescription()}</P>}
            <P>{status()}</P>
            <small>{qtyVotes()}</small>
        </>
    )
}

export default function ListItem(props: IProps) {
    const [showingDialog, setShowingDialog] = useState(false);


    const toggleDialogVisibility = () => setShowingDialog(!showingDialog)

    const onDeleteditem = () => {
        toggleDialogVisibility();
        props.refreshList && props.refreshList(1, 'delete,' + props._id);
    }

    return (
        <Row>
            <Col size={12}>
                {showingDialog && <OverflowDialog>
                    <EditDialogContent onClickClose={toggleDialogVisibility} {...props} onDeleted={onDeleteditem} />
                </OverflowDialog>}
                <ItemList direction={'row'} wrap={'inherit'} alignY={'center'} onClick={toggleDialogVisibility}>
                    <Arrow direction={'right'} />
                    <Row direction={'column'} marginX={15}>
                        <ListItemContent {...props} />
                    </Row>
                </ItemList>
            </Col >
        </Row>
    )
}
