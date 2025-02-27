/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, type BaseSyntheticEvent, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { AdminUsersEditForm } from '../AdminUsers.types'
import type { AdminUsersEditProps } from './AdminUsersEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Container from '@/components/01-atoms/Container/Container'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import SelectorCard from '@/components/04-composites/SelectorCard/SelectorCard'
import Tab from '@/components/04-composites/Tabs/Tab/Tab'
import Tabs from '@/components/04-composites/Tabs/Tabs'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'
import APIKeysCard from '@/components/07-pages/user/UserProfile/APIKeysCard'
import LinkedAccountsCard from '@/components/07-pages/user/UserProfile/LinkedAccountsCard'
import PrivilegesCard from '@/components/07-pages/user/UserProfile/PrivilegesCard'
import RFIDKeysCard from '@/components/07-pages/user/UserProfile/RFIDKeysCard'

import UserObject from '@/lib/db/User'
import { postWithParams } from '@/lib/fetcher'
import useGetAllMemberships from '@/lib/hooks/providers/MembershipService2/useGetAllMemberships'
import useGetAllPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useGetUser from '@/lib/hooks/providers/UserService2/useGetUser'
import useAuth from '@/lib/hooks/useAuth'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import PinService2 from '@/lib/providers/PinService2'
import UserService2 from '@/lib/providers/UserService2'
import { getEnabledStateRecordKeys, mergePrivilegesArrayToBooleanRecord } from '@/lib/utils'
import { statuses } from '@/lib/utils/constants'
import { zPasswordInput } from '@/lib/validators/common'
import { isMemberships } from '@/lib/validators/guards'

import { AdminUsersEditSchema } from '../AdminUsers.schema'

import { AdminUsersDefaultValues } from './AdminUsersEdit.utils'

