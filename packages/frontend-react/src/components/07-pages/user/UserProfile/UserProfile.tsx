import { useEffect, useState, type FC, type MouseEvent } from 'react'

import { clsx } from 'clsx'
import { toast } from 'react-toastify'

import type { UserProfileProps } from './UserProfile.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Container from '@/components/01-atoms/Container/Container'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card'
import InputGroup from '@/components/04-composites/InputGroup/InputGroup'
import BasePage from '@/components/05-materials/BasePage/BasePage'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import { useGetStanding } from '@/lib/hooks/providers/UserService2/useGetStanding'
import useAuth from '@/lib/hooks/useAuth'
import useFormDirty from '@/lib/hooks/useFormDirty'
import useFormErrors from '@/lib/hooks/useFormErrors'
import UserService2 from '@/lib/providers/UserService2'
import { zBoolean, zEmailAddress, zHumanName, zPasswordInput, zUsername } from '@/lib/validators/common'

import APIKeysCard from './APIKeysCard'
import LinkedAccountsCard from './LinkedAccountsCard'
import PinCard from './PinCard'
import PrivilegesCard from './PrivilegesCard'
import RFIDKeysCard from './RFIDKeysCard'
import StandingCard from './StandingCard'

const UserProfile: FC<UserProfileProps> = () => {
    const { currentUser } = useAuth()

    const [userName, setUserName] = useState(currentUser?.username ?? '')
    const [firstName, setFirstName] = useState(currentUser?.fname ?? '')
    const [lastName, setLastName] = useState(currentUser?.lname ?? '')
    const [newsletter, setNewsletter] = useState<boolean>(currentUser?.newsletter ?? false)
    const [email, setEmail] = useState(currentUser?.email ?? '')
    const [paypalEmail, setPayPalEmail] = useState(currentUser?.payment_email ?? '')
    const [stripeEmail, setStripeEmail] = useState(currentUser?.stripe_email ?? '')

    const [showChangePassword, setShowChangePassword] = useState<boolean>(false)
    const [userPassword1, setUserPassword1] = useState('')
    const [userPassword2, setUserPassword2] = useState('')

    const [inputErrors, catchErrors, clearErrors] = useFormErrors(
        'userName',
        'firstName',
        'lastName',
        'newsletter',
        'email',
        'paypalEmail',
        'stripeEmail'
    )

    const [inputDirty, handleDirty, clearDirty] = useFormDirty(
        'userName',
        'firstName',
        'lastName',
        'newsletter',
        'email',
        'paypalEmail',
        'stripeEmail'
    )

    // @ts-expect-error unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [passwordErrors, catchPasswordErrors, clearPasswordErrors] = useFormErrors('userPassword1', 'userPassword2')

    // @ts-expect-error unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [passwordDirty, handleDirtyPassword, clearDirtyPassword] = useFormDirty('userPassword1', 'userPassword2')

    const standing = useGetStanding(currentUser?.id)

    const resetFields = (): void => {
        setUserName(currentUser?.username ?? '')
        setFirstName(currentUser?.fname ?? '')
        setLastName(currentUser?.lname ?? '')
        setNewsletter(currentUser?.newsletter ?? false)
        setEmail(currentUser?.email ?? '')
        setPayPalEmail(currentUser?.payment_email ?? '')
        setStripeEmail(currentUser?.stripe_email ?? '')
        clearDirty()
        clearErrors()
    }

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (currentUser == null) throw new Error('Unexpected null user')

        const userId = currentUser.id

        if (!Object.values(inputDirty).some(Boolean)) return

        if (Object.values(inputErrors).some(Boolean)) {
            toast.error('You have errors in your input fields')
            return
        }

        const loadingToastId = toast.loading('Updating profile')

        if (inputDirty.userName) await UserService2.getInstance().UpdateUsername(userId, userName)

        if (currentUser?.hasPrivilege('full-profile')) {
            if (inputDirty.firstName || inputDirty.lastName)
                await UserService2.getInstance().UpdateName(userId, firstName, lastName)
            if (inputDirty.email) await UserService2.getInstance().UpdateEmail(userId, email)
            if (inputDirty.paypalEmail) await UserService2.getInstance().UpdatePaymentEmail(userId, paypalEmail)
            if (inputDirty.stripeEmail) await UserService2.getInstance().UpdateStripeEmail(userId, stripeEmail)
        }

        if (inputDirty.newsletter) await UserService2.getInstance().UpdateNewsletter(userId, newsletter)

        clearDirty()

        toast.update(loadingToastId, { render: 'User updated', type: 'success', isLoading: false, autoClose: 5000 })
    }

    const updatePassword = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (currentUser == null) throw new Error('Unexpected null user')

        const userId = currentUser.id

        const passwordResult = zPasswordInput.safeParse({ password1: userPassword1, password2: userPassword2 })

        if (!passwordResult.success) {
            passwordResult.error.errors.forEach((e) => toast.error(e.message.replace(/String/, 'Password')))
            return
        }

        try {
            await toast.promise(UserService2.getInstance().UpdatePassword(userId, userPassword1), {
                pending: 'Updating password',
                success: 'Password updated',
                error: 'Failed to update password'
            })
            setShowChangePassword(false)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        catchPasswordErrors(
            'userPassword1',
            zPasswordInput.safeParse({
                password1: userPassword1,
                password2: userPassword2
            }).success
        )
    }, [catchPasswordErrors, handleDirtyPassword, userPassword1, userPassword2])

    if (currentUser == null) return <LoadingOverlay />

    return (
        <div className='block w-full'>
            <BasePage title='User Profile'>
                <Row className='spacious flex-wrap xl:flex-nowrap'>
                    <Col className='basis-full xl:basis-1/2'>
                        <Card>
                            <Card.Header>Profile</Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row className='spacious'>
                                        <Col className={clsx(['basis-1/2'])}>
                                            <FormControl
                                                formType='text'
                                                className='w-full'
                                                preContent={'@'}
                                                placeholder='Username'
                                                aria-label='Username'
                                                aria-describedby='basic-addon1'
                                                value={userName}
                                                error={inputErrors.userName}
                                                onChange={(value) => {
                                                    setUserName(value)

                                                    handleDirty('userName', value !== currentUser?.username)

                                                    catchErrors('userName', zUsername.safeParse(value).success)
                                                }}
                                            />
                                        </Col>
                                        <Col className='basis-1/2'>
                                            <Button
                                                className='btn-warning w-full'
                                                onClick={() => {
                                                    setShowChangePassword(true)
                                                }}
                                            >
                                                Change Password
                                            </Button>
                                            <Conditional condition={showChangePassword}>
                                                <OverlayCard
                                                    title='Change Password'
                                                    actions={[
                                                        <Button
                                                            variant='warning'
                                                            key='Change Password'
                                                            className='float-right'
                                                            onClick={(event) => {
                                                                void updatePassword(event)
                                                            }}
                                                        >
                                                            Change Password
                                                        </Button>
                                                    ]}
                                                    onClose={() => {
                                                        setShowChangePassword(false)
                                                        return false
                                                    }}
                                                >
                                                    <Row className='spacious'>
                                                        <Col>New Password:</Col>
                                                        <Col>
                                                            <FormControl
                                                                formType='password'
                                                                placeholder='New Password'
                                                                value={userPassword1}
                                                                error={passwordErrors.userPassword1}
                                                                onChange={(value) => {
                                                                    setUserPassword1(value)
                                                                    handleDirtyPassword('userPassword1', true)
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className='spacious'>
                                                        <Col>Confirm Password:</Col>
                                                        <Col>
                                                            <FormControl
                                                                formType='password'
                                                                placeholder='Confirm Password'
                                                                value={userPassword2}
                                                                error={passwordErrors.userPassword2}
                                                                onChange={(value) => {
                                                                    setUserPassword2(value)
                                                                    handleDirtyPassword('userPassword2', true)
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </OverlayCard>
                                            </Conditional>
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col className='basis-1/2'>
                                            <label htmlFor='firstName'>
                                                <b>First Name</b>
                                            </label>
                                            <InputGroup>
                                                <FormControl
                                                    formType='text'
                                                    placeholder='First Name'
                                                    aria-label='First Name'
                                                    id='firstName'
                                                    value={firstName}
                                                    error={inputErrors.firstName}
                                                    onChange={(value) => {
                                                        setFirstName(value)

                                                        handleDirty('firstName', value !== currentUser?.fname)

                                                        catchErrors('firstName', zHumanName.safeParse(value).success)
                                                    }}
                                                    readOnly={currentUser.hasPrivilege('full-profile')}
                                                    disabled={currentUser.hasPrivilege('full-profile')}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col className='basis-1/2'>
                                            <label htmlFor='lastName'>
                                                <b>Last Name</b>
                                            </label>
                                            <InputGroup>
                                                <FormControl
                                                    formType='text'
                                                    placeholder='Last Name'
                                                    aria-label='Last Name'
                                                    id='lastName'
                                                    value={lastName}
                                                    error={inputErrors.lastName}
                                                    onChange={(value) => {
                                                        setLastName(value)

                                                        handleDirty('lastName', value !== currentUser?.lname)

                                                        catchErrors('lastName', zHumanName.safeParse(value).success)
                                                    }}
                                                    readOnly={currentUser.hasPrivilege('full-profile')}
                                                    disabled={currentUser.hasPrivilege('full-profile')}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col>
                                            <label htmlFor='userEmail'>
                                                <b>Email</b>
                                                <div className='checkbox pull-right m-0'>
                                                    <label>
                                                        <input
                                                            type='checkbox'
                                                            checked={newsletter}
                                                            onChange={(value) => {
                                                                setNewsletter(value.target.checked)

                                                                handleDirty(
                                                                    'newsletter',
                                                                    value.target.checked !== currentUser?.newsletter
                                                                )

                                                                catchErrors(
                                                                    'newsletter',
                                                                    zBoolean.safeParse(value.target.checked).success
                                                                )
                                                            }}
                                                        />{' '}
                                                        Newsletter
                                                    </label>
                                                </div>
                                            </label>
                                            <InputGroup>
                                                <FormControl
                                                    formType='text'
                                                    placeholder='Email'
                                                    aria-label='Email'
                                                    id='userEmail'
                                                    value={email}
                                                    error={inputErrors.email}
                                                    onChange={(value) => {
                                                        setEmail(value)

                                                        handleDirty('email', value !== currentUser?.email)

                                                        catchErrors('email', zEmailAddress.safeParse(value).success)
                                                    }}
                                                    readOnly={currentUser.hasPrivilege('full-profile')}
                                                    disabled={currentUser.hasPrivilege('full-profile')}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <label htmlFor='paypalEmail'>
                                                <b>PayPal Email</b>
                                            </label>
                                            <div className='checkbox pull-right m-0'>
                                                <label>
                                                    <input type='checkbox' checked={currentUser.cash} disabled /> Cash
                                                    Member
                                                </label>
                                            </div>
                                            <InputGroup>
                                                <FormControl
                                                    formType='text'
                                                    placeholder='PayPal Email'
                                                    aria-label='PayPal Email'
                                                    id='paypalEmail'
                                                    value={paypalEmail}
                                                    error={inputErrors.paypalEmail}
                                                    onChange={(value) => {
                                                        setPayPalEmail(value)

                                                        handleDirty('paypalEmail', value !== currentUser?.payment_email)

                                                        catchErrors(
                                                            'paypalEmail',
                                                            zEmailAddress.safeParse(value).success
                                                        )
                                                    }}
                                                    readOnly={currentUser.hasPrivilege('full-profile')}
                                                    disabled={currentUser.hasPrivilege('full-profile')}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <label htmlFor='stripeEmail'>
                                                <b>Stripe Email</b>
                                            </label>
                                            <InputGroup>
                                                <FormControl
                                                    formType='text'
                                                    placeholder='Stripe Email'
                                                    aria-label='Stripe Email'
                                                    id='stripeEmail'
                                                    value={stripeEmail}
                                                    error={inputErrors.stripeEmail}
                                                    onChange={(value) => {
                                                        setStripeEmail(value)

                                                        handleDirty('stripeEmail', value !== currentUser?.stripe_email)

                                                        catchErrors(
                                                            'stripeEmail',
                                                            zEmailAddress.safeParse(value).success
                                                        )
                                                    }}
                                                    readOnly={currentUser.hasPrivilege('full-profile')}
                                                    disabled={currentUser.hasPrivilege('full-profile')}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col>
                                            <p>
                                                <strong>Registration Date</strong>
                                            </p>
                                            <p>{currentUser.created.toLocaleString()}</p>
                                        </Col>
                                        <Col>
                                            <p>
                                                <strong>Last Login</strong>
                                            </p>
                                            <p>{currentUser.lastlogin.toLocaleString()}</p>
                                        </Col>
                                        <Col>
                                            <p>
                                                <strong>Membership Expiry</strong>
                                            </p>
                                            <p>{currentUser.mem_expire.toLocaleString()}</p>
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col>
                                            <Button
                                                disabled={Object.values(inputDirty).filter(Boolean).length === 0}
                                                onClick={() => {
                                                    resetFields()
                                                }}
                                            >
                                                Reset
                                            </Button>
                                        </Col>
                                        <Col></Col>
                                        <Col>
                                            <Button
                                                variant='success'
                                                className='float-end'
                                                disabled={Object.values(inputDirty).filter(Boolean).length === 0}
                                                onClick={(event) => {
                                                    void submitHandler(event)
                                                }}
                                            >
                                                Save Profile
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>

                        <Row className='spacious'>
                            <Col>
                                <StandingCard standing={standing} />
                            </Col>
                        </Row>

                        <Conditional condition={standing ?? false}>
                            <Row className='spacious'>
                                <Col className='w-full'>
                                    <Card className='w-full'>
                                        <Card.Header>PIN</Card.Header>
                                        <Card.Body>
                                            <p>
                                                When using the PIN, use the entire PIN. First 4 digits are unique.
                                                Admins can see this!
                                            </p>
                                            <PinCard currentUser={currentUser} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Conditional>
                    </Col>

                    <Col className='d-xl-none'>
                        <p>&nbsp;</p>
                    </Col>

                    <Col className='basis-full xl:basis-1/2'>
                        <Card>
                            <Card.Header>Access</Card.Header>
                            <Card.Body>
                                <Row className='spacious'>
                                    <Col className='w-full'>
                                        <LinkedAccountsCard currentUser={currentUser} />
                                    </Col>
                                </Row>

                                <Row className='spacious'>
                                    <Col className='w-full'>
                                        <RFIDKeysCard currentUser={currentUser} />
                                    </Col>
                                </Row>

                                <Row className='spacious'>
                                    <Col className='w-full'>
                                        <APIKeysCard currentUser={currentUser} />
                                    </Col>
                                </Row>

                                <Row className='spacious'>
                                    <Col className='w-full'>
                                        <PrivilegesCard currentUser={currentUser} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </BasePage>
        </div>
    )
}

export default UserProfile
