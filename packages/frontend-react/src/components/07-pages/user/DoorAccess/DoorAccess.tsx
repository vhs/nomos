import type { FC } from 'react'

import PacmanLoader from 'react-spinners/PacmanLoader'

import type { DoorAccessProps } from './DoorAccess.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import BasePage from '@/components/04-composites/BasePage/BasePage'
import StandingCard from '@/components/07-pages/user/Profile/StandingCard'

import useGetStanding from '@/lib/hooks/providers/UserService2/useGetStanding'
import useGetSystemPreference from '@/lib/hooks/providers/PreferenceService2/useGetSystemPreference'
import useAuth from '@/lib/hooks/useAuth'

const DoorAccess: FC<DoorAccessProps> = () => {
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
        <div data-testid='DoorAccess'>
            <BasePage title='Door Access!'>
                <Row>
                    <Col>
                        <Conditional condition={!currentUser.hasPrivilege('vetted')}>
                            <h3>Non-keyholders</h3>
                            <p>If you&apos;re not yet a keyholder:</p>
                            <p>
                                <ul>
                                    <li>
                                        Check <a href='http://www.isvhsopen.com'>www.isvhsopen.com</a> or{' '}
                                        <a href='https://vanhack.slack.com/messages/C0FSQCR6E'>#isvhsopen</a> on{' '}
                                        <a href='https://slack.vanhack.ca'>Slack</a> to quickly see if we&apos;re open
                                    </li>
                                    <li>
                                        You can apply for keyholder status on{' '}
                                        <a href='https://talk.vanhack.ca/c/vhs-members-only/keyholder-applications'>
                                            Talk
                                        </a>
                                    </li>
                                    <li>
                                        If you want more information on how to apply for keyholder status, you can{' '}
                                        <a href='https://talk.vanhack.ca/t/how-to-apply-for-key-holder-status/5360'>
                                            find more information here
                                        </a>
                                    </li>
                                </ul>
                            </p>
                        </Conditional>
                        <Conditional
                            condition={currentUser.valid && currentUser.hasPrivilege('vetted') && innerdoor != null}
                        >
                            <h3>Keyholders</h3>

                            <h4>When entering</h4>

                            <p>
                                Access is via the front door on Venables street. The current code is{' '}
                                <strong>{innerdoor?.value}</strong>.
                            </p>
                            <p>
                                <b>To open</b>, punch in the current door access number:{' '}
                                <strong>{innerdoor?.value}</strong>
                            </p>
                            <p>The lock is now unlocked and you can turn the thumbturn clockwise to unlock the door.</p>
                            <br />

                            <h4>Opening the space for non-keyholders:</h4>
                            <p>
                                The &apos;is VHS open bot&apos; is now located on the semi-round table in the front of
                                the main area if you would like to open the space to non keyholders.
                            </p>

                            <h4>When leaving</h4>

                            <p>
                                <ol>
                                    <li>
                                        <strong>Ensure all doors are locked</strong>, this means:
                                        <ol type='a'>
                                            <li>the front door,</li>
                                            <li>the side door (locked with a deadbolt),</li>
                                            <li>
                                                the rear sliding doors which are locked with bars into holes in the
                                                concrete and a cross bolt between the two doors
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <strong>Turn down the heat</strong>, setting it to 15 works. (panel beside the
                                        furnace room)
                                    </li>
                                    <li>
                                        <strong>Turn off the lights</strong>
                                        <ol type='a'>
                                            <li>there are two switches beside the sliding doors in the woodshop</li>
                                            <li>one switch by the base of the side door stairs</li>
                                            <li>and a series of switches in the upstairs rooms.</li>
                                        </ol>
                                    </li>
                                    <li>
                                        <strong>Lock the front door behind you!</strong>
                                        <ol type='a'>
                                            <li>
                                                To lock, press the centre button labeled &apos;Schlage&apos;, and turn
                                                the thumbturn to lock the deadbolt
                                            </li>
                                            <li>Make sure you give the door a try, to be sure its locked.</li>
                                        </ol>
                                    </li>
                                </ol>
                            </p>

                            <p>
                                Failure to do so may result in mass theft of stuff from the hackerspace and general
                                sadness followed by the collapse of the society.
                            </p>

                            <p>
                                For more info on opening and locking the space, see:
                                <ul>
                                    <li>
                                        <a href='https://talk.vanhack.ca/t/vhs-1601-venables-interim-access-details-for-keyholders/8755'>
                                            Interim Instructions on Talk
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://talk.vanhack.ca/t/important-door-security-info/8767'>
                                            Important door security info
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://vancouver.vanhack.ca/doku.php?id=schalge_lock_instructions'>
                                            the lock wiki page
                                        </a>
                                    </li>
                                </ul>
                            </p>
                        </Conditional>

                        <h3>Booking System</h3>

                        <p>
                            While initially introduce over the COVID-19 pandemic, select tools and areas use the booking
                            system.
                        </p>

                        <p>
                            <a href='https://booking.vanhack.ca/index.php/appointments'>
                                https://booking.vanhack.ca/index.php/appointments
                            </a>
                        </p>

                        <p>
                            <b>Thanks!</b>
                        </p>
                        <p>
                            <i>The Membership Coordinator(s)</i>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StandingCard standing={standing} />
                    </Col>
                </Row>
            </BasePage>
        </div>
    )
}

export default DoorAccess
