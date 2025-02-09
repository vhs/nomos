import type { FC } from 'react'

import { UsersIcon, ArrowRightCircleIcon, BanknotesIcon } from '@heroicons/react/16/solid'
import useSWR from 'swr'

import type { AdminDashboardProps } from './AdminDashboard.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card'

import type { Users } from '@/types/records'

const AdminDashboard: FC<AdminDashboardProps> = () => {
    const { data: pendingAccounts } = useSWR<Users>('/services/v2/MetricService2.svc/GetPendingAccounts')
    const { data: paymentExceptions } = useSWR<Users>('/services/v2/MetricService2.svc/GetExceptionPayments')

    return (
        <div data-testid='AdminDashboard'>
            <Row className='spacious'>
                <Col>
                    <div className='text-4xl'>
                        {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                    </div>
                </Col>
            </Row>

            <hr className='my-3' />

            <Row className='spacious flex-wrap'>
                <Col className='basis-full md:basis-1/2 lg:basis-1/4'>
                    <Card className='m-1 rounded-xl border'>
                        <Card.Body className='decorate-green rounded-t-md'>
                            <Row>
                                <Col className='basis-1/2'>
                                    <UsersIcon className='max-h-20 max-w-20' />
                                </Col>
                                <Col className='basis-1/2'>
                                    <div className='grid h-full grid-flow-row justify-evenly'>
                                        <div className='block text-right text-5xl'>{pendingAccounts?.length}</div>
                                        <div className='text-right font-bold'>Pending Accounts</div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className='green-card-footer rounded-b-md text-green-card'>
                            <Row>
                                <Col className='basis-11/12 font-bold'>View Details</Col>
                                <Col className='basis-1/12'>
                                    <ArrowRightCircleIcon className='float-right my-auto mt-1.5 h-4 w-4' />
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col className='basis-full md:basis-1/2 lg:basis-1/4'>
                    <Card className='m-1 rounded-lg'>
                        <Card.Body className='decorate-red rounded-t-md'>
                            <Row>
                                <Col className='basis-1/2'>
                                    <BanknotesIcon className='max-h-20 max-w-20' />
                                </Col>
                                <Col className='basis-1/2'>
                                    <div className='grid h-full grid-flow-row justify-evenly'>
                                        <div className='block text-right text-5xl'>{paymentExceptions?.length}</div>
                                        <div className='text-right font-bold'>Payment Exceptions</div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className='red-card-footer rounded-b-md text-red-card'>
                            <Row>
                                <Col className='basis-11/12 font-bold'>View Details</Col>
                                <Col className='basis-1/12'>
                                    <ArrowRightCircleIcon className='float-right my-auto mt-1.5 h-4 w-4' />
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard
