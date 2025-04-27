/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, type BaseSyntheticEvent, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { UsersEditPasswordSchema, UsersEditProfileSchema, UsersEditProps } from './UsersEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Container from '@/components/01-atoms/Container/Container'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormRow from '@/components/02-molecules/FormRow/FormRow'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card/Card'
import CurrentUserPrivilegesCard from '@/components/04-composites/CurrentUserPrivilegesCard/CurrentUserPrivilegesCard'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import SelectorCard from '@/components/04-composites/SelectorCard/SelectorCard'
import Tab from '@/components/04-composites/Tabs/Tab/Tab'
import Tabs from '@/components/04-composites/Tabs/Tabs'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'
import APIKeysCard from '@/components/07-pages/user/Profile/APIKeysCard'
import LinkedAccountsCard from '@/components/07-pages/user/Profile/LinkedAccountsCard'
import RFIDKeysCard from '@/components/07-pages/user/Profile/RFIDKeysCard'

import UserObject from '@/lib/db/models/User'
import { postWithParams } from '@/lib/fetcher'
import { isMemberships } from '@/lib/guards/records'
import useGetAll from '@/lib/hooks/providers/MembershipService2/useGetAll'
import useGetAllPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useGetUser from '@/lib/hooks/providers/UserService2/useGetUser'
import useAuth from '@/lib/hooks/useAuth'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import PinService2 from '@/lib/providers/PinService2'
import UserService2 from '@/lib/providers/UserService2'
import { getEnabledStateRecordKeys, mergePrivilegesArrayToBooleanRecord } from '@/lib/utils'
import { statuses } from '@/lib/utils/constants'

import { zAdminUsersEditPasswordSchema, zAdminUsersEditProfileSchema } from '../Users.schema'

import { UsersDefaultPasswordValues, UsersDefaultProfileValues } from './UsersEdit.utils'

