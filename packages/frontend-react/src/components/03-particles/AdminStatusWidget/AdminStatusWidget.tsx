import { useState, type FC } from 'react'

import { clsx } from 'clsx'

import type { AdminStatusWidgetProps } from './AdminStatusWidget.types'

import Col from '@/components/01-atoms/Col/Col'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'

const AdminStatusWidget: FC<AdminStatusWidgetProps> = ({ variant, icon, count, description, details }) => {
    variant ??= 'red'

    const [collapsed, setCollapsed] = useState(true)

    const toggleCollapsed = (): void => {
        setCollapsed((prevState) => !prevState)
    }

    const bodyClasses = variant === 'green' ? 'decorate-green' : 'decorate-red'
    const footerClasses = variant === 'green' ? 'green-card-footer text-green-card' : 'red-card-footer text-red-card'
    const detailsClasses = variant === 'green' ? 'text-green-card' : 'text-red-card'

    return (
        <div data-testid='AdminStatusWidget'>
            <Card className='m-1 border'>
                <Card.Body className={clsx([bodyClasses])}>
                    <Row>
                        <Col className='basis-1/2'>
                            <FontAwesomeIcon icon={icon} className='max-h-20 max-w-20' size='5x' />
                        </Col>
                        <Col className='basis-1/2'>
                            <div className='grid h-full grid-flow-row justify-evenly'>
                                <div className='block text-right text-5xl'>{count}</div>
                                <div className='text-right font-bold'>{description}</div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className={clsx([footerClasses])} noGrid>
                    <Row>
                        <Col className='grid justify-end'>
                            <button
                                className='spacious pull-right font-bold'
                                onClick={() => {
                                    toggleCollapsed()
                                }}
                            >
                                View Details{' '}
                                <FontAwesomeIcon
                                    icon={collapsed ? 'circle-arrow-right' : 'circle-arrow-down'}
                                    className='inline max-h-4 max-w-4'
                                />
                            </button>
                        </Col>
                    </Row>
                    <Row
                        className={clsx([
                            'w-full rounded-b-lg bg-white font-normal',
                            detailsClasses,
                            collapsed ? 'hide' : ''
                        ])}
                    >
                        <Col>{details}</Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}
export default AdminStatusWidget