const AdminUsersEdit: FC<AdminUsersEditProps> = () => {
    const { mutate } = useTablePageContext()

    const userId = useParams({
        from: '/_admin/admin/users/$userId',
        select: (params): number => Number(params.userId)
    })

    const { currentUser } = useAuth()

    const { data: allPrivileges } = useGetAllPrivileges()
    const { data: allMemberships } = useGetAllMemberships()

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

    const form = useForm<AdminUsersEditForm>({
        resolver: zodResolver(AdminUsersEditSchema),
        mode: 'onChange',
        defaultValues: AdminUsersDefaultValues
    })

    const errors = useMemo(() => form.formState.errors, [form.formState])

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

        if (!form.formState.isDirty && !isPrivilegesDirty) return false

        if (Object.keys(errors).length > 0) {
            toast.error(`Please fix the errors before continuing`)
            return false
        }

        const loadingToastId = toast.loading('Updating profile')

        try {
            const {
                user: {
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
                }
            } = form.getValues()

            if (form.formState.dirtyFields.user?.userName != null)
                await UserService2.getInstance().UpdateUsername(userId, userName)

            if (currentUser?.hasPrivilege('full-profile') === true) {
                if (
                    form.formState.dirtyFields.user?.firstName != null &&
                    form.formState.dirtyFields.user?.lastName != null
                )
                    await UserService2.getInstance().UpdateName(userId, firstName, lastName)
                if (form.formState.dirtyFields.user?.userEmail != null)
                    await UserService2.getInstance().UpdateEmail(userId, userEmail)
                if (form.formState.dirtyFields.user?.paypalEmail != null)
                    await UserService2.getInstance().UpdatePaymentEmail(userId, paypalEmail)
                if (form.formState.dirtyFields.user?.stripeEmail != null)
                    await UserService2.getInstance().UpdateStripeEmail(userId, stripeEmail)
            }

            if (form.formState.dirtyFields.user?.newsletter != null)
                await UserService2.getInstance().UpdateNewsletter(userId, newsletter)
            if (form.formState.dirtyFields.user?.cashMember != null)
                await UserService2.getInstance().UpdateCash(userId, cashMember)

            if (userPin !== keyInfo?.pin) await PinService2.getInstance().UpdatePin(userId, userPin)

            if (form.formState.dirtyFields.user?.memExpire != null)
                await UserService2.getInstance().UpdateExpiry(userId, memExpire.toLocaleString())

            if (form.formState.dirtyFields.user?.memStatus != null)
                await UserService2.getInstance().UpdateStatus(userId, memStatus)

            if (form.formState.dirtyFields.user?.memType != null)
                await UserService2.getInstance().UpdateMembership(userId, memType)

            if (isPrivilegesDirty) {
                await UserService2.getInstance().PutUserPrivileges(
                    userId,
                    getEnabledStateRecordKeys(privileges).join(',')
                )
                dispatchPrivileges({ action: 'update-defaults', value: privileges })
                dispatchPrivileges({ action: 'reset' })
            }

            const formData = form.getValues()
            form.reset(formData)

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
        form.reset()

        dispatchPrivileges({
            action: 'reset'
        })
    }

    const updatePassword = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

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
        } catch (err) {
            console.error(err)
        }
    }

    const hydrateDefaults = useCallback((): void => {
        if (userObj != null && !form.formState.isDirty) {
            form.reset({
                user: {
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
                },
                password: {
                    password1: '',
                    password2: ''
                }
            })
        }

        if (keyInfo?.pin != null) {
            form.setValue('user.userPin', keyInfo?.pin)
        }

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

    const userMemStatus = form.watch('user.memStatus')
    const userMemType = form.watch('user.memType')

    if (isUserLoading || userObj == null) return <LoadingOverlay />

    return (
        <div data-testid='AdminUsersEdit'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Edit User'
                    actions={[
                        <Button
                            key='Save Profile'
                            className='btn-success'
                            disabled={!form.formState.isDirty && !isPrivilegesDirty}
                            onClick={(event) => {
                                void submitHandler(event)
                            }}
                        >
                            Save Profile
                        </Button>,
                        <Button
                            key='Reset'
                            className='btn-default'
                            disabled={!form.formState.isDirty && !isPrivilegesDirty}
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
                                        <Row className='spacious'>
                                            <FormCol error={errors.user?.userName != null}>
                                                <label htmlFor='userName'>
                                                    <b>Username</b>
                                                </label>
                                                <FormControl
                                                    id='user.userName'
                                                    formType='text'
                                                    placeholder='Username'
                                                    aria-label='Username'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row className='spacious'>
                                            <FormCol error={errors.user?.firstName != null}>
                                                <label htmlFor='firstName'>
                                                    <b>First Name</b>
                                                </label>
                                                <FormControl
                                                    id='user.firstName'
                                                    formType='text'
                                                    placeholder='First Name'
                                                    aria-label='First Name'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row className='spacious'>
                                            <FormCol error={errors.user?.lastName != null}>
                                                <label htmlFor='lastName'>
                                                    <b>Last Name</b>
                                                    <FormControl
                                                        id='user.lastName'
                                                        formType='text'
                                                        placeholder='Last Name'
                                                        aria-label='Last Name'
                                                    />
                                                </label>
                                            </FormCol>
                                        </Row>

                                        <Row className='spacious'>
                                            <FormCol
                                                error={
                                                    errors.user?.userEmail != null || errors.user?.newsletter != null
                                                }
                                            >
                                                <label htmlFor='userEmail'>
                                                    <b>Email</b>
                                                </label>
                                                <span className='float-right m-0 inline'>
                                                    <label>
                                                        <input type='checkbox' {...form.register('user.newsletter')} />{' '}
                                                        Newsletter
                                                    </label>
                                                </span>
                                                <FormControl
                                                    id='user.userEmail'
                                                    formType='text'
                                                    placeholder='Email'
                                                    aria-label='Email'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row>
                                            <FormCol
                                                error={
                                                    errors.user?.paypalEmail != null || errors.user?.cashMember != null
                                                }
                                            >
                                                <label htmlFor='payPalEmail'>
                                                    <b>PayPal Email</b>
                                                </label>
                                                <span className='float-right m-0 inline'>
                                                    <label>
                                                        <input type='checkbox' {...form.register('user.cashMember')} />{' '}
                                                        Cash Member
                                                    </label>
                                                </span>
                                                <FormControl
                                                    id='user.paypalEmail'
                                                    formType='text'
                                                    placeholder='PayPal Email'
                                                    aria-label='PayPal Email'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row className='spacious'>
                                            <FormCol error={errors.user?.stripeEmail != null}>
                                                <label htmlFor='stripeEmail'>
                                                    <b>Stripe Email</b>
                                                </label>
                                                <FormControl
                                                    id='user.stripeEmail'
                                                    formType='text'
                                                    placeholder='Stripe Email'
                                                    aria-label='Stripe Email'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row className='spacious'>
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

                                        <Row className='spacious'>
                                            <Col>
                                                <p>
                                                    <strong>Current Expiry</strong>
                                                </p>
                                                {userObj.mem_expire.toLocaleString()}
                                            </Col>
                                            <FormCol error={errors.user?.memExpire != null}>
                                                <p>
                                                    <strong>Membership Expiry</strong>
                                                </p>
                                                <FormControl
                                                    id='user.memExpire'
                                                    formType='text'
                                                    className='text-right'
                                                />
                                            </FormCol>
                                        </Row>

                                        <Row className='spacious'>
                                            <FormCol
                                                error={errors.user?.memType != null}
                                                className={clsx(['basis-1/2 p-1'])}
                                            >
                                                <SelectorCard
                                                    id='user.memType'
                                                    defaultValue={userMemType}
                                                    mode='radio'
                                                    title='Membership Type'
                                                    options={membershipTypes}
                                                />
                                            </FormCol>

                                            <FormCol
                                                error={errors.user?.memStatus != null}
                                                className={clsx(['basis-1/2 p-1'])}
                                            >
                                                <SelectorCard
                                                    id='user.memStatus'
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
                                    <Row className='spacious'>
                                        <Col className='w-full'>
                                            <Card>
                                                <Card.Header>User&apos;s Access Pin</Card.Header>
                                                <Card.Body
                                                    className={
                                                        errors.user?.userPin != null ? 'shadow-form-error' : undefined
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
                                                            id='user.userPin'
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

                                    <Row className='spacious'>
                                        <Col className='w-full'>
                                            <LinkedAccountsCard currentUser={userObj} />
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col className='w-full'>
                                            <RFIDKeysCard currentUser={userObj} />
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col className='w-full'>
                                            <APIKeysCard currentUser={userObj} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Tab>

                        <Tab tabKey={'privileges'} title={'Permissions'}>
                            <Row className='spacious'>
                                <Col className='w-full p-1 lg:basis-1/2'>
                                    <PrivilegesCard className='lg:basis-full' currentUser={userObj} />
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
                            <Row className='spacious'>
                                <Col className='w-full p-1'>
                                    <Card>
                                        <Card.Header>Change Password</Card.Header>

                                        <Card.Body>
                                            <Row className='spacious'>
                                                <Col>New Password:</Col>
                                                <Col>
                                                    <FormControl
                                                        id='password.password1'
                                                        formType='password'
                                                        placeholder='New Password'
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className='spacious'>
                                                <Col>Confirm Password:</Col>
                                                <Col>
                                                    <FormControl
                                                        id='password.password2'
                                                        formType='password'
                                                        placeholder='Confirm Password'
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>
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

export default AdminUsersEdit
