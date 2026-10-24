import { type FC, useState, useEffect } from 'react'

import { CheckIcon } from '@heroicons/react/16/solid'
import useSWR from 'swr'

import type { MembershipSelectorCardProps } from './MembershipSelectorCard.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import Button from '@/components/02-molecules/Button/Button'
import Card from '@/components/03-particles/Card/Card'

import type { Memberships } from '@/types/validators/records'

const MembershipSelectorCard: FC<MembershipSelectorCardProps> = ({ className, onUpdate, value }) => {
    const { data: memberships } = useSWR<Memberships>('/services/v2/MembershipService2.svc/GetAll')

    const [membershipType, setMembershipType] = useState(value != null ? Number(value) : -1)

    useEffect(() => {
        if (value != null && value !== membershipType) setMembershipType(Number(value))
    }, [membershipType, value])

    return (
        <div className={className} data-testid='MembershipSelectorCard'>
            <Card>
                <Card.Header>Membership</Card.Header>

                <Card.Body>
                    <Row className='list-group'>
                        <Col className='w-full'>
                            {memberships?.map((membership) => (
                                <Button
                                    key={membership.code}
                                    variant='light'
                                    className='list-group-item text-left font-normal'
                                    onClick={() => {
                                        onUpdate(membership.id)
                                    }}
                                >
                                    {membership.title}
                                    <Conditional condition={membershipType === membership.id}>
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

export default MembershipSelectorCard
