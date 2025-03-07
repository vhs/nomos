import type { FC } from 'react'

import type { PrivilegePillProps } from './PrivilegePill.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import PrivilegeIcon from '@/components/02-molecules/PrivilegeIcon/PrivilegeIcon'

const PrivilegePill: FC<PrivilegePillProps> = ({ privilege }) => {
    if (privilege == null) throw new Error('Missing privilege')

    return (
        <div data-testid='PrivilegePill'>
            <Row className='green-card privilege-card spacious shadow-xs py-4'>
                <Col xs={3}>
                    <PrivilegeIcon icon={privilege.icon} />
                </Col>
                <Col xs={9} className='text-nowrap px-2 text-right'>
                    <div className='my-auto font-semibold'>{privilege.name}</div>
                </Col>
            </Row>
        </div>
    )
}

export default PrivilegePill
