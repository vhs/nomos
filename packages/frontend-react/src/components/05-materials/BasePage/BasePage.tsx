import type { FC } from 'react'

import type { BasePageProps } from './BasePage.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card'

const BasePage: FC<BasePageProps> = ({ title, actions, children }) => (
    <div className='w-full' id='BasePage' data-testid='BasePage'>
        <Row>
            <Col className='basis-full'>
                <Card>
                    <Card.Header>
                        <h1 id='BasePageTitle'>{title}</h1>
                    </Card.Header>
                </Card>

                {actions != null ? (
                    <Card>
                        <Card.Body>{actions}</Card.Body>
                    </Card>
                ) : null}

                <Card>
                    <Card.Body>{children}</Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
)

export default BasePage
