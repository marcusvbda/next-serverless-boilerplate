import { Col, Row } from "@/styles/flex";
import { Arrow, B, Card, CloseButton, ItemList } from "@/styles/global";
import { color } from "@/styles/variables";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OverflowDialog from "@/components/modal/overflowDialog";
import { FaPause, FaPlay, FaStop, FaPencilAlt, FaTimes } from "react-icons/fa";
import LineLabelValue from "@/components/form/LineLabelValue";
import { confirm, error, success } from "@/libs/message";
import EditForm from "./EditForm";
import PollStatus from "./PollStatus";
import Http from "@/libs/http";

const makeInviteRoute = (pollId: string, voterId: string) => {
    const host = window.location.origin;
    return `${host}/poll/${pollId}/voting?token=${voterId}`;
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
    refreshList?: (pageNumber?: number, action?: any) => void;
    changeStatus?: (status: string) => void;
}

const EditDialogContent = (props: IProps) => {
    const [statusValue, setStatusValue] = useState(props.status);
    const [firstInit, setFirstInit] = useState(true);
    const [action, setAction] = useState(props.status ?? "WA");
    const [isEditing, setIdEditing] = useState(false);
    const [editingPoll, setEditingPoll] = useState<any>(null);

    useEffect(() => {
        if (firstInit) {
            setFirstInit(false);
            return;
        }
        setStatusValue(action);
        Http("put", `/api/poll/authenticated/${props._id}/edit`, { action: "update-status", status: action }).then((data: any) => {
            if (!data.success && data.error) {
                // error(data.error);
            } else if (data.success && data.message) {
                // success(data.message);
            }
        });
        props.changeStatus && props.changeStatus(action);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action]);


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
        confirm("Confirmation", "Do you want to delete this poll ?", (clicked: boolean) => {
            if (clicked) {
                props.onDeleted && props.onDeleted();
            }
        })
    }

    const handleEdit = () => {
        setEditingPoll(props);
        setIdEditing(true);
    }

    const closeAndRefresh = () => {
        props.refreshList && props.refreshList();
        props.onClickClose && props.onClickClose();
    }

    return (
        <Col size={8} sizeSm={12}>
            <Card overflow={true}>
                <CloseButton onClick={props.onClickClose}>X</CloseButton>
                {isEditing ? <EditForm poll={editingPoll} onSaved={closeAndRefresh} /> : <>
                    <Row alignX="center" alignY="center" mt={30} mb={30}>
                        <Col size={10} sizeSm={12}>
                            <ListItemContent {...props} status={statusValue} />
                        </Col>
                        <GroupButton size={2} sizeSm={12}>
                            <GroupedButton theme="primary" disabled={action !== 'ST'} onClick={handleEdit}>
                                <FaPencilAlt size={15} />
                            </GroupedButton>
                            <GroupedButton theme="error" disabled={action !== 'ST'} onClick={handleDelete}>
                                <FaTimes size={15} />
                            </GroupedButton>
                        </GroupButton>
                    </Row>
                    <Row mb={50}>
                        <Col size={12}>
                            <B mb={10}>Guest voters</B>
                            {props.voters && (Object.keys(props.voters)).map((key) => (
                                <LineLabelValue key={key} label={key}>
                                    <a target="_blank" href={makeInviteRoute(props._id, props.voters && props.voters[key as any] || '')} rel="noreferrer">
                                        {makeInviteRoute(props._id, props.voters && props.voters[key as any] || '')}
                                    </a>
                                </LineLabelValue>
                            ))}
                        </Col>
                    </Row>
                    <Row alignX="center" marginY={50}>
                        <GroupButton size={9}>
                            <GroupedButton theme={action === 'IP' ? 'primary' : 'backgroundDarkest'}
                                onClick={() => setAction("IP")}
                            >
                                <FaPlay size={30} />
                            </GroupedButton>
                            <GroupedButton theme={action === 'WA' ? 'primary' : 'backgroundDarkest'}
                                onClick={() => setAction("WA")}
                            >
                                <FaPause size={30} />
                            </GroupedButton>
                            <GroupedButton theme={action === 'ST' ? 'primary' : 'backgroundDarkest'}
                                onClick={() => setAction("ST")}
                            >
                                <FaStop size={30} />
                            </GroupedButton>
                        </GroupButton>
                    </Row>
                </>}
            </Card>
        </Col>
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

    return (
        <>
            <H4>{props.title}</H4>
            {props.description && <P>{cutedDescription()}</P>}
            <P><PollStatus status={props.status} /></P>
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
                    <EditDialogContent onClickClose={toggleDialogVisibility} {...props} onDeleted={onDeleteditem} refreshList={props.refreshList} />
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
