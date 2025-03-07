import { useEffect, useMemo, useState, type FC } from 'react'

import { clsx } from 'clsx'

import type { PrivilegesCardProps, PrivilegesListProps } from './UserProfile.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import PrivilegePill from '@/components/02-molecules/PrivilegePill/PrivilegePill'
import Card from '@/components/04-composites/Card/Card'

import type UserObject from '@/lib/db/models/User'

const PrivilegesList: FC<PrivilegesListProps> = ({ className, privileges }) => {
    if (!Array.isArray(privileges) || privileges.length === 0) return <>No privileges found</>

    return (
        <Row>
            {privileges.map((privilege) => {
                return (
                    <Col key={privilege.id} className={clsx(['basis-full', className ?? 'lg:basis-1/3'])}>
                        <PrivilegePill privilege={privilege} />
                    </Col>
                )
            })}
        </Row>
    )
}

const PrivilegesCard: FC<PrivilegesCardProps> = ({ className, currentUser }) => {
    const [userObj, setUserObj] = useState<UserObject>(currentUser)

    useEffect(() => {
        if (currentUser != null) setUserObj(currentUser)
    }, [currentUser])

    const userPrivileges = useMemo(() => userObj.privileges, [userObj.privileges])
    const membershipPrivileges = useMemo(() => userObj.membership.privileges, [userObj.membership.privileges])

    return (
        <Card>
            <Card.Header>Privileges</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <strong>Account Privileges:</strong>
                    </Col>
                </Row>
                <PrivilegesList className={className} privileges={userPrivileges} />
                <Row>
                    <Col>
                        <strong>Membership Privileges:</strong>
                    </Col>
                </Row>
                <PrivilegesList className={className} privileges={membershipPrivileges} />
            </Card.Body>
        </Card>
    )
}

export default PrivilegesCard
