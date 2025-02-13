import { useEffect, useState, type FC } from 'react'

import { CheckIcon } from '@heroicons/react/16/solid'

import type { StatusSelectorCardProps } from './StatusSelectorCard.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'

import type { UserActiveStateCodes } from '@/types/common'

import Card from '../Card'

import { statuses } from './StatusSelectorCard.utils'

const StatusSelectorCard: FC<StatusSelectorCardProps> = ({ className, onUpdate, value }) => {
    const [membershipStatus, setMembershipStatus] = useState<UserActiveStateCodes | undefined>(value ?? 't')

    useEffect(() => {
        if (value != null && value !== membershipStatus) setMembershipStatus(value)
    }, [membershipStatus, value])

    return (
        <div className={className} data-testid='MembershipSelectorCard'>
            <Card>
                <Card.Header>Status</Card.Header>

                <Card.Body>
                    <Row className='list-group'>
                        <Col className='w-full'>
                            {Object.entries(statuses)?.map(([code, title]) => (
                                <Button
                                    key={code}
                                    variant='light'
                                    className='list-group-item text-left font-normal'
                                    onClick={() => {
                                        if (typeof onUpdate !== 'function')
                                            throw new Error('onUpdate is not a function')
                                        onUpdate(code as UserActiveStateCodes)
                                    }}
                                >
                                    {title}
                                    <Conditional condition={membershipStatus === code}>
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

export default StatusSelectorCard
