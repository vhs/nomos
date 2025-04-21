import type { FC } from 'react'

import type { AdminMemberCardsProps } from './AdminMemberCards.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import BasePage from '@/components/05-materials/BasePage/BasePage'
import IssueGenuineCard from './IssueGenuineCard/IssueGenuineCard'
import ListGenuineCardPurchases from './ListGenuineCardPurchases/ListGenuineCardPurchases'
import ListGenuineCards from './ListGenuineCards/ListGenuineCards'
import RegisterGenuineCard from './RegisterGenuineCard/RegisterGenuineCard'

const AdminMemberCards: FC<AdminMemberCardsProps> = () => (
    <BasePage data-testid='AdminMemberCards' title='Member Card Management'>
        <Row>
            <Col className='basis-full xl:basis-1/2'>
                <RegisterGenuineCard />
            </Col>

            <Col className='basis-full xl:basis-1/2'>
                <IssueGenuineCard />
            </Col>

            <Col className='basis-full xl:basis-1/2'>
                <ListGenuineCards />
            </Col>

            <Col className='basis-full xl:basis-1/2'>
                <ListGenuineCardPurchases />
            </Col>
        </Row>
    </BasePage>
)

export default AdminMemberCards
