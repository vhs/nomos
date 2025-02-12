import type { FC } from 'react'

import type { PrivilegesListProps } from './PrivilegesList.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Row from '@/components/01-atoms/Row/Row'

import PrivilegeIcon from '../../../../02-molecules/PrivilegeIcon/PrivilegeIcon'

const PrivilegesList: FC<PrivilegesListProps> = ({ keyPrivileges, basePrivileges, callback }) => {
    keyPrivileges ??= []
    basePrivileges ??= []

    const keyPrivilegesCodes = keyPrivileges.map((keyPrivilege) => {
        return keyPrivilege.code
    })

    return (
        <>
            {basePrivileges.map((privilege) => (
                <Row
                    key={privilege.code}
                    onClick={() => {
                        callback(privilege.code)
                    }}
                >
                    <Col xs={3}>
                        <PrivilegeIcon icon={privilege.icon} size='1x' />
                    </Col>
                    <Col>
                        {privilege.name}
                        <Conditional condition={keyPrivilegesCodes.includes(privilege.code)}>
                            <FontAwesomeIcon icon='check-square' pullRight />
                        </Conditional>
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default PrivilegesList
