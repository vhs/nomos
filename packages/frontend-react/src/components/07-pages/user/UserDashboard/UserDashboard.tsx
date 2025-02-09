import { useMemo, type FC } from 'react'

import moment from 'moment'
import { Bubble, Doughnut, Line } from 'react-chartjs-2'

import type { UserDashboardProps } from './UserDashboard.types'

import Col from '@/components/01-atoms/Col/Col'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Row from '@/components/01-atoms/Row/Row'
import Loading from '@/components/02-molecules/Loading/Loading'
import Card from '@/components/04-composites/Card'
import BasePage from '@/components/05-materials/BasePage/BasePage'

import 'chart.js/auto'

import { useGetCreatedDates } from '@/lib/hooks/providers/MetricService2/useGetCreatedDates'
import { useGetMembers } from '@/lib/hooks/providers/MetricService2/useGetMembers'
import { useGetNewMembers } from '@/lib/hooks/providers/MetricService2/useGetNewMembers'
import { useGetRevenue } from '@/lib/hooks/providers/MetricService2/useGetRevenue'
import { useGetTotalMembers } from '@/lib/hooks/providers/MetricService2/useGetTotalMembers'

import {
    generateCreatedByDoWHour30daysBubbleChartOptions,
    generateCreatedByDoWHourBubbleChartOptions,
    generateCreatedByMonthDoWBubbleChartOptions,
    generateMembershipLineChartOptions,
    generateRevenueLineChartOptions,
    generateRevenueGoalDoughnutChartOptions
} from './UserDashboard.utils'

const UserDashboard: FC<UserDashboardProps> = () => {
    const date = useMemo(() => moment().format('MMMM YYYY'), [])
    const newMembersSince = useMemo(
        () => moment().utc().subtract(30, 'days').startOf('month').format('MMM DD, YYYY'),
        []
    )

    const { data: newMembers } = useGetNewMembers(
        moment().utc().subtract(30, 'days').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    )

    const { data: totalMembers } = useGetTotalMembers()

    const { data: revenueLastMonth } = useGetRevenue(
        moment().utc().subtract(1, 'months').startOf('month').toISOString(),
        moment().utc().subtract(1, 'months').endOf('month').toISOString(),
        'all'
    )

    const { data: revenueThisMonth } = useGetRevenue(
        moment().utc().startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString(),
        'all'
    )

    const { data: revenue } = useGetRevenue(
        moment().utc().subtract(18, 'months').startOf('month').toISOString(),
        moment().utc().subtract(1, 'months').endOf('month').toISOString(),
        'month'
    )

    const { data: members } = useGetMembers(
        moment().utc().subtract(18, 'months').startOf('month').toISOString(),
        moment().utc().subtract(1, 'months').endOf('month').toISOString(),
        'month'
    )

    const { data: createdDates } = useGetCreatedDates(
        moment().utc().subtract(18, 'months').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    )

    const { data: createdDatesLast30days } = useGetCreatedDates(
        moment().utc().subtract(3, 'months').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    )

    const revenueGoalDoughnutChartOptions = useMemo(() => {
        return revenueThisMonth != null && revenueLastMonth != null
            ? generateRevenueGoalDoughnutChartOptions(revenueThisMonth, revenueLastMonth)
            : null
    }, [revenueThisMonth, revenueLastMonth])

    const createdByDoWHourBubbleChartOptions = useMemo(() => {
        return createdDates != null ? generateCreatedByDoWHourBubbleChartOptions(createdDates) : null
    }, [createdDates])

    const createdByDoWHour30daysBubbleChartOptions = useMemo(() => {
        return createdDatesLast30days != null
            ? generateCreatedByDoWHour30daysBubbleChartOptions(createdDatesLast30days)
            : null
    }, [createdDatesLast30days])

    const createdByMonthDoWBubbleChartOptions = useMemo(() => {
        return createdDates != null ? generateCreatedByMonthDoWBubbleChartOptions(createdDates) : null
    }, [createdDates])

    const revenueLineChartOptions = useMemo(() => {
        return revenue != null ? generateRevenueLineChartOptions(revenue) : null
    }, [revenue])

    const memberLineChartOptions = useMemo(() => {
        return members != null ? generateMembershipLineChartOptions(members) : null
    }, [members])

    return (
        <div data-testid='UserDashboard'>
            <BasePage title={date}>
                <Row className='flex-wrap'>
                    <Col className='spacious basis-full lg:basis-1/2'>
                        {revenueGoalDoughnutChartOptions != null ? (
                            <div className='relative h-96 w-96'>
                                <Doughnut className='z-1 mx-auto h-96 w-96' {...revenueGoalDoughnutChartOptions} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </Col>

                    <Col className='spacious basis-full lg:basis-1/2'>
                        <Row className='flex-wrap lg:flex-nowrap'>
                            <Col className='basis-full p-1 lg:basis-1/2'>
                                <Card className='m-2 max-w-full rounded-lg'>
                                    <Card.Body className='decorate-green rounded-t-lg'>
                                        <Row>
                                            <Col className='basis-3/12'>
                                                <FontAwesomeIcon icon={'users'} size='5x' />
                                            </Col>
                                            <Col className='basis-9/12 text-right'>
                                                <div className='huge'>{newMembers?.value}</div>
                                                <div>New Members!</div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className='justify-normal'>
                                        <div className='order-first w-full'>Since {newMembersSince?.toString()}</div>
                                        <div className='order-last w-full text-right'>
                                            <FontAwesomeIcon icon={'arrow-circle-right'} />
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>

                            <Col className='basis-full p-1 lg:basis-1/2'>
                                <Card className='m-2 max-w-full rounded-lg'>
                                    <Card.Body className='decorate-green rounded-t-lg'>
                                        <Row>
                                            <Col className='xs:basis-3/12'>
                                                <FontAwesomeIcon icon={'users'} size='5x' />
                                            </Col>
                                            <Col className='text-right xs:basis-9/12'>
                                                <div className='huge'>{totalMembers?.value}</div>
                                                <div>Total Members!</div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        <span className='order-first w-full'>{date}</span>
                                        <span className='order-last w-full text-right'>
                                            <FontAwesomeIcon icon={'arrow-circle-right'} />
                                        </span>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col className='spacious basis-full p-1 lg:basis-1/2'>
                        {createdByDoWHourBubbleChartOptions != null ? (
                            <div className='chart-container'>
                                <Bubble {...createdByDoWHourBubbleChartOptions} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </Col>

                    <Col className='spacious basis-full p-1 lg:basis-1/2'>
                        {createdByDoWHour30daysBubbleChartOptions != null ? (
                            <div className='chart-container'>
                                <Bubble className='max-w-full' {...createdByDoWHour30daysBubbleChartOptions} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </Col>

                    <Col className='spacious basis-full p-1 lg:basis-1/3'>
                        {createdByMonthDoWBubbleChartOptions != null ? (
                            <div className='chart-container'>
                                <Bubble className='max-w-full' {...createdByMonthDoWBubbleChartOptions} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </Col>

                    <Col className='spacious basis-full p-1 lg:basis-1/3'>
                        {revenueLineChartOptions != null ? (
                            <div className='chart-container'>
                                <Line className='max-w-full' {...(revenueLineChartOptions ?? {})} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </Col>

                    <Col className='spacious basis-full p-1 lg:basis-1/3'>
                        {memberLineChartOptions != null ? (
                            <div className='chart-container'>
                                <Line className='max-w-full' {...(memberLineChartOptions ?? {})} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </Col>
                </Row>
            </BasePage>
        </div>
    )
}

export default UserDashboard
