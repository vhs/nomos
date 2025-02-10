import type { FC } from 'react'

import PacmanLoader from 'react-spinners/PacmanLoader'
import useSWR from 'swr'

import type { UserDoorAccessProps } from './UserDoorAccess.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import BasePage from '@/components/05-materials/BasePage/BasePage'

import useAuth from '@/lib/hooks/useAuth'

import type { SystemPreference } from '@/types/records'

const UserDoorAccess: FC<UserDoorAccessProps> = () => {
    const { currentUser } = useAuth()

    const { data: innerdoor, isLoading } = useSWR<SystemPreference>(
        currentUser?.id != null && currentUser?.hasPrivilege('vetted')
            ? `/services/v2/PreferenceService2.svc/SystemPreference?key=innerdoor`
            : null
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
        <div data-testid='UserDoorAccess'>
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

                        <h3> Temporary Booking System </h3>

                        <p>Due to COVID-19, VHS is currently operating at a lower capacity.</p>

                        <p>
                            Please follow policies outlined in the{' '}
                            <a href='https://r.vanhack.ca/covid-plan'>COVID-19 Safety Plan</a> and book using the system
                            below.
                        </p>

                        <p>For easy access, you can also bookmark this through:</p>

                        <p>
                            <a href='https://booking.vanhack.ca/index.php/appointments'>
                                https://booking.vanhack.ca/index.php/appointments
                            </a>
                        </p>

                        <iframe
                            className='w-full max-w-[768px] border-0 bg-transparent'
                            src='https://booking.vanhack.ca/index.php/appointments'
                            title='VHS Booking System'
                            height='760px'
                        ></iframe>

                        <p>
                            When you get to the space, all users (members and guests) must sign in through the
                            contactless sign in system:
                        </p>

                        <p>
                            <a href='https://r.vanhack.ca/covid-signin'>https://r.vanhack.ca/covid-signin</a>
                        </p>

                        <Conditional condition={currentUser.hasPrivilege('vetted') && innerdoor != null}>
                            <h3>Keyholders</h3>

                            <p>
                                Our RFID access system is happening, but will take a bit longer to get installed and
                                tested.
                            </p>

                            <h4>When entering</h4>

                            <p>
                                Access is via the front door on Venables street. The lock is the same as at Cook so just
                                pretend you are in the hallway. The new code is <strong>{innerdoor?.value}</strong>.
                            </p>
                            <p>
                                The &apos;is VHS open bot&apos; is now located on the semi-round table in the front of
                                the main area if you would like to open the space to non keyholders.
                            </p>
                            <br />
                            <p>
                                <b>To open</b>, punch in the current door access number:{' '}
                                <strong>{innerdoor?.value}</strong>
                            </p>
                            <p>The lock is now unlocked and you can turn the thumbturn clockwise to unlock the door.</p>
                            <br />
                            <p>
                                <b>NOTE:</b> Due to issues with the lock, when locking the door after you enter,
                                you&apos;ll need to close it, then open it and then close the lock again. This will make
                                sure that the front door lock will actually be in a locked position.
                            </p>

                            <h4>When leaving</h4>

                            <p>
                                <b>Ensure all doors are locked:</b> this means:
                                <ul>
                                    <li>the front door,</li>
                                    <li>the side door (locked with a deadbolt),</li>
                                    <li>
                                        the rear sliding doors which are locked with bars into holes in the concrete and
                                        a cross bolt between the two doors
                                    </li>
                                </ul>
                            </p>

                            <p>
                                Failure to do so may result in mass theft of stuff from the hackerspace and general
                                sadness followed by the collapse of the society.
                            </p>
                            <p>
                                <b>Turn down the heat</b>, setting it to 15 works. (panel beside the furnace room)
                            </p>
                            <p>
                                <b>Turn off the lights</b>, there are two switches beside the sliding doors in the
                                woodshop, and you have to throw two breakers on the east workshop panel, the a switch by
                                the base of the side door stairs, and a series of switches in the upstairs rooms.
                            </p>
                            <p>
                                <b>Lock the front door behind you.</b> To lock, press the centre button labeled
                                &apos;Schlage&apos; to engage the knob that turns the deadbolt or use your code and you
                                are good to go. Then give the door a try to make sure its locked.
                            </p>

                            <h4>Exit</h4>

                            <p>
                                To lock the inner door after you have left, press the Schlage button on the top, then
                                rotate the thumbturn (counter-clockwise) away from the hinges.
                            </p>
                            <p>Please test the door to confirmed that it is closed and locked properly.&nbsp;</p>
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

                        <p>
                            <b>Thanks!</b>
                        </p>
                        <p>
                            <i>The Membership Coordinator(s)</i>
                        </p>
                    </Col>
                </Row>
            </BasePage>
        </div>
    )
}

export default UserDoorAccess
