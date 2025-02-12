import type { FC } from 'react'

import type { PrivilegesCardProps, PrivilegesListProps } from './UserProfile.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import PrivilegeIcon from '@/components/02-molecules/PrivilegeIcon/PrivilegeIcon'
import Card from '@/components/04-composites/Card'

const PrivilegesList: FC<PrivilegesListProps> = ({ privileges }) => {
    if (!Array.isArray(privileges) || privileges.length === 0) return <>No privileges found</>

    return (
        <>
            {privileges.map((privilege) => {
                return (
                    <Row key={privilege.id} className='green-card privilege-card spacious shadow-xs'>
                        <Col xs={3}>
                            <PrivilegeIcon icon={privilege.icon} />
                        </Col>
                        <Col xs={9} className='basis-full px-2 text-right'>
                            <div className='my-auto'>{privilege.name}</div>
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}

const PrivilegesCard: FC<PrivilegesCardProps> = ({ currentUser }) => {
    return (
        <Card>
            <Card.Header>Privileges</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <strong>Account Privileges:</strong>
                    </Col>
                </Row>
                <PrivilegesList privileges={currentUser.privileges} />
                <Row>
                    <Col>
                        <strong>Membership Privileges:</strong>
                    </Col>
                </Row>
                <PrivilegesList privileges={currentUser.membership.privileges} />
            </Card.Body>
        </Card>
    )
}

export default PrivilegesCard
