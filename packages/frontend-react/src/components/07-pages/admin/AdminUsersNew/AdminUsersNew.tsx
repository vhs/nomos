import { useState, type FC, type MouseEvent } from 'react'

import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { toast } from 'react-toastify'

import type { AdminUsersNewProps } from './AdminUsersNew.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import MembershipSelectorCard from '@/components/05-materials/MembershipSelectorCard/MembershipSelectorCard'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import { postWithParams } from '@/lib/fetcher'

import type { User } from '@/types/records'

const AdminUsersNew: FC<AdminUsersNewProps> = () => {
    const router = useRouter()

    const { mutate } = useTablePageContext()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [userPass, setUserPass] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [membershipType, setMembershipType] = useState(-1)
    const [inputErrorStates, setInputErrorState] = useState<Record<string, boolean>>(
        ['firstName', 'lastName', 'userName', 'userPass', 'userEmail', 'membershipType'].reduce((c, e) => {
            return { ...c, [e]: false }
        }, {})
    )

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        let errors = 0

        const setError = (name: string): void => {
            errors++

            setInputErrorState((prevState) => {
                return { ...structuredClone(prevState), [name]: true }
            })
        }

        const unsetError = (name: string): void => {
            setInputErrorState((prevState) => {
                return { ...structuredClone(prevState), [name]: false }
            })
        }

        firstName === '' ? setError('firstName') : unsetError('firstName')
        lastName === '' ? setError('lastName') : unsetError('lastName')
        userName === '' ? setError('userName') : unsetError('userName')
        userPass === '' ? setError('userPass') : unsetError('userPass')
        userEmail === '' ? setError('userEmail') : unsetError('userEmail')
        membershipType === -1 ? setError('membershipType') : unsetError('membershipType')

        if (errors > 0) return

        const postParams = {
            username: userName,
            password: userPass,
            email: userEmail,
            fname: firstName,
            lname: lastName,
            membershipid: Number(membershipType)
        }

        const submitResult = await postWithParams<User>('/services/v2/UserService2.svc/Create', postParams)

        if (submitResult.id != null) {
            toast.success('Account created!')
            await mutate()
            await router.navigate({ to: `/admin/users/${submitResult.id}` })
        } else {
            toast.error('An unknown error occured! Please notify your administrators')
        }
    }

    return (
        <div data-testid='AdminUsersNew'>
            <OverlayCard
                title='Create User'
                actions={
                    <Button
                        variant='primary'
                        onClick={(event) => {
                            void submitHandler(event)
                        }}
                    >
                        Create
                    </Button>
                }
            >
                <Row className='spacious'>
                    <Col className='basis-1/2 px-2'>
                        <label htmlFor='create-user-first-name'>First Name</label>
                        <FormControl
                            formType='text'
                            placeholder='First Name'
                            aria-label='First Name'
                            id='create-user-first-name'
                            className={clsx(['w-full', inputErrorStates.firstName ? 'border border-red-600' : null])}
                            value={firstName}
                            onChange={(value) => {
                                setFirstName(value)
                            }}
                        />
                    </Col>

                    <Col className='basis-1/2 px-2'>
                        <label htmlFor='create-user-last-name'>Last Name</label>
                        <FormControl
                            formType='text'
                            placeholder='Last Name'
                            aria-label='Last Name'
                            id='create-user-last-name'
                            className={clsx(['w-full', inputErrorStates.lastName ? 'border border-red-600' : null])}
                            value={lastName}
                            onChange={(value) => {
                                setLastName(value)
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className='basis-1/2 px-2'>
                        <Row className='spacious'>
                            <Col className='w-full'>
                                <label htmlFor='create-user-user-name'>Username</label>
                                <FormControl
                                    formType='text'
                                    placeholder='Username'
                                    aria-label='Username'
                                    id='create-user-user-name'
                                    className={clsx([inputErrorStates.userName ? 'border border-red-600' : null])}
                                    value={userName}
                                    onChange={(value) => {
                                        setUserName(value)
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className='spacious'>
                            <Col className='w-full'>
                                <label htmlFor='create-user-user-pass'>Password</label>
                                <FormControl
                                    formType='password'
                                    placeholder='Password'
                                    aria-label='Password'
                                    id='create-user-user-pass'
                                    className={clsx([inputErrorStates.userPass ? 'border border-red-600' : null])}
                                    value={userPass}
                                    onChange={(value) => {
                                        setUserPass(value)
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className='spacious'>
                            <Col className='w-full'>
                                <label htmlFor='create-user-user-email'>E-Mail</label>
                                <FormControl
                                    formType='email'
                                    placeholder='E-Mail'
                                    aria-label='E-Mail'
                                    id='create-user-user-email'
                                    className={clsx([inputErrorStates.userEmail ? 'border border-red-600' : null])}
                                    value={userEmail}
                                    onChange={(value) => {
                                        setUserEmail(value)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col className='basis-1/2 px-1'>
                        <MembershipSelectorCard
                            className={clsx([
                                'spacious',
                                inputErrorStates.membershipType ? 'border border-red-600' : null
                            ])}
                            onUpdate={(id: number) => {
                                setMembershipType(id)
                            }}
                            value={membershipType}
                        />
                    </Col>
                </Row>
            </OverlayCard>
        </div>
    )
}

export default AdminUsersNew
