import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { UserProfileProps } from './UserProfile.types'
import type { z } from 'zod'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card/Card'
import CurrentUserPrivilegesCard from '@/components/04-composites/CurrentUserPrivilegesCard/CurrentUserPrivilegesCard'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import BasePage from '@/components/05-materials/BasePage/BasePage'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import useGetStanding from '@/lib/hooks/providers/UserService2/useGetStanding'
import useAuth from '@/lib/hooks/useAuth'
import UserService2 from '@/lib/providers/UserService2'
import { zPasswordInput } from '@/lib/validators/common'

import APIKeysCard from './APIKeysCard'
import LinkedAccountsCard from './LinkedAccountsCard'
import PinCard from './PinCard'
import RFIDKeysCard from './RFIDKeysCard'
import StandingCard from './StandingCard'
import { UserProfileSchema } from './UserProfile.schema'

const UserProfile: FC<UserProfileProps> = () => {
    const { currentUser } = useAuth()

    const [showChangePassword, setShowChangePassword] = useState<boolean>(false)

    const form = useForm<z.infer<typeof UserProfileSchema>>({
        resolver: zodResolver(UserProfileSchema),
        mode: 'onChange',
        defaultValues: {
            user: {
                userName: currentUser?.username,
                firstName: currentUser?.fname,
                lastName: currentUser?.lname,
                newsletter: currentUser?.newsletter,
                email: currentUser?.email,
                paypalEmail: currentUser?.payment_email,
                stripeEmail: currentUser?.stripe_email
            },
            password: {
                password1: '',
                password2: ''
            }
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const standing = useGetStanding(currentUser?.id)

    const hydrateDefaults = useCallback((): void => {
        form.reset({
            user: {
                userName: currentUser?.username,
                firstName: currentUser?.fname,
                lastName: currentUser?.lname,
                newsletter: currentUser?.newsletter,
                email: currentUser?.email,
                paypalEmail: currentUser?.payment_email,
                stripeEmail: currentUser?.stripe_email
            },
            password: {
                password1: '',
                password2: ''
            }
        })
    }, [
        currentUser?.email,
        currentUser?.fname,
        currentUser?.lname,
        currentUser?.newsletter,
        currentUser?.payment_email,
        currentUser?.stripe_email,
        currentUser?.username,
        form
    ])

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (currentUser == null) throw new Error('Unexpected null user')

        const userId = currentUser.id

        if (!isDirty) return

        if (!isValid) {
            toast.error('You have errors in your input fields')
            return
        }

        const loadingToastId = toast.loading('Updating profile')

        const { userName, firstName, lastName, email, paypalEmail, stripeEmail, newsletter } = form.getValues('user')

        if (form.formState.dirtyFields.user?.userName != null)
            await UserService2.getInstance().UpdateUsername(userId, userName)

        if (currentUser?.hasPrivilege('full-profile')) {
            if (form.formState.dirtyFields.user?.firstName != null || form.formState.dirtyFields.user?.lastName != null)
                await UserService2.getInstance().UpdateName(userId, firstName, lastName)
            if (form.formState.dirtyFields.user?.email != null)
                await UserService2.getInstance().UpdateEmail(userId, email)
            if (form.formState.dirtyFields.user?.paypalEmail != null)
                await UserService2.getInstance().UpdatePaymentEmail(userId, paypalEmail)
            if (form.formState.dirtyFields.user?.stripeEmail != null)
                await UserService2.getInstance().UpdateStripeEmail(userId, stripeEmail)
        }

        if (form.formState.dirtyFields.user?.newsletter != null)
            await UserService2.getInstance().UpdateNewsletter(userId, newsletter)

        toast.update(loadingToastId, { render: 'User updated', type: 'success', isLoading: false, autoClose: 5000 })
    }

    const updatePassword = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (currentUser == null) throw new Error('Unexpected null user')

        const userId = currentUser.id

        const { password1, password2 } = form.getValues('password')

        const passwordResult = zPasswordInput.safeParse({ password1, password2 })

        if (!passwordResult.success) {
            passwordResult.error.errors.forEach((e) => toast.error(e.message.replace(/String/, 'Password')))
            return
        }

        try {
            await toast.promise(UserService2.getInstance().UpdatePassword(userId, password1), {
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
        hydrateDefaults()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    if (currentUser == null) return <LoadingOverlay />

    return (
        <div>
            <BasePage title='User Profile'>
                <FormProvider {...form}>
                    <Row className='spacious'>
                        <Col className='basis-full xl:basis-1/2'>
                            <Card>
                                <Card.Header>Profile</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <FormCol className='basis-full md:basis-1/2' error={errors.user?.userName}>
                                            <FormControl
                                                formKey='user.userName'
                                                formType='text'
                                                className='w-full'
                                                preContent={<FontAwesomeIcon icon='at' />}
                                                placeholder='Username'
                                                aria-label='Username'
                                                aria-describedby='basic-addon1'
                                            />
                                        </FormCol>
                                        <Col className='basis-full md:basis-1/2'>
                                            <Button
                                                className='btn-warning !h-8 w-full'
                                                onClick={() => {
                                                    setShowChangePassword(true)
                                                }}
                                            >
                                                Change Password
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <FormCol error={errors.user?.firstName} className='basis-full md:basis-1/2'>
                                            <label htmlFor='firstName'>
                                                <b>First Name</b>
                                            </label>
                                            <FormControl
                                                formKey='user.firstName'
                                                error={errors.user?.firstName}
                                                formType='text'
                                                placeholder='First Name'
                                                aria-label='First Name'
                                                readOnly={!currentUser.hasPrivilege('full-profile')}
                                                disabled={!currentUser.hasPrivilege('full-profile')}
                                            />
                                        </FormCol>
                                        <FormCol error={errors.user?.lastName} className='basis-full md:basis-1/2'>
                                            <label htmlFor='lastName'>
                                                <b>Last Name</b>
                                            </label>
                                            <FormControl
                                                formKey='user.lastName'
                                                error={errors.user?.lastName}
                                                formType='text'
                                                placeholder='Last Name'
                                                aria-label='Last Name'
                                                readOnly={!currentUser.hasPrivilege('full-profile')}
                                                disabled={!currentUser.hasPrivilege('full-profile')}
                                            />
                                        </FormCol>
                                    </Row>

                                    <Row>
                                        <FormCol className='basis-full' error={errors.user?.email}>
                                            <label htmlFor='userEmail'>
                                                <b>Email</b>
                                                <div className='checkbox pull-right m-0'>
                                                    <label>
                                                        <input type='checkbox' {...form.register('user.newsletter')} />{' '}
                                                        Newsletter
                                                    </label>
                                                </div>
                                            </label>
                                            <FormControl
                                                formKey='user.email'
                                                error={errors.user?.email}
                                                formType='email'
                                                placeholder='Email'
                                                aria-label='Email'
                                                readOnly={!currentUser.hasPrivilege('full-profile')}
                                                disabled={!currentUser.hasPrivilege('full-profile')}
                                            />
                                        </FormCol>
                                    </Row>

                                    <Row>
                                        <FormCol className='basis-full' error={errors.user?.paypalEmail}>
                                            <label htmlFor='paypalEmail'>
                                                <b>PayPal Email</b>
                                            </label>
                                            <div className='checkbox pull-right m-0'>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        {...form.register('user.cashMember')}
                                                        readOnly={!currentUser.hasPrivilege('full-profile')}
                                                        disabled={!currentUser.hasPrivilege('full-profile')}
                                                    />{' '}
                                                    Cash Member
                                                </label>
                                            </div>
                                            <FormControl
                                                formKey='user.paypalEmail'
                                                error={errors.user?.paypalEmail}
                                                formType='email'
                                                placeholder='PayPal Email'
                                                aria-label='PayPal Email'
                                                readOnly={!currentUser.hasPrivilege('full-profile')}
                                                disabled={!currentUser.hasPrivilege('full-profile')}
                                            />
                                        </FormCol>
                                    </Row>

                                    <Row>
                                        <FormCol className='basis-full lg:basis-1/2' error={errors.user?.stripeEmail}>
                                            <label htmlFor='user.stripeEmail'>
                                                <b>Stripe Email</b>
                                                <FormControl
                                                    formKey='user.stripeEmail'
                                                    error={errors.user?.stripeEmail}
                                                    formType='email'
                                                    placeholder='Stripe Email'
                                                    aria-label='Stripe Email'
                                                    readOnly={!currentUser.hasPrivilege('full-profile')}
                                                    disabled={!currentUser.hasPrivilege('full-profile')}
                                                />
                                            </label>
                                        </FormCol>
                                    </Row>

                                    <Row>
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

                                    <Row>
                                        <Col>
                                            <Button
                                                disabled={!isDirty}
                                                onClick={() => {
                                                    hydrateDefaults()
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
                                                disabled={!isDirty}
                                                onClick={(event) => {
                                                    void submitHandler(event)
                                                }}
                                            >
                                                Save Profile
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Row></Row>

                                    <Row>
                                        <Conditional condition={standing ?? false}>
                                            <Col className='basis-full md:basis-1/2'>
                                                <Card>
                                                    <Card.Header>PIN</Card.Header>
                                                    <Card.Body>
                                                        <p>
                                                            When using the PIN, use the entire PIN. First 4 digits are
                                                            unique. Admins can see this!
                                                        </p>
                                                        <PinCard currentUser={currentUser} />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Conditional>
                                        <Col className='basis-full md:basis-1/2'>
                                            <StandingCard standing={standing} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className='block basis-full xl:hidden'>
                            <p>&nbsp;</p>
                        </Col>

                        <Col className='basis-full xl:basis-1/2'>
                            <Card>
                                <Card.Header>Access</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <LinkedAccountsCard currentUser={currentUser} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <RFIDKeysCard currentUser={currentUser} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <APIKeysCard currentUser={currentUser} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <CurrentUserPrivilegesCard currentUser={currentUser} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
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
                            <Row>
                                <Col>New Password:</Col>
                                <FormCol error={errors.password?.password1}>
                                    <FormControl
                                        formKey='password.password1'
                                        formType='password'
                                        placeholder='New Password'
                                    />
                                </FormCol>
                            </Row>

                            <Row>
                                <Col>Confirm Password:</Col>
                                <FormCol error={errors.password?.password2}>
                                    <FormControl
                                        formKey='password.password2'
                                        formType='password'
                                        placeholder='Confirm Password'
                                    />
                                </FormCol>
                            </Row>
                        </OverlayCard>
                    </Conditional>
                </FormProvider>
            </BasePage>
        </div>
    )
}

export default UserProfile
