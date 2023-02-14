import { Col, Row } from "@/styles/flex";
import { Button, Card, ShowOnlySmall } from "@/styles/global";
import InputSelect from "@/components/form/InputSelect";
import InputText from "../form/InputText";
import { color } from "@/styles/variables";
import ListItem from "./ListItem";
import Link from "next/link";

export default function List() {

    const NoRecordsFound = () => {
        return (
            <Row alignX={'center'} alignY={'center'} padding={'80px 0'}>
                <h3>No records found</h3>
            </Row>
        )
    }

    const listExample: any[] = [
        { title: 'lorem ipsum', description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum', status: 'DO', qtyVotes: 1235 },
        { title: 'lorem ipsum', description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum', status: 'IP', qtyVotes: 4455 },
        { title: 'lorem ipsum', description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum', status: 'WA', qtyVotes: 1 },
    ]

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
                <Row borderBottom={`1px solid ${color.dark.borderColor}`}>
                    <Col size={4} sizeSm={12}>
                        <InputSelect
                            label={'Order by'}
                            value={'MR'}
                            required={true}
                            onChange={() => { }}
                            options={[
                                { value: 'MR', label: 'Most recent' },
                                { value: 'O', label: 'Older' },
                            ]}
                        />
                    </Col>
                    <Col size={4} sizeSm={12}>
                        <InputSelect
                            label={'Status'}
                            value={'ALL'}
                            required={true}
                            onChange={() => { }}
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
                            value={''}
                            required={true}
                            onChange={() => { }}
                        />
                    </Col>
                </Row>
                {!listExample.length ? <NoRecordsFound /> : listExample.map((item, index) => (
                    <ListItem key={index} {...item} />
                ))}
            </Card>
        </>
    )
}
