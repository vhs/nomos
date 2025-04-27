import type { FC } from 'react'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'

import type { Key } from '@/types/validators/records'

export const KeyInfo: FC<{ keyInfo: Key }> = ({ keyInfo }) => {
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>{keyInfo.type.toUpperCase()} Key</Card.Header>
                        <Card.Body>{keyInfo.key}</Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='basis-1/2'>
                    <Card>
                        <Card.Header>Details</Card.Header>
                        <Card.Body className='text-left'>
                            <Row>
                                <Col>
                                    <strong>Created:</strong>
                                </Col>
                                <Col>{keyInfo.created.toLocaleString()}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong>Notes:</strong>
                                </Col>
                                <Col>{keyInfo.notes ?? ''}</Col>
                            </Row>
                            <br />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='basis-1/2'>
                    <Card>
                        <Card.Header>Privileges</Card.Header>
                        <Card.Body className='text-left'>
                            <ul>
                                {keyInfo.privileges?.map((p) => (
                                    <li key={p.code}>
                                        {p.name} ({p.code})
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='text-center italic'>Access log to be added</Col>
            </Row>
        </>
    )
}
