import { useCallback, useEffect, useMemo, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import clsx from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import type { AdminMembershipsForm } from '../AdminMemberships.types'
import type { AdminMembershipsEditProps } from './AdminMembershipsEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import useToggleReducer from '@/lib/hooks/useToggleReducer'
import MembershipService2 from '@/lib/providers/MembershipService2'
import { convertPrivilegesArrayToBooleanRecord, getEnabledStateRecordKeys } from '@/lib/utils'
import { zMembershipPeriod } from '@/lib/validators/records'

import type { Membership } from '@/types/records'

import { AdminMembershipsSchema } from '../AdminMemberships.schema'
import { AdminMembershipsDefaultValues } from '../AdminMemberships.utils'

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

    const form = useForm<AdminMembershipsForm>({
        resolver: zodResolver(AdminMembershipsSchema),
        mode: 'onChange',
        defaultValues: AdminMembershipsDefaultValues
    })

    const { activeFlag, privateFlag, recurringFlag, trialFlag } = form.watch()

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: isPrivilegesDirty
    } = useToggleReducer(convertPrivilegesArrayToBooleanRecord(membership?.privileges))

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (membership == null) {
            toast.error('Missing membership information')
            return
        }

        if (!form.formState.isDirty) {
            toast.error('Nothing changed!')

            return
        }

        if (!form.formState.isValid) {
            toast.error(`Please fix the errors (${Object.keys(form.formState.errors).length}) before continuing`)
            return
        }

        const loadingToastId = toast.loading('Updating membership')

        try {
            const {
                title,
                code,
                description,
                price,
                interval: days,
                period,
                activeFlag,
                privateFlag,
                recurringFlag,
                trialFlag
            } = form.getValues()

            const updateFields = ['title', 'code', 'description', 'price', 'interval', 'period']

            if (updateFields.some((f) => f in form.formState.dirtyFields))
                await MembershipService2.getInstance().Update(
                    Number(membershipId),
                    title,
                    description,
                    price,
                    code,
                    days,
                    period
                )

            if ('trialFlag' in form.formState.dirtyFields)
                await MembershipService2.getInstance().UpdateTrial(membershipId, trialFlag)

            if ('recurringFlag' in form.formState.dirtyFields)
                await MembershipService2.getInstance().UpdateRecurring(membershipId, recurringFlag)

            if ('privateFlag' in form.formState.dirtyFields)
                await MembershipService2.getInstance().UpdatePrivate(membershipId, privateFlag)

            if ('activeFlag' in form.formState.dirtyFields)
                await MembershipService2.getInstance().UpdateActive(membershipId, activeFlag)

            if (isPrivilegesDirty)
                await MembershipService2.getInstance().PutPrivileges(
                    membershipId,
                    getEnabledStateRecordKeys(privileges)
                )

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
        form.reset({
            title: membership?.title,
            code: membership?.code,
            description: membership?.description,
            price: membership?.price,
            interval: membership?.days,
            period: membership?.period,
            activeFlag: membership?.active,
            privateFlag: membership?.private,
            recurringFlag: membership?.recurring,
            trialFlag: membership?.trial
        })
    }, [
        form,
        membership?.active,
        membership?.code,
        membership?.days,
        membership?.description,
        membership?.period,
        membership?.price,
        membership?.private,
        membership?.recurring,
        membership?.title,
        membership?.trial
    ])

    useEffect(() => {
        hydrateDefaults()
    }, [hydrateDefaults, membership])

    if (isLoading || membership == null) return <LoadingOverlay />

    return (
        <div data-testid='AdminMembershipsEdit'>
            <FormProvider {...form}>
                <OverlayCard
                    title={`Edit Membership - ${membership.title}`}
                    actions={[
                        <Button
                            key='Save'
                            className='btn-success'
                            disabled={!form.formState.isDirty}
                            onClick={(event) => {
                                void submitHandler(event)
                            }}
                        >
                            Save
                        </Button>,
                        <Button
                            key='Reset'
                            className='btn-default'
                            disabled={!form.formState.isDirty}
                            onClick={() => {
                                hydrateDefaults()
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
                                        <FormCol>
                                            <label htmlFor='title'>
                                                <b>Title</b>
                                                <FormControl id='title' formType='text' />
                                            </label>
                                        </FormCol>
                                    </Row>
                                    <Row className='spacious'>
                                        <FormCol>
                                            <label htmlFor='code'>
                                                <b>Code</b>
                                                <FormControl id='code' formType='text' />
                                            </label>
                                        </FormCol>
                                    </Row>
                                    <Row className='spacious'>
                                        <FormCol>
                                            <label htmlFor='description'>
                                                <b>Description</b>
                                                <FormControl id='description' formType='text' />
                                            </label>
                                        </FormCol>
                                    </Row>
                                    <Row className='spacious'>
                                        <FormCol>
                                            <label htmlFor='price'>
                                                <b>Price</b>
                                                <FormControl id='price' formType='number' />
                                            </label>
                                        </FormCol>
                                    </Row>
                                    <Row className='spacious'>
                                        <FormCol className='basis-full md:basis-1/2'>
                                            <label htmlFor='interval'>
                                                <b>Interval</b>
                                                <FormControl id='interval' formType='number' />
                                            </label>
                                        </FormCol>
                                        <FormCol className='basis-full md:basis-1/2'>
                                            <label htmlFor='period'>
                                                <b>Period</b>
                                                <div className='w-full'>
                                                    <FormControl
                                                        id='period'
                                                        formType='dropdown'
                                                        options={zMembershipPeriod.options.map((o) => o.value)}
                                                    />
                                                </div>
                                            </label>
                                        </FormCol>
                                    </Row>

                                    <Row className='spacious w-full'>
                                        <Col className='basis-full md:basis-1/2'>
                                            <Toggle
                                                id='trialFlag'
                                                checked={trialFlag}
                                                onChange={(checked) => {
                                                    form.setValue('trialFlag', checked)
                                                }}
                                            >
                                                Trial
                                            </Toggle>
                                        </Col>
                                        <Col className='basis-full md:basis-1/2'>
                                            <Toggle
                                                checked={recurringFlag}
                                                onChange={(checked) => {
                                                    form.setValue('recurringFlag', checked)
                                                }}
                                            >
                                                Recurring
                                            </Toggle>
                                        </Col>
                                        <Col className='basis-full md:basis-1/2'>
                                            <Toggle
                                                checked={privateFlag}
                                                onChange={(checked) => {
                                                    form.setValue('privateFlag', checked)
                                                }}
                                            >
                                                Private
                                            </Toggle>
                                        </Col>
                                        <Col className='basis-full md:basis-1/2'>
                                            <Toggle
                                                checked={activeFlag}
                                                onChange={(checked) => {
                                                    form.setValue('activeFlag', checked)
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
                                        <Col className={clsx(['w-full p-1 lg:basis-1/2'])}>
                                            <PrivilegesSelectorCard
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default AdminMembershipsEdit
