import { type FC, useEffect, useState } from 'react'

import { CheckIcon } from '@heroicons/react/16/solid'
import useSWR from 'swr'

import type { PrivilegesSelectorCardProps } from './PrivilegesSelectorCard.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card'

import { compareStringArray } from '@/lib/util'

import type { PrivilegeCodes } from '@/types/custom'
import type { Privileges } from '@/types/records'

const PrivilegesSelectorCard: FC<PrivilegesSelectorCardProps> = ({
    className,
    availablePrivileges,
    onUpdate,
    value
}) => {
    const { data: privileges } = useSWR<Privileges>(
        availablePrivileges != null ? null : '/services/v2/PrivilegeService2.svc/GetAllPrivileges'
    )

    const [selectedPrivileges, setSelectedPrivileges] = useState<PrivilegeCodes>(value?.privileges ?? [])

    const togglePrivilege = (privilege: string): void => {
        const update = !selectedPrivileges.includes(privilege)
            ? [...selectedPrivileges, privilege]
            : selectedPrivileges.filter((e) => e === privilege)

        if (onUpdate != null)
            onUpdate({ action: selectedPrivileges.includes(privilege) ? 'remove' : 'add', value: privilege })
        else setSelectedPrivileges(update)
    }

    useEffect(() => {
        if (value?.privileges != null && !compareStringArray(value?.privileges, selectedPrivileges))
            setSelectedPrivileges(value?.privileges)
    }, [selectedPrivileges, value, value?.privileges])

    return (
        <div className={className} data-testid='PrivilegesSelectorCard'>
            <Card>
                <Card.Header>Permissions</Card.Header>

                <Card.Body>
                    <Row className='list-group'>
                        <Col className='w-full'>
                            {(availablePrivileges ?? privileges ?? []).map((privilege) => (
                                <Button
                                    key={privilege.code}
                                    variant='light'
                                    className='list-group-item text-left font-normal'
                                    onClick={() => {
                                        togglePrivilege(privilege.code)
                                    }}
                                >
                                    {privilege.name}
                                    <Conditional condition={selectedPrivileges.includes(privilege.code)}>
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
