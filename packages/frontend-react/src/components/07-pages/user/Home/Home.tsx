import type { FC } from 'react'

import PacmanLoader from 'react-spinners/PacmanLoader'

import type { HomeProps } from './Home.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import BasePage from '@/components/04-composites/BasePage/BasePage'
import Card from '@/components/03-particles/Card/Card'

import useGetStanding from '@/lib/hooks/providers/UserService2/useGetStanding'
import StandingCard from '@/components/07-pages/user/Profile/StandingCard'

import useGetSystemPreference from '@/lib/hooks/providers/PreferenceService2/useGetSystemPreference'
import useAuth from '@/lib/hooks/useAuth'
import { Link } from '@tanstack/react-router'

const Home: FC<HomeProps> = () => {
    const { currentUser } = useAuth()

    const standing = useGetStanding(currentUser?.id)

    const { data: innerdoor, isLoading } = useGetSystemPreference(
        currentUser?.id != null && currentUser?.hasPrivilege('vetted') ? `innerdoor` : undefined
    )

    if (currentUser == null || isLoading)
        return (
            <Row className='spacious vertical-align icon-align-center text-center'>
                <Col className='basis-full'>
                    <div className='mx-auto'>
                        <PacmanLoader />
                    </div>
                </Col>
            </Row>
        )

    return (
        <div data-testid='UserHome'>
            <BasePage title='Hello, beautiful human!'>
                <Card>
                    <Card.Header>Door code</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Conditional
                                    condition={
                                        currentUser.valid && currentUser.hasPrivilege('vetted') && innerdoor != null
                                    }
                                >
                                    <p>
                                        Your front door access code is: <strong>{innerdoor?.value}</strong>.
                                    </p>
                                    <h3>LOCK UP WHEN YOU LEAVE!!!!</h3>
                                    <p>
                                        <Link to='/dooraccess'>Lockup instructions</Link>
                                    </p>
                                </Conditional>
                                <Conditional condition={!currentUser.hasPrivilege('vetted')}>
                                    <p>
                                        You are not currently a keyholder member. When you are, your door access code
                                        will show up here.
                                    </p>
                                    <p>
                                        <a href='https://talk.vanhack.ca/t/how-to-apply-for-key-holder-status/5360'>
                                            How to apply for keyholder status.
                                        </a>
                                    </p>
                                </Conditional>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Resources</Card.Header>
                    <Card.Body>
                        <ul>
                            <li>
                                <a href='http://www.isvhsopen.com'>Is VHS open?</a>
                            </li>
                            <li>
                                <a href='https://talk.vanhack.ca'>Talk Forums</a>
                            </li>
                            <li>
                                <a href='https://vanhack.slack.com'>Slack</a> (<Link to='/getinvolved'>get access</Link>
                                )
                            </li>
                            <li>
                                <a href='https://vanhack.ca/wiki'>Wiki</a>
                            </li>
                            <li>
                                <a href='https://booking.vanhack.ca/index.php/appointments'>Laser booking</a>
                            </li>
                            <li>
                                <a href='https://laser.vanhack.ca/'>Laser login</a> (only accessible from the space's
                                wifi)
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
                <StandingCard standing={standing} />
            </BasePage>
        </div>
    )
}

export default Home
