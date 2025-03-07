import type { FC } from 'react'

import clsx from 'clsx'

import type { CurrentUserPrivilegesListProps } from './CurrentUserPrivilegesList.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import PrivilegePill from '@/components/02-molecules/PrivilegePill/PrivilegePill'

const CurrentUserPrivilegesList: FC<CurrentUserPrivilegesListProps> = ({ className, privileges }) => {
    if (!Array.isArray(privileges) || privileges.length === 0) return <>No privileges found</>

    return (
        <div data-testid='CurrentUserPrivilegesList'>
            <Row>
                {privileges.map((privilege) => {
                    return (
                        <Col key={privilege.id} className={clsx(['basis-full', className ?? 'lg:basis-1/3'])}>
                            <PrivilegePill privilege={privilege} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default CurrentUserPrivilegesList
