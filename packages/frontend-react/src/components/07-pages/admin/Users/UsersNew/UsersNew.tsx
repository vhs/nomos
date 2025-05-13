import { useMemo, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { UsersCreateSchema, UsersNewProps } from './UsersNew.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import MembershipSelectorCard from '@/components/05-materials/MembershipSelectorCard/MembershipSelectorCard'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/06-integrated-pages/TablePage/TablePage.context'

import { isUser } from '@/lib/guards/records'
import UserService2 from '@/lib/providers/UserService2'
import { zUser } from '@/lib/validators/records'

import { zAdminUsersCreateSchema } from '../Users.schema'
import { UsersCreateDefaultValues } from '../Users.utils'

const UsersNew: FC<UsersNewProps> = () => {
    const router = useRouter()

    const { mutate } = useTablePageContext()

    const form = useForm<UsersCreateSchema>({
        resolver: zodResolver(zAdminUsersCreateSchema),
        mode: 'onChange',
        defaultValues: UsersCreateDefaultValues
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const memType = form.watch('memType')

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (!isDirty) {
            toast.warn('No changes')
            return
        }

        if (!isValid) {
            toast.error('Please fix the errors first')
            return
        }

        const { userName, userEmail, firstName, lastName, memType, userPass } = form.getValues()

        const submitResult = await UserService2.getInstance().Create(
            userName,
            userPass,
            userEmail,
            firstName,
            lastName,
            memType
        )

        if (isUser(submitResult)) {
            toast.success('Account created!')
            await mutate()
            await router.navigate({ to: `/admin/users/${submitResult.id}` })
        } else {
            toast.error('An unknown error occured! Please notify your administrators')

            console.error(zUser.safeParse(submitResult).error)
        }
    }

    return (
        <div data-testid='UsersNew'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Create User'
                    actions={[
                        <Button
                            key='UsersNewCreateButton'
                            variant='primary'
                            onClick={(event) => {
                                void submitHandler(event)
                            }}
                            disabled={!isDirty}
                        >
                            Create
                        </Button>
                    ]}
                >
                    <Row>
                        <FormCol className='basis-1/2 px-2' error={errors.firstName}>
                            <label htmlFor='firstName'>First Name</label>
                            <FormControl
                                formKey='firstName'
                                formType='text'
                                placeholder='First Name'
                                aria-label='First Name'
                                className='w-full'
                            />
                        </FormCol>

                        <FormCol className='basis-1/2 px-2' error={errors.lastName}>
                            <label htmlFor='lastName'>Last Name</label>
                            <FormControl
                                formKey='lastName'
                                formType='text'
                                placeholder='Last Name'
                                aria-label='Last Name'
                                className='w-full'
                            />
                        </FormCol>
                    </Row>

                    <Row>
                        <Col className='basis-1/2 px-2'>
                            <Row>
                                <FormCol className='w-full' error={errors.userName}>
                                    <label htmlFor='userName'>Username</label>
                                    <FormControl
                                        formKey='userName'
                                        formType='text'
                                        placeholder='Username'
                                        aria-label='Username'
                                    />
                                </FormCol>
                            </Row>

                            <Row>
                                <FormCol className='w-full' error={errors.userPass}>
                                    <label htmlFor='userPass'>Password</label>
                                    <FormControl
                                        formKey='userPass'
                                        formType='password'
                                        placeholder='Password'
                                        aria-label='Password'
                                    />
                                </FormCol>
                            </Row>

                            <Row>
                                <FormCol className='w-full' error={errors.userEmail}>
                                    <label htmlFor='email'>E-Mail</label>
                                    <FormControl
                                        formKey='userEmail'
                                        formType='email'
                                        placeholder='E-Mail'
                                        aria-label='E-Mail'
                                    />
                                </FormCol>
                            </Row>
                        </Col>

                        <FormCol className='basis-1/2 px-1' error={errors.memType}>
                            <MembershipSelectorCard
                                className={clsx(['spacious'])}
                                onUpdate={(id: number) => {
                                    form.setValue('memType', id, { shouldValidate: true, shouldDirty: true })
                                }}
                                value={memType}
                            />
                        </FormCol>
                    </Row>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default UsersNew
