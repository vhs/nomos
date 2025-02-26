import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import useSWR from 'swr'

import type { AdminDashboardProps } from './AdminDashboard.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import AdminStatusWidget from '@/components/03-particles/AdminStatusWidget/AdminStatusWidget'
import BasePage from '@/components/05-materials/BasePage/BasePage'

import type { Payments, Users } from '@/types/records'

const AdminDashboard: FC<AdminDashboardProps> = () => {
    const { data: pendingAccounts } = useSWR<Users>('/services/v2/MetricService2.svc/GetPendingAccounts')
    const { data: paymentExceptions } = useSWR<Payments>('/services/v2/MetricService2.svc/GetExceptionPayments')

    return (
        <div data-testid='AdminDashboard'>
            <BasePage title={`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}>
                <Row className='spacious'>
                    <Col className='basis-full md:basis-1/2 xl:basis-1/4'>
                        <AdminStatusWidget
                            variant='green'
                            icon='users'
                            count={pendingAccounts?.length ?? 0}
                            description='Pending Accounts'
                            details={pendingAccounts?.map((account) => (
                                <Row key={account.username}>
                                    <Col>
                                        <span className='text-black'>{account.created.toLocaleString()}</span>{' '}
                                        <Link to={`/admin/users/$userId`} params={{ userId: String(account.id) }}>
                                            {account.email}
                                        </Link>
                                    </Col>
                                </Row>
                            ))}
                        />
                    </Col>

                    <Col className='basis-full md:basis-1/2 xl:basis-1/4'>
                        <AdminStatusWidget
                            variant='red'
                            icon='money-bills'
                            count={paymentExceptions?.length ?? 0}
                            description='Payment Exceptions'
                            details={paymentExceptions?.map((payment) => (
                                <Row key={payment.payer_email}>
                                    <Col>
                                        <span className='text-black'>{payment.date.toLocaleString()}</span>{' '}
                                        <Link to={`/admin/users/$userId`} params={{ userId: String(payment.id) }}>
                                            {payment.payer_email} (${payment.rate_amount})
                                        </Link>
                                    </Col>
                                </Row>
                            ))}
                        />
                    </Col>
                </Row>
            </BasePage>
        </div>
    )
}

export default AdminDashboard
