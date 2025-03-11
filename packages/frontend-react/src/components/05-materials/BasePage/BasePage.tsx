import type { FC } from 'react'

import type { BasePageProps } from './BasePage.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'

import styles from './BasePage.module.css'

const BasePage: FC<BasePageProps> = ({ title, actions, children }) => (
    <div id='BasePage' data-testid='BasePage'>
        <Row>
            <Col className='basis-full'>
                <Card>
                    <Card.Header>
                        <h1 id='BasePageTitle'>{title}</h1>
                    </Card.Header>
                </Card>

                {actions != null ? (
                    <Card>
                        <Card.Body>
                            <Row>
                                {actions.map((elem) => (
                                    <Col
                                        key={window.crypto.randomUUID()}
                                        className='basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8'
                                    >
                                        {elem}
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                ) : null}

                <Card>
                    <Card.Body className={styles.BasePageContainer}>{children}</Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
)

export default BasePage
