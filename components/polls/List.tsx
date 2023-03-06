import { Col, Row } from "@/styles/flex";
import { Button, Card, ShowOnlySmall } from "@/styles/global";
import InputSelect from "@/components/form/InputSelect";
import InputText from "@/components/form/InputText";
import ListItem from "./ListItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import Http from "@/libs/http";
import Paginator from "@/components/form/Paginator";

interface IProps {
    listRef: any;
}

export default function List(props: IProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [intervalId, setIntervalId] = useState<any>();
    const [list, setList] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('ALL');
    const [orderBy, setOrderBy] = useState('desc');
    const [lastPage, setLastPage] = useState(0);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const NoRecordsFound = (props: any) => {
        return (
            <Row alignX={'center'} alignY={'center'} padding={'80px 0'}>
                <span>{props.isLoading ? 'Loading ...' : 'No records found ...'}</span>
            </Row>
        )
    }

    const refreshList = (pageNumber: number = 1) => {
        setIsLoading(true);
        setPage(pageNumber);
        setList([]);
        Http("get", "/api/poll/authenticated/get", { page, per_page: perPage, orderBy, status, search }).then((resp: any) => {
            setList(resp.data);
            setLastPage(resp.lastPage);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (isFirstLoad) return setIsFirstLoad(false);

        clearTimeout(intervalId)

        const newInterval = setTimeout(() => {
            refreshList()
        }, 800)

        setIntervalId(newInterval)

        return () => clearTimeout(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        if (isFirstLoad) return setIsFirstLoad(false);
        refreshList(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        refreshList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage, orderBy, status]);

    useEffect(() => {
        props.listRef && (props.listRef.current = { refresh: refreshList });
    });

    return (
        <>
            <ShowOnlySmall>
                <Link href="#create-form">
                    <Button theme={'primary'}>
                        New survey
                    </Button>
                </Link>
            </ShowOnlySmall>
            <Card>
                <Row>
                    <Col size={4} sizeSm={12}>
                        <InputSelect
                            label={'Order by'}
                            value={orderBy}
                            onChange={(e: any) => setOrderBy(e.target.value)}
                            options={[
                                { value: 'desc', label: 'Most recent' },
                                { value: 'asc', label: 'Oldest first' },
                            ]}
                        />
                    </Col>
                    <Col size={4} sizeSm={12}>
                        <InputSelect
                            label={'Status'}
                            value={status}
                            onChange={(e: any) => setStatus(e.target.value)}
                            options={[
                                { value: 'ALL', label: 'All statuses' },
                                { value: 'DO', label: 'Done' },
                                { value: 'IP', label: 'In progress' },
                                { value: 'WA', label: 'waiting' },
                            ]}
                        />
                    </Col>
                    <Col size={4} sizeSm={12}>
                        <InputText
                            label={'Title or description'}
                            placeholder={'Search ...'}
                            value={search}
                            onChange={(e: any) => setSearch(e.target.value)}
                        />
                    </Col>
                </Row>
                {!list.length || isLoading ? <NoRecordsFound isLoading={isLoading} /> : list.map((item: any) => (
                    <ListItem key={item._id} {...item} />
                ))}
                <Row mt={50} style={{ alignItems: "flex-end" }}>
                    <Col size={3} sizeSm={12}>
                        <InputSelect
                            label={'Items Per Page'}
                            value={String(perPage)}
                            onChange={(e: any) => setPerPage(e.target.value)}
                            mb="0"
                            options={[
                                { value: "5", label: '5 Polls' },
                                { value: "20", label: '20 Polls' },
                                { value: "50", label: '50 Polls' },
                                { value: "100", label: '100 Polls' },
                            ]}
                        />
                    </Col>
                    {lastPage > 1 && (
                        <Col size={9} sizeSm={12}>
                            <Paginator currentPage={page} lastPage={lastPage} onChangePage={setPage} />
                        </Col>
                    )}
                </Row>
            </Card>
        </>
    )
}