const UsersEdit: FC<UsersEditProps> = () => {
    const { mutate } = useTablePageContext()

    const userId = useParams({
        from: '/_admin/admin/users/$userId',
        select: (params): number => Number(params.userId)
    })

    const { currentUser } = useAuth()

    const { data: allPrivileges } = useGetAllPrivileges()
    const { data: allMemberships } = useGetAll()

    const membershipTypes = useMemo(() => {
        return isMemberships(allMemberships)
            ? allMemberships.reduce<Record<number, string>>((c, { id, title }) => {
                  c[id] = title

                  return c
              }, {})
            : {}
    }, [allMemberships])

    const { data: userData, isLoading: isUserLoading, mutate: mutateUser } = useGetUser(userId)

    const userObj = useMemo(() => (userData != null ? new UserObject(userData) : null), [userData])

    const passwordForm = useForm<UsersEditPasswordSchema>({
        resolver: zodResolver(zAdminUsersEditPasswordSchema),
        mode: 'onChange',
        defaultValues: UsersDefaultPasswordValues
    })

    const passwordErrors = useMemo(() => passwordForm.formState.errors, [passwordForm.formState.errors])
    const passwordIsDirty = useMemo(() => passwordForm.formState.isDirty, [passwordForm.formState.isDirty])
    const passwordIsValid = useMemo(() => passwordForm.formState.isValid, [passwordForm.formState.isValid])

    const profileForm = useForm<UsersEditProfileSchema>({
        resolver: zodResolver(zAdminUsersEditProfileSchema),
        mode: 'onChange',
        defaultValues: UsersDefaultProfileValues
    })

    const profileErrors = useMemo(() => profileForm.formState.errors, [profileForm.formState.errors])
    const profileIsDirty = useMemo(() => profileForm.formState.isDirty, [profileForm.formState.isDirty])
    const profileIsValid = useMemo(() => profileForm.formState.isValid, [profileForm.formState.isValid])

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: isPrivilegesDirty
    } = useToggleReducer(
        mergePrivilegesArrayToBooleanRecord(Array.isArray(allPrivileges) ? allPrivileges : [], userObj?.privileges)
    )

    const pinInfo = useMemo(() => userObj?.keys.find((key) => key.type === 'pin'), [userObj?.keys])

    const keyInfo = useMemo(() => {
        return pinInfo != null
            ? {
                  ...pinInfo,
                  privileges:
                      pinInfo.privileges != null ? pinInfo.privileges.map((privilege) => privilege.code).join(' ') : ''
              }
            : pinInfo
    }, [pinInfo])

    const generatePin = async (): Promise<void> => {
        try {
            await postWithParams('/services/v2/PinService2.svc/GeneratePin', { userid: userId })

            await mutateUser()
        } catch (err) {
            console.error(err)
        }
    }

    const submitHandler = async (event?: BaseSyntheticEvent): Promise<boolean> => {
        event?.preventDefault()

        if (!profileIsDirty && !isPrivilegesDirty) return false

        if (!profileIsValid) {
            toast.error(`Please fix the errors before continuing`)
            console.error(profileErrors)
            return false
        }

        const loadingToastId = toast.loading('Updating profile')

        try {
            const {
                firstName,
                lastName,
                userName,
                userEmail,
                paypalEmail,
                stripeEmail,
                newsletter,
                cashMember,
                userPin,
                memExpire,
                memStatus,
                memType
            } = profileForm.getValues()

            if (profileForm.formState.dirtyFields.userName != null)
                await UserService2.getInstance().UpdateUsername(userId, userName)

            if (currentUser?.hasPrivilege('full-profile') === true) {
                if (
                    profileForm.formState.dirtyFields.firstName != null &&
                    profileForm.formState.dirtyFields.lastName != null
                )
                    await UserService2.getInstance().UpdateName(userId, firstName, lastName)
                if (profileForm.formState.dirtyFields.userEmail != null)
                    await UserService2.getInstance().UpdateEmail(userId, userEmail)
                if (profileForm.formState.dirtyFields.paypalEmail != null)
                    await UserService2.getInstance().UpdatePaymentEmail(userId, paypalEmail)
                if (profileForm.formState.dirtyFields.stripeEmail != null)
                    await UserService2.getInstance().UpdateStripeEmail(userId, stripeEmail)
            }

            if (profileForm.formState.dirtyFields.newsletter != null)
                await UserService2.getInstance().UpdateNewsletter(userId, newsletter)
            if (profileForm.formState.dirtyFields.cashMember != null)
                await UserService2.getInstance().UpdateCash(userId, cashMember)

            if (userPin != null && userPin !== keyInfo?.pin) await PinService2.getInstance().UpdatePin(userId, userPin)

            if (profileForm.formState.dirtyFields.memExpire != null)
                await UserService2.getInstance().UpdateExpiry(userId, memExpire.toLocaleString())

            if (profileForm.formState.dirtyFields.memStatus != null)
                await UserService2.getInstance().UpdateStatus(userId, memStatus)

            if (profileForm.formState.dirtyFields.memType != null)
                await UserService2.getInstance().UpdateMembership(userId, memType)

            if (isPrivilegesDirty) {
                await UserService2.getInstance().PutUserPrivileges(
                    userId,
                    getEnabledStateRecordKeys(privileges).join(',')
                )
                dispatchPrivileges({ action: 'update-defaults', value: privileges })
                dispatchPrivileges({ action: 'reset' })
            }

            const formData = profileForm.getValues()
            profileForm.reset(formData)

            toast.update(loadingToastId, { render: 'User updated', type: 'success', isLoading: false, autoClose: 5000 })

            await mutate()
            await mutateUser()

            return true
        } catch (err) {
            toast.update(loadingToastId, {
                render: 'An unknown error occured. Please notify your administrators!',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            })

            console.error(err)

            return false
        }
    }

    const resetDefaults = (): void => {
        passwordForm.reset()

        void passwordForm.trigger()

        profileForm.reset()

        void profileForm.trigger()

        dispatchPrivileges({
            action: 'reset'
        })
    }

    const updatePassword = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (!passwordIsDirty) return

        if (!passwordIsValid) {
            toast.error('Unknown error in password input')
            return
        }

        const { password1 } = passwordForm.getValues()

        try {
            await toast.promise(UserService2.getInstance().UpdatePassword(userId, password1), {
                pending: 'Updating password',
                success: 'Password updated',
                error: 'Failed to update password'
            })

            passwordForm.reset()
        } catch (err) {
            console.error(err)
        }
    }

    const hydrateDefaults = useCallback((): void => {
        if (userObj != null && !profileIsDirty) {
            passwordForm.reset({
                password1: '',
                password2: ''
            })
            profileForm.reset({
                firstName: userObj.fname,
                lastName: userObj.lname,
                userName: userObj.username,
                userEmail: userObj.email,
                paypalEmail: userObj.payment_email,
                stripeEmail: userObj.stripe_email,
                newsletter: userObj.newsletter,
                cashMember: userObj.cash,
                memExpire: userObj.mem_expire.toLocaleString(),
                memStatus: userObj.active,
                memType: userObj.membership_id
            })
        }

        if (keyInfo?.pin != null) {
            profileForm.setValue('userPin', keyInfo?.pin)
        }

        void passwordForm.trigger()
        void profileForm.trigger()

        if (userObj != null && allPrivileges != null && !isPrivilegesDirty) {
            dispatchPrivileges({
                action: 'update-defaults',
                value: mergePrivilegesArrayToBooleanRecord(
                    Array.isArray(allPrivileges) ? allPrivileges : [],
                    userObj?.privileges
                )
            })
            dispatchPrivileges({ action: 'reset' })
        }
    }, [userObj, allPrivileges, dispatchPrivileges])

    useEffect(() => {
        hydrateDefaults()
    }, [userObj, allPrivileges])

    const userMemStatus = profileForm.watch('memStatus')
    const userMemType = profileForm.watch('memType')

    if (isUserLoading || userObj == null) return <LoadingOverlay />

    return (
        <div data-testid='UsersEdit'>
            <FormProvider {...profileForm}>
                <OverlayCard
                    title='Edit User'
                    actions={[
                        <Button
                            key='Save Profile'
                            className='btn-success'
                            disabled={!profileIsDirty && !isPrivilegesDirty}
                            onClick={(event) => {
                                void submitHandler(event)
                            }}
                        >
                            Save Profile
                        </Button>,
                        <Button
                            key='Reset'
                            className='btn-default'
                            disabled={!profileIsDirty && !isPrivilegesDirty}
                            onClick={() => {
                                resetDefaults()
                            }}
                        >
                            Reset
                        </Button>
                    ]}
                    closeLabel='Close'
                >
                    <Tabs defaultTab='profile'>
                        <Tab tabKey='profile' title='Profile'>
                            <Card>
                                <Card.Header>Profile</Card.Header>
                                <Card.Body>
                                    <Container>
                                        <Row>
                                            <FormCol error={profileErrors.userName != null}>
                                                <label htmlFor='userName'>
                                                    <b>Username</b>
                                                </label>
                                                <FormControl
                                                    formKey='userName'
                                                    formType='text'
                                                    placeholder='Username'
                                                    aria-label='Username'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol error={profileErrors.firstName != null}>
                                                <label htmlFor='firstName'>
                                                    <b>First Name</b>
                                                </label>
                                                <FormControl
                                                    formKey='firstName'
                                                    formType='text'
                                                    placeholder='First Name'
                                                    aria-label='First Name'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol error={profileErrors.lastName != null}>
                                                <label htmlFor='lastName'>
                                                    <b>Last Name</b>
                                                    <FormControl
                                                        formKey='lastName'
                                                        formType='text'
                                                        placeholder='Last Name'
                                                        aria-label='Last Name'
                                                    />
                                                </label>
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol
                                                error={
                                                    profileErrors.userEmail != null || profileErrors.newsletter != null
                                                }
                                            >
                                                <label htmlFor='userEmail'>
                                                    <b>Email</b>
                                                </label>
                                                <span className='float-right m-0 inline'>
                                                    <label>
                                                        <input
                                                            type='checkbox'
                                                            {...profileForm.register('newsletter')}
                                                        />{' '}
                                                        Newsletter
                                                    </label>
                                                </span>
                                                <FormControl
                                                    formKey='userEmail'
                                                    formType='text'
                                                    placeholder='Email'
                                                    aria-label='Email'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol
                                                error={
                                                    profileErrors.paypalEmail != null ||
                                                    profileErrors.cashMember != null
                                                }
                                            >
                                                <label htmlFor='payPalEmail'>
                                                    <b>PayPal Email</b>
                                                </label>
                                                <span className='float-right m-0 inline'>
                                                    <label>
                                                        <input
                                                            type='checkbox'
                                                            {...profileForm.register('cashMember')}
                                                        />{' '}
                                                        Cash Member
                                                    </label>
                                                </span>
                                                <FormControl
                                                    formKey='paypalEmail'
                                                    formType='text'
                                                    placeholder='PayPal Email'
                                                    aria-label='PayPal Email'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol error={profileErrors.stripeEmail != null}>
                                                <label htmlFor='stripeEmail'>
                                                    <b>Stripe Email</b>
                                                </label>
                                                <FormControl
                                                    formKey='stripeEmail'
                                                    formType='text'
                                                    placeholder='Stripe Email'
                                                    aria-label='Stripe Email'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p>
                                                    <strong>Registration Date</strong>
                                                </p>
                                                <p>{userObj.created.toLocaleString()}</p>
                                            </Col>
                                            <Col>
                                                <p>
                                                    <strong>Last Login</strong>
                                                </p>
                                                <p>{userObj.lastlogin.toLocaleString()}</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p>
                                                    <strong>Current Expiry</strong>
                                                </p>
                                                {userObj.mem_expire.toLocaleString()}
                                            </Col>
                                            <FormCol error={profileErrors.memExpire != null}>
                                                <p>
                                                    <strong>Membership Expiry</strong>
                                                </p>
                                                <FormControl
                                                    formKey='memExpire'
                                                    formType='text'
                                                    className='text-right'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol
                                                error={profileErrors.memType != null}
                                                className={clsx(['basis-1/2 p-1'])}
                                            >
                                                <SelectorCard
                                                    id='memType'
                                                    defaultValue={userMemType}
                                                    mode='radio'
                                                    title='Membership Type'
                                                    options={membershipTypes}
                                                />
                                            </FormCol>

                                            <FormCol
                                                error={profileErrors.memStatus != null}
                                                className={clsx(['basis-1/2 p-1'])}
                                            >
                                                <SelectorCard
                                                    id='memStatus'
                                                    defaultValue={userMemStatus}
                                                    mode='radio'
                                                    title='Status'
                                                    options={statuses}
                                                />
                                            </FormCol>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Tab>

                        <Tab tabKey={'access'} title={'Access'}>
                            <Card>
                                <Card.Header>Access</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col className='w-full'>
                                            <Card>
                                                <Card.Header>User&apos;s Access Pin</Card.Header>
                                                <Card.Body
                                                    className={
                                                        profileErrors.userPin != null ? 'shadow-form-error' : undefined
                                                    }
                                                >
                                                    <Conditional condition={pinInfo == null}>
                                                        <Button
                                                            variant='warning'
                                                            onClick={() => {
                                                                void generatePin()
                                                            }}
                                                        >
                                                            Generate PIN
                                                        </Button>
                                                    </Conditional>
                                                    <Conditional condition={pinInfo != null}>
                                                        <FormControl
                                                            formKey='userPin'
                                                            formType='pin'
                                                            preContent={keyInfo?.pinid ?? ''}
                                                            placeholder='User Pin'
                                                            aria-label='User Pin'
                                                        />
                                                    </Conditional>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className='w-full'>
                                            <LinkedAccountsCard currentUser={userObj} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className='w-full'>
                                            <RFIDKeysCard currentUser={userObj} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className='w-full'>
                                            <APIKeysCard currentUser={userObj} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Tab>

                        <Tab tabKey={'privileges'} title={'Permissions'}>
                            <Row>
                                <Col className='w-full p-1 lg:basis-1/2'>
                                    <CurrentUserPrivilegesCard className='lg:basis-full' currentUser={userObj} />
                                </Col>

                                <Col>
                                    <PrivilegesSelectorCard
                                        id='userPrivileges'
                                        onUpdate={({ privilege, state }): void => {
                                            dispatchPrivileges({
                                                action: state ? 'set' : 'unset',
                                                value: privilege
                                            })
                                        }}
                                        selected={privileges}
                                    />
                                </Col>
                            </Row>
                        </Tab>

                        <Tab tabKey={'change-password'} title={'Change Password'}>
                            <Row>
                                <Col className='w-full p-1'>
                                    <Card>
                                        <Card.Header>Change Password</Card.Header>

                                        <Card.Body>
                                            <FormRow className='my-3' error={passwordErrors.password1}>
                                                <Col>New Password:</Col>
                                                <Col>
                                                    <FormControl
                                                        formKey='password1'
                                                        formType='password'
                                                        placeholder='New Password'
                                                    />
                                                </Col>
                                            </FormRow>

                                            <FormRow className='my-3' error={passwordErrors.password2}>
                                                <Col>Confirm Password:</Col>
                                                <Col>
                                                    <FormControl
                                                        formKey='password2'
                                                        formType='password'
                                                        placeholder='Confirm Password'
                                                    />
                                                </Col>
                                            </FormRow>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button
                                                variant='warning'
                                                key='Change Password'
                                                className='float-right'
                                                onClick={(event) => {
                                                    void updatePassword(event)
                                                }}
                                                disabled={!passwordIsDirty && !passwordIsValid}
                                            >
                                                Change Password
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default UsersEdit
