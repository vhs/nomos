import { type FC, useEffect, useState } from 'react'

import { CheckIcon } from '@heroicons/react/16/solid'
import useSWR from 'swr'

import type { PrivilegesSelectorCardProps } from './PrivilegesSelectorCard.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import Button from '@/components/02-molecules/Button/Button'
import Card from '@/components/03-particles/Card/Card'

import { isBooleanRecord } from '@/lib/guards/common'
import { compareStringArray } from '@/lib/utils'

import type { BooleanRecord } from '@/types/validators/common'
import type { Privileges } from '@/types/validators/records'

const PrivilegesSelectorCard: FC<PrivilegesSelectorCardProps> = ({
    customPrivileges,
    className,
    error,
    onUpdate,
    title,
    selected,
    ...restProps
}) => {
    title ??= 'Permissions'

    const { data: privileges } = useSWR<Privileges>(
        customPrivileges == null ? '/services/v2/PrivilegeService2.svc/GetAllPrivileges' : null
    )

    const [selectedPrivileges, setSelectedPrivileges] = useState<BooleanRecord>(selected ?? {})

    const togglePrivilege = (privilege: string): void => {
        if (onUpdate != null) onUpdate({ privilege, state: !selectedPrivileges[privilege] })
        else
            setSelectedPrivileges((prevState) => {
                const newState = structuredClone(prevState)

                newState[privilege] = !newState[privilege]

                return newState
            })
    }

    useEffect(() => {
        if (isBooleanRecord(selected) && !compareStringArray(Object.keys(selected), Object.keys(selectedPrivileges)))
            setSelectedPrivileges(selected)
    }, [selectedPrivileges, selected])

    const privilegesList = customPrivileges ?? privileges ?? []

    return (
        <div className={className} data-testid='PrivilegesSelectorCard' {...restProps}>
            <Card error={error}>
                <Card.Header>{title}</Card.Header>

                <Card.Body>
                    <Row className='list-group'>
                        <Col className='w-full'>
                            {privilegesList.map((privilege) => (
                                <Button
                                    key={privilege.code}
                                    variant='light'
                                    className='list-group-item text-left font-normal'
                                    onClick={() => {
                                        togglePrivilege(privilege.code)
                                    }}
                                >
                                    {privilege.name}
                                    <Conditional condition={selectedPrivileges[privilege.code]}>
                                        <div className='float-right inline rounded-sm bg-green-card font-bold text-white'>
                                            <CheckIcon className='h-6 w-6' />
                                        </div>
                                    </Conditional>
                                </Button>
                            ))}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PrivilegesSelectorCard
