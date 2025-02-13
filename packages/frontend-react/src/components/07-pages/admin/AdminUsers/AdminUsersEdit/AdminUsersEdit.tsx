import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { useParams } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import type { AdminUsersEditProps } from './AdminUsersEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Container from '@/components/01-atoms/Container/Container'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card'
import StatusSelectorCard from '@/components/04-composites/StatusSelectorCard/StatusSelectorCard'
import Tab from '@/components/04-composites/Tabs/Tab/Tab'
import Tabs from '@/components/04-composites/Tabs/Tabs'
import MembershipSelectorCard from '@/components/05-materials/MembershipSelectorCard/MembershipSelectorCard'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import UserObject from '@/lib/db/User'
import { postWithParams } from '@/lib/fetcher'
import { useGetUserUrl } from '@/lib/hooks/providers/UserService2/useGetUser'
import useAuth from '@/lib/hooks/useAuth'
import { usePrivilegeCodesReducer, type PrivilegeCodesMutationArg } from '@/lib/hooks/usePrivilegeCodesReducer'
import PinService2 from '@/lib/providers/PinService2'
import UserService2 from '@/lib/providers/UserService2'
import { hydrateReducer, hydrateState } from '@/lib/ui'
import { compareStringArray } from '@/lib/util'
import { zPasswordInput } from '@/lib/validators/common'
import {
    isEmailAddress,
    isPositiveNumber,
    isString,
    isStringArray,
    isUserActiveStateCodes,
    isUserPin
} from '@/lib/validators/guards'

import type { UserActiveStateCodes } from '@/types/common'
import type { User } from '@/types/records'

import APIKeysCard from '../../../user/UserProfile/APIKeysCard'
import LinkedAccountsCard from '../../../user/UserProfile/LinkedAccountsCard'
import PrivilegesCard from '../../../user/UserProfile/PrivilegesCard'
import RFIDKeysCard from '../../../user/UserProfile/RFIDKeysCard'

const AdminUsersEdit: FC<AdminUsersEditProps> = () => {
    const { mutate } = useTablePageContext()

    const userId = useParams({
        from: '/_admin/admin/users/$userId',
        select: (params): number => Number(params.userId)
    })

    const { currentUser } = useAuth()

    const getUserUrl = useGetUserUrl(userId)

    const { data: userData, isLoading: isUserLoading, mutate: mutateUser } = useSWR<User>(getUserUrl)

    const userObj = useMemo(() => (userData != null ? new UserObject(userData) : null), [userData])

    const [dirty, setDirty] = useState(false)
    const [userFirstName, setFirstName] = useState('')
    const [userLastName, setLastName] = useState('')
    const [userUserName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPayPalEmail, setUserPayPalEmail] = useState('')
    const [userStripeEmail, setUserStripeEmail] = useState('')
    const [userNewsletter, setUserNewsletter] = useState(false)
    const [userCashMember, setUserCashMember] = useState(false)
    const [userPin, setUserPin] = useState('')
    const [userExpiry, setUserExpiry] = useState('')
    const [userMembershipStatus, setMembershipStatus] = useState<UserActiveStateCodes>('t')
    const [userMembershipType, setMembershipType] = useState(-1)
    const [userPrivileges, dispatchUserPrivileges] = usePrivilegeCodesReducer()
    const [inputErrorStates, setInputErrorState] = useState<Record<string, boolean>>(
        ['userFirstName', 'userLastName', 'userUserName', 'userPass', 'userEmail', 'membershipType'].reduce((c, e) => {
            return { ...c, [e]: false }
        }, {})
    )
    const [userPassword1, setUserPassword1] = useState<string>('')
    const [userPassword2, setUserPassword2] = useState<string>('')

    const pinInfo = useMemo(() => userData?.keys.find((key) => key.type === 'pin'), [userData?.keys])

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

    const addError = (inputFieldName: string): void => {
        setInputErrorState((prevState) => {
            return { ...structuredClone(prevState), [inputFieldName]: true }
        })
    }

    const removeError = (inputFieldName: string): void => {
        setInputErrorState((prevState) => {
            return { ...structuredClone(prevState), [inputFieldName]: false }
        })
    }

    const catchErrors = (inputFieldName: string, ...tests: boolean[]): boolean => {
        if (tests.filter(Boolean).length > 0) {
            addError(inputFieldName)

            return true
        } else {
            removeError(inputFieldName)

            return false
        }
    }

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        const errors = [
            catchErrors('userFirstName', !isString(userFirstName)),
            catchErrors('userLastName', !isString(userLastName)),
            catchErrors('userUserName', !isString(userUserName)),
            catchErrors('userEmail', !isEmailAddress(userEmail)),
            catchErrors('userPayPalEmail', !isString(userPayPalEmail)),
            catchErrors('userStripeEmail', !isString(userStripeEmail)),
            catchErrors('userMembershipType', !isPositiveNumber(userMembershipType)),
            catchErrors('userMembershipStatus', !isUserActiveStateCodes(userMembershipStatus)),
            catchErrors('userPin', !isUserPin(userPin)),
            catchErrors(
                'userPrivileges',
                !Array.isArray(userPrivileges.privileges),
                Array.isArray(userPrivileges.privileges) &&
                    userPrivileges.privileges.length > 0 &&
                    !isStringArray(userPrivileges.privileges)
            )
        ].filter(Boolean).length

        if (errors > 0) {
            toast.error(`Please fix the errors (${errors}) before continuing`)
            return
        }

        const loadingToastId = toast.loading('Updating profile')

        try {
            if (userUserName !== userObj?.username)
                await UserService2.getInstance().UpdateUsername(userId, userUserName)

            if (currentUser?.hasPrivilege('full-profile') === true) {
                if (userFirstName !== userObj?.fname && userLastName !== userObj?.lname)
                    await UserService2.getInstance().UpdateName(userId, userFirstName, userLastName)
                if (userEmail !== userObj?.email) await UserService2.getInstance().UpdateEmail(userId, userEmail)
                if (userPayPalEmail !== userObj?.payment_email)
                    await UserService2.getInstance().UpdatePaymentEmail(userId, userPayPalEmail)
                if (userStripeEmail !== userObj?.stripe_email)
                    await UserService2.getInstance().UpdateStripeEmail(userId, userStripeEmail)
            }

            if (userNewsletter !== userObj?.newsletter)
                await UserService2.getInstance().UpdateNewsletter(userId, userNewsletter)
            if (userCashMember !== userObj?.cash) await UserService2.getInstance().UpdateCash(userId, userCashMember)

            if (userPin !== keyInfo?.pin) await PinService2.getInstance().UpdatePin(userId, userPin)

            if (userExpiry !== userObj?.mem_expire.toLocaleString())
                await UserService2.getInstance().UpdateExpiry(userId, userExpiry)

            if (userMembershipStatus !== userObj?.active)
                await UserService2.getInstance().UpdateStatus(userId, userMembershipStatus)

            if (userMembershipType !== userObj?.membership_id)
                await UserService2.getInstance().UpdateMembership(userId, userMembershipType)

            if (
                !compareStringArray(
                    userPrivileges.privileges,
                    userObj?.privileges.map((p) => p.code)
                )
            )
                await UserService2.getInstance().PutUserPrivileges(userId, userPrivileges.privileges)

            toast.update(loadingToastId, { render: 'User updated', type: 'success', isLoading: false, autoClose: 5000 })

            await mutate()
            await mutateUser()
        } catch (err) {
            toast.update(loadingToastId, {
                render: 'An unknown error occured. Please notify your administrators!',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            })
            console.error(err)
        }
    }

    const hydrateDefaults = useCallback((): void => {
        hydrateState(userObj?.fname, setFirstName)
        hydrateState(userObj?.lname, setLastName)
        hydrateState(userObj?.username, setUserName)
        hydrateState(userObj?.email, setUserEmail)
        hydrateState(userObj?.payment_email, setUserPayPalEmail)
        hydrateState(userObj?.stripe_email, setUserStripeEmail)
        hydrateState(userObj?.newsletter, setUserNewsletter)
        hydrateState(userObj?.cash, setUserCashMember)
        hydrateState(keyInfo?.pin, setUserPin)
        hydrateState(userObj?.mem_expire.toLocaleString(), setUserExpiry)
        hydrateState<UserActiveStateCodes>(userObj?.active, setMembershipStatus)
        hydrateState(userObj?.membership_id, setMembershipType)
        hydrateReducer(
            userObj != null ? { action: 'replace', value: userObj?.privileges.map((p) => p.code) } : null,
            dispatchUserPrivileges
        )
        setInputErrorState({})
        setDirty(false)
    }, [dispatchUserPrivileges, keyInfo?.pin, userObj])

    const updatePassword = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

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
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        hydrateDefaults()
    }, [hydrateDefaults, userObj])

    if (isUserLoading || userObj == null) return <LoadingOverlay />

    return (
        <div data-testid='AdminUsersEdit'>
            <OverlayCard
                title='Edit User'
                actions={[
                    <Button
                        key='Save Profile'
                        className={dirty ? 'btn-success bg-lime-500 text-black' : 'btn-success'}
                        onClick={(event) => {
                            void submitHandler(event)
                        }}
                    >
                        Save Profile
                    </Button>,
                    <Button
                        key='Reset'
                        className='btn-default'
                        onClick={() => {
                            hydrateDefaults()
                            setDirty(false)
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
                                        <Col
                                            className={
                                                inputErrorStates.userUserName
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <label htmlFor='userUserName'>
                                                <b>Username</b>
                                            </label>
                                            <FormControl
                                                formType='text'
                                                placeholder='Username'
                                                aria-label='Username'
                                                id='userUserName'
                                                name='userUserName'
                                                value={userUserName}
                                                onChange={(value) => {
                                                    setUserName(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col
                                            className={
                                                inputErrorStates.userFirstName
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <label htmlFor='userFirstName'>
                                                <b>First Name</b>
                                            </label>
                                            <FormControl
                                                formType='text'
                                                placeholder='First Name'
                                                aria-label='First Name'
                                                id='userFirstName'
                                                value={userFirstName}
                                                onChange={(value) => {
                                                    setFirstName(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col
                                            className={
                                                inputErrorStates.userLastName
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <label htmlFor='userLastName'>
                                                <b>Last Name</b>
                                                <FormControl
                                                    formType='text'
                                                    placeholder='Last Name'
                                                    aria-label='Last Name'
                                                    id='userLastName'
                                                    value={userLastName}
                                                    onChange={(value) => {
                                                        setLastName(value)
                                                        setDirty(true)
                                                    }}
                                                />
                                            </label>
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col
                                            className={
                                                inputErrorStates.userEmail || inputErrorStates.userNewsletter
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <label htmlFor='userEmail'>
                                                <b>Email</b>
                                            </label>
                                            <span className='float-right m-0 inline'>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        checked={userNewsletter}
                                                        onChange={(value) => {
                                                            setUserNewsletter(value.target.checked)
                                                            setDirty(true)
                                                        }}
                                                    />{' '}
                                                    Newsletter
                                                </label>
                                            </span>
                                            <FormControl
                                                formType='text'
                                                placeholder='Email'
                                                aria-label='Email'
                                                id='userEmail'
                                                value={userEmail}
                                                onChange={(value) => {
                                                    setUserEmail(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col
                                            className={
                                                inputErrorStates.userPayPalEmail || inputErrorStates.userCashMember
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <label htmlFor='userPayPalEmail'>
                                                <b>PayPal Email</b>
                                            </label>
                                            <span className='float-right m-0 inline'>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        checked={userCashMember}
                                                        onChange={(value) => {
                                                            setUserCashMember(value.target.checked)
                                                            setDirty(true)
                                                        }}
                                                    />{' '}
                                                    Cash Member
                                                </label>
                                            </span>
                                            <FormControl
                                                formType='text'
                                                placeholder='PayPal Email'
                                                aria-label='PayPal Email'
                                                id='userPayPalEmail'
                                                value={userPayPalEmail}
                                                onChange={(value) => {
                                                    setUserPayPalEmail(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col
                                            className={
                                                inputErrorStates.userStripeEmail
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <label htmlFor='userStripeEmail'>
                                                <b>Stripe Email</b>
                                            </label>
                                            <FormControl
                                                formType='text'
                                                placeholder='Stripe Email'
                                                aria-label='Stripe Email'
                                                id='userStripeEmail'
                                                value={userStripeEmail}
                                                onChange={(value) => {
                                                    setUserStripeEmail(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </Col>
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
                                        <Col
                                            className={
                                                inputErrorStates.userExpiry
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            }
                                        >
                                            <p>
                                                <strong>Membership Expiry</strong>
                                            </p>
                                            <FormControl
                                                formType='text'
                                                className='text-right'
                                                value={userExpiry}
                                                onChange={(value) => {
                                                    setUserExpiry(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='spacious'>
                                        <Col
                                            className={clsx([
                                                'basis-1/2 p-1',
                                                inputErrorStates.userUserName
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            ])}
                                        >
                                            <MembershipSelectorCard
                                                onUpdate={(id: number): void => {
                                                    setMembershipType(id)
                                                    setDirty(true)
                                                }}
                                                value={userMembershipType}
                                            />
                                        </Col>

                                        <Col
                                            className={clsx([
                                                'basis-1/2 p-1',

                                                inputErrorStates.userUserName
                                                    ? 'rounded-sm border border-red-500'
                                                    : undefined
                                            ])}
                                        >
                                            <StatusSelectorCard
                                                onUpdate={(code: UserActiveStateCodes): void => {
                                                    setMembershipStatus(code)
                                                    setDirty(true)
                                                }}
                                                value={userMembershipStatus}
                                            />
                                        </Col>
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
                                                    inputErrorStates.userPin
                                                        ? 'rounded-sm border border-red-500'
                                                        : undefined
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
                                                        formType='number'
                                                        preContent={keyInfo?.pinid ?? ''}
                                                        placeholder=''
                                                        aria-label='User Pin'
                                                        id='userPin'
                                                        value={userPin}
                                                        size={4}
                                                        maxLength={4}
                                                        onChange={(value) => {
                                                            if (value.length <= 4) {
                                                                setUserPin(value)
                                                                setDirty(true)
                                                            }
                                                        }}
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

                            <Col
                                className={clsx([
                                    'w-full p-1 lg:basis-1/2',
                                    inputErrorStates.userPrivileges ? 'rounded-sm border border-red-500' : undefined
                                ])}
                            >
                                <PrivilegesSelectorCard
                                    onUpdate={(mutation: PrivilegeCodesMutationArg): void => {
                                        dispatchUserPrivileges(mutation)
                                        setDirty(true)
                                    }}
                                    value={userPrivileges}
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
                                                    formType='password'
                                                    placeholder='New Password'
                                                    value={userPassword1}
                                                    onChange={(value) => {
                                                        setUserPassword1(value)
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
                                                    onChange={(value) => {
                                                        setUserPassword2(value)
                                                    }}
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
        </div>
    )
}

export default AdminUsersEdit
