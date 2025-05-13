import type { FC } from 'react'

import type { PurchasesProps } from './Purchases.types'

import Col from '@/components/01-atoms/Col/Col'
import Container from '@/components/01-atoms/Container/Container'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'
import BasePage from '@/components/06-integrated-pages/BasePage/BasePage'

const Purchases: FC<PurchasesProps> = () => (
    <BasePage title='Purchase'>
        <Container>
            <Row>
                <Col className='basis-full md:basis-1/2 lg:basis-1/4'>
                    <Card>
                        <Card.Header>VHS Membership Card</Card.Header>
                        <Card.Body>
                            <img
                                alt='Hand holding up transparent VHS membership card with circuit printed on the card'
                                src='/images/vhs-member-card-2015-thumb.png'
                            />{' '}
                            &nbsp;
                            <img
                                alt='VHS membership card with circuit printed on the card'
                                src='/images/vhs-member-card-2015-2-thumb.png'
                            />
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col lg={6}>
                                    <strong>CAD$5.00</strong>
                                </Col>
                                <Col lg={6}>
                                    <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
                                        <input type='hidden' name='cmd' value='_s-xclick' />
                                        <input type='hidden' name='hosted_button_id' value='ECHV5FED26JKG' />
                                        <input
                                            type='image'
                                            src='https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif'
                                            name='submit'
                                            alt='PayPal - The safer, easier way to pay online!'
                                        />
                                        <img
                                            alt=''
                                            src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif'
                                            width='1'
                                            height='1'
                                        />
                                    </form>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    </BasePage>
)

export default Purchases
