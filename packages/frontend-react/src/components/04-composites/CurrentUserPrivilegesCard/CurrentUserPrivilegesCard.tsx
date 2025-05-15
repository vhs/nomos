import { useEffect, useMemo, useState, type FC } from 'react'

import type { CurrentUserPrivilegesCardProps } from './CurrentUserPrivilegesCard.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/03-particles/Card/Card'

import type UserObject from '@/lib/db/models/User'

import CurrentUserPrivilegesList from './CurrentUserPrivilegesList/CurrentUserPrivilegesList'

const CurrentUserPrivilegesCard: FC<CurrentUserPrivilegesCardProps> = ({ className, currentUser }) => {
    const [userObj, setUserObj] = useState<UserObject>(currentUser)

    useEffect(() => {
        if (currentUser != null) setUserObj(currentUser)
    }, [currentUser])

    const userPrivileges = useMemo(() => userObj.privileges, [userObj.privileges])
    const membershipPrivileges = useMemo(() => userObj.membership?.privileges, [userObj.membership?.privileges])

    return (
        <div data-testid='CurrentUserPrivilegesCard'>
            <Card>
                <Card.Header>Privileges</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <strong>Account Privileges:</strong>
                        </Col>
                    </Row>
                    <CurrentUserPrivilegesList className={className} privileges={userPrivileges} />
                    <Row>
                        <Col>
                            <strong>Membership Privileges:</strong>
                        </Col>
                    </Row>
                    <CurrentUserPrivilegesList className={className} privileges={membershipPrivileges} />
                </Card.Body>
            </Card>
        </div>
    )
}

export default CurrentUserPrivilegesCard
