import type { FC } from 'react'

import { clsx } from 'clsx'

import type { PrivilegesCardProps, PrivilegesListProps } from './UserProfile.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import PrivilegeIcon from '@/components/02-molecules/PrivilegeIcon/PrivilegeIcon'
import Card from '@/components/04-composites/Card'

const PrivilegesList: FC<PrivilegesListProps> = ({ className, privileges }) => {
    if (!Array.isArray(privileges) || privileges.length === 0) return <>No privileges found</>

    return (
        <Row className='flex-wrap'>
            {privileges.map((privilege) => {
                return (
                    <Col key={privilege.id} className={clsx(['basis-full', className ?? 'lg:basis-1/3'])}>
                        <Row className='green-card privilege-card spacious shadow-xs py-4'>
                            <Col xs={3}>
                                <PrivilegeIcon icon={privilege.icon} />
                            </Col>
                            <Col xs={9} className='text-nowrap px-2 text-right'>
                                <div className='my-auto font-semibold'>{privilege.name}</div>
                            </Col>
                        </Row>
                    </Col>
                )
            })}
        </Row>
    )
}

const PrivilegesCard: FC<PrivilegesCardProps> = ({ className, currentUser }) => {
    return (
        <Card>
            <Card.Header>Privileges</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <strong>Account Privileges:</strong>
                    </Col>
                </Row>
                <PrivilegesList className={className} privileges={currentUser.privileges} />
                <Row>
                    <Col>
                        <strong>Membership Privileges:</strong>
                    </Col>
                </Row>
                <PrivilegesList className={className} privileges={currentUser.membership.privileges} />
            </Card.Body>
        </Card>
    )
}

export default PrivilegesCard
