import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { useParams } from '@tanstack/react-router'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import type { AdminMembershipsEditProps } from './AdminMembershipsEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import { usePrivilegeCodesReducer, type PrivilegeCodesMutationArg } from '@/lib/hooks/usePrivilegeCodesReducer'
import MembershipService2 from '@/lib/providers/MembershipService2'
import { hydrateReducer, hydrateState } from '@/lib/ui'
import { compareStringArray } from '@/lib/util'
import { isBoolean, isMembershipPeriod, isNumber, isString, isStringArray } from '@/lib/validators/guards'

import type { Membership, MembershipPeriod } from '@/types/records'

const AdminMembershipsEdit: FC<AdminMembershipsEditProps> = () => {
    const { mutate } = useTablePageContext()

    const membershipId = useParams({
        from: '/_admin/admin/memberships/$membershipId',
        select: ({ membershipId }): number => Number(membershipId)
    })

    const getMembershipUrl = useMemo(
        () => `/services/v2/MembershipService2.svc/Get?membershipId=${membershipId}`,
        [membershipId]
    )

    const { data: membership, isLoading, mutate: mutateMembership } = useSWR<Membership>(getMembershipUrl)

    const [dirty, setDirty] = useState(false)

    const [membershipTitle, setMembershipTitle] = useState<string>('')
    const [membershipCode, setMembershipCode] = useState<string>('')
    const [membershipDescription, setMembershipDescription] = useState<string>('')
    const [membershipPrice, setMembershipPrice] = useState<number>(0.0)
    const [membershipInterval, setMembershipInterval] = useState<number>(0.0)
    const [membershipPeriod, setMembershipPeriod] = useState<MembershipPeriod>('M')
    const [membershipTrial, setMembershipTrial] = useState<boolean>(false)
    const [membershipPrivate, setMembershipPrivate] = useState<boolean>(false)
    const [membershipRecurring, setMembershipRecurring] = useState<boolean>(false)
    const [membershipActive, setMembershipActive] = useState<boolean>(false)

    const [membershipPrivileges, dispatchMembershipPrivileges] = usePrivilegeCodesReducer()

    const [inputErrorStates, setInputErrorState] = useState<Record<string, boolean>>(
        [
            'membershipTitle',
            'membershipCode',
            'membershipDescription',
            'membershipPrice',
            'membershipInterval',
            'membershipPeriod',
            'membershipTrial',
            'membershipPrivate',
            'membershipRecurring',
            'membershipActive',
            'membershipPrivileges'
        ].reduce((c, e) => {
            return { ...c, [e]: false }
        }, {})
    )

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
        if (tests.filter(Boolean).length !== tests.length) {
            addError(inputFieldName)

            return true
        } else {
            removeError(inputFieldName)

            return false
        }
    }

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (membership == null) {
            toast.error('Missing membership information')
            return
        }

        const errors = [
            catchErrors('membershipTitle', isString(membershipTitle)),
            catchErrors('membershipCode', isString(membershipCode)),
            catchErrors('membershipDescription', isString(membershipDescription)),
            catchErrors('membershipPrice', isNumber(membershipPrice)),
            catchErrors('membershipInterval', isNumber(membershipInterval)),
            catchErrors('membershipPeriod', isMembershipPeriod(membershipPeriod)),
            catchErrors('membershipTrial', isBoolean(membershipTrial)),
            catchErrors('membershipRecurring', isBoolean(membershipRecurring)),
            catchErrors('membershipPrivate', isBoolean(membershipPrivate)),
            catchErrors('membershipActive', isBoolean(membershipActive)),
            catchErrors(
                'membershipPrivileges',
                Array.isArray(membership.privileges),
                Array.isArray(membershipPrivileges.privileges),
                Array.isArray(membershipPrivileges.privileges) &&
                    (membershipPrivileges.privileges.length === 0 ||
                        (membershipPrivileges.privileges.length > 0 && isStringArray(membershipPrivileges.privileges)))
            )
        ].filter(Boolean).length

        if (errors > 0) {
            toast.error(`Please fix the errors (${errors}) before continuing`)
            return
        }

        const loadingToastId = toast.loading('Updating membership')

        try {
            let membershipUpdateChanges = 0

            const membershipUpdate = {
                title: membership.title,
                code: membership.code,
                description: membership.description,
                price: membership.price,
                days: membership.days,
                period: membership.period
            }

            if (membershipTitle != null && membershipTitle !== membership.title) {
                membershipUpdate.title = membershipTitle
                membershipUpdateChanges++
            }
            if (membershipCode != null && membershipCode !== membership.code) {
                membershipUpdate.code = membershipCode
                membershipUpdateChanges++
            }
            if (membershipDescription != null && membershipDescription !== membership.description) {
                membershipUpdate.description = membershipDescription
                membershipUpdateChanges++
            }
            if (membershipPrice != null && membershipPrice !== membership.price) {
                membershipUpdate.price = membershipPrice
                membershipUpdateChanges++
            }
            if (membershipInterval != null && membershipInterval !== membership.days) {
                membershipUpdate.days = membershipInterval
                membershipUpdateChanges++
            }
            if (membershipPeriod != null && membershipPeriod !== membership.period) {
                membershipUpdate.period = membershipPeriod
                membershipUpdateChanges++
            }

            if (membershipUpdateChanges > 0)
                await MembershipService2.getInstance().Update(
                    Number(membershipId),
                    membership.title,
                    membership.description,
                    membership.price,
                    membership.code,
                    membership.days,
                    membership.period
                )

            if (membershipTrial !== membership.trial)
                await MembershipService2.getInstance().UpdateTrial(membershipId, membershipTrial)

            if (membershipRecurring !== membership.recurring)
                await MembershipService2.getInstance().UpdateRecurring(membershipId, membershipRecurring)

            if (membershipPrivate !== membership.private)
                await MembershipService2.getInstance().UpdatePrivate(membershipId, membershipPrivate)

            if (membershipActive !== membership.active)
                await MembershipService2.getInstance().UpdateActive(membershipId, membershipActive)

            if (
                !compareStringArray(
                    membershipPrivileges.privileges,
                    membership.privileges?.map((p) => p.code)
                )
            )
                await MembershipService2.getInstance().PutPrivileges(membershipId, membershipPrivileges.privileges)

            toast.update(loadingToastId, {
                render: 'Membership updated',
                type: 'success',
                isLoading: false,
                autoClose: 5000
            })

            await mutate()
            await mutateMembership()
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
        hydrateState(membership?.title, setMembershipTitle)
        hydrateState(membership?.code, setMembershipCode)
        hydrateState(membership?.description, setMembershipDescription)
        hydrateState(membership?.price, setMembershipPrice)
        hydrateState(membership?.days, setMembershipInterval)
        hydrateState(membership?.period, setMembershipPeriod)
        hydrateState(membership?.trial, setMembershipTrial)
        hydrateState(membership?.recurring, setMembershipRecurring)
        hydrateState(membership?.private, setMembershipPrivate)
        hydrateState(membership?.active, setMembershipActive)
        hydrateReducer(
            membership?.privileges != null
                ? { action: 'replace', value: membership?.privileges?.map((p) => p.code) }
                : null,
            dispatchMembershipPrivileges
        )
        setInputErrorState({})
        setDirty(false)
    }, [dispatchMembershipPrivileges, membership])

    useEffect(() => {
        hydrateDefaults()
    }, [hydrateDefaults, membership])

    if (isLoading || membership == null) return <LoadingOverlay />

    return (
        <div className='' data-testid='AdminMembershipsEdit'>
            <OverlayCard
                title={`Edit Membership - ${membership.title}`}
                actions={[
                    <Button
                        key='Save'
                        className={dirty ? 'btn-success bg-lime-500 text-black' : 'btn-success'}
                        onClick={(event) => {
                            void submitHandler(event)
                        }}
                    >
                        Save
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
                <Row>
                    <Col className='basis-full p-1 lg:basis-1/2'>
                        <Card>
                            <Card.Header>Options</Card.Header>
                            <Card.Body>
                                <Row className='spacious'>
                                    <Col>
                                        <label htmlFor='membership-title'>
                                            <b>Title</b>
                                            <FormControl
                                                formType='text'
                                                id='membership-title'
                                                value={membershipTitle}
                                                onChange={(value) => {
                                                    setMembershipTitle(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row className='spacious'>
                                    <Col>
                                        <label htmlFor='membership-code'>
                                            <b>Code</b>
                                            <FormControl
                                                formType='text'
                                                id='membership-code'
                                                value={membershipCode}
                                                onChange={(value) => {
                                                    setMembershipCode(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row className='spacious'>
                                    <Col>
                                        <label htmlFor='membership-description'>
                                            <b>Description</b>
                                            <FormControl
                                                formType='text'
                                                id='membership-description'
                                                value={membershipDescription}
                                                onChange={(value) => {
                                                    setMembershipDescription(value)
                                                    setDirty(true)
                                                }}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row className='spacious'>
                                    <Col>
                                        <label htmlFor='membership-price'>
                                            <b>Price</b>
                                            <FormControl
                                                formType='number'
                                                id='membership-price'
                                                value={membershipPrice.toLocaleString()}
                                                onChange={(value) => {
                                                    setMembershipPrice(Number(value))
                                                    setDirty(true)
                                                }}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row className='spacious'>
                                    <Col className='basis-full md:basis-1/2'>
                                        <label htmlFor='membership-interval'>
                                            <b>Interval</b>
                                            <FormControl
                                                formType='number'
                                                id='membership-interval'
                                                value={membershipInterval.toLocaleString()}
                                                onChange={(value) => {
                                                    setMembershipInterval(Number(value))
                                                    setDirty(true)
                                                }}
                                            />
                                        </label>
                                    </Col>
                                    <Col className='basis-full md:basis-1/2'>
                                        <label htmlFor='membership-period'>
                                            <b>Period</b>
                                            <div className='w-full'>
                                                <select
                                                    value={membershipPeriod}
                                                    onChange={(event) => {
                                                        if (isMembershipPeriod(event.target.value)) {
                                                            setMembershipPeriod(event.target.value)
                                                            setDirty(true)
                                                        }
                                                    }}
                                                >
                                                    <option value='---'>---</option>
                                                    <option value='D'>Days</option>
                                                    <option value='M'>Month</option>
                                                    <option value='Y'>Year</option>
                                                </select>
                                            </div>
                                        </label>
                                    </Col>
                                </Row>

                                <Row className='spacious w-full flex-wrap'>
                                    <Col className='basis-full md:basis-1/2'>
                                        <Toggle
                                            checked={membershipTrial}
                                            onChange={(checked) => {
                                                setMembershipTrial(checked)
                                                setDirty(true)
                                            }}
                                        >
                                            Trial
                                        </Toggle>
                                    </Col>
                                    <Col className='basis-full md:basis-1/2'>
                                        <Toggle
                                            checked={membershipRecurring}
                                            onChange={(checked) => {
                                                setMembershipRecurring(checked)
                                                setDirty(true)
                                            }}
                                        >
                                            Recurring
                                        </Toggle>
                                    </Col>
                                    <Col className='basis-full md:basis-1/2'>
                                        <Toggle
                                            checked={membershipPrivate}
                                            onChange={(checked) => {
                                                setMembershipPrivate(checked)
                                                setDirty(true)
                                            }}
                                        >
                                            Private
                                        </Toggle>
                                    </Col>
                                    <Col className='basis-full md:basis-1/2'>
                                        <Toggle
                                            checked={membershipActive}
                                            onChange={(checked) => {
                                                setMembershipActive(checked)
                                                setDirty(true)
                                            }}
                                        >
                                            Active
                                        </Toggle>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='basis-full p-1 lg:basis-1/2'>
                        <Card>
                            <Card.Header>Permissions</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col
                                        className={clsx([
                                            'w-full p-1 lg:basis-1/2',
                                            inputErrorStates.membershipPrivileges
                                                ? 'rounded-sm border border-red-500'
                                                : undefined
                                        ])}
                                    >
                                        <PrivilegesSelectorCard
                                            onUpdate={(mutation: PrivilegeCodesMutationArg): void => {
                                                dispatchMembershipPrivileges(mutation)
                                                setDirty(true)
                                            }}
                                            value={membershipPrivileges}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </OverlayCard>
        </div>
    )
}

export default AdminMembershipsEdit
