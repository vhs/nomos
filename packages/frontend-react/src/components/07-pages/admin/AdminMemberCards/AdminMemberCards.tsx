import type { FC } from 'react'

import type { AdminMemberCardsProps } from './AdminMemberCards.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminMemberCards: FC<AdminMemberCardsProps> = () => (
    <BasePage data-testid='AdminMemberCards' title='Member Card Management'>
        <Row>
            <Col className='basis-full lg:basis-1/2'>
                <Card>
                    <Card.Header>Register Card as Genuine Card</Card.Header>
                    <Card.Body></Card.Body>
                    <Card.Footer>
                        <Button>Register Card</Button>
                    </Card.Footer>
                </Card>
            </Col>

            <Col className='basis-full lg:basis-1/2'>
                <Card>
                    <Card.Header>Issue Card</Card.Header>
                    <Card.Body></Card.Body>
                    <Card.Footer>
                        <Button>Issue Card</Button>
                    </Card.Footer>
                </Card>
            </Col>

            <Col className='basis-full lg:basis-1/2'>
                <Card>
                    <Card.Header>List of Genuine Cards</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>

            <Col className='basis-full lg:basis-1/2'>
                <Card>
                    <Card.Header>List of Card Payments</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
        </Row>
    </BasePage>
)

export default AdminMemberCards
