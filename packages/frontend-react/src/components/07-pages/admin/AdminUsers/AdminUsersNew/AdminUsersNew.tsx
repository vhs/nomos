import { useMemo, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { AdminUsersNewProps } from './AdminUsersNew.types'
import type { AdminUsersEditForm } from '../AdminUsers.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import MembershipSelectorCard from '@/components/05-materials/MembershipSelectorCard/MembershipSelectorCard'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import UserService2 from '@/lib/providers/UserService2'
import { isUser } from '@/lib/validators/guards'

import { AdminUsersEditSchema } from '../AdminUsers.schema'
import { AdminUsersEditDefaultValues } from '../AdminUsers.utils'

const AdminUsersNew: FC<AdminUsersNewProps> = () => {
    const router = useRouter()

    const { mutate } = useTablePageContext()

    const form = useForm<AdminUsersEditForm>({
        resolver: zodResolver(AdminUsersEditSchema),
        mode: 'onChange',
        defaultValues: AdminUsersEditDefaultValues
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const memType = form.watch('user.memType')

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

        const { userName, userEmail, firstName, lastName, memType } = form.getValues('user')
        const userPass = form.getValues('password.password1')

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
        }
    }

    return (
        <div data-testid='AdminUsersNew'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Create User'
                    actions={[
                        <Button
                            key='AdminUsersNewCreateButton'
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
                    <Row className='spacious'>
                        <FormCol className='basis-1/2 px-2' error={errors.user?.firstName}>
                            <label htmlFor='user.firstName'>First Name</label>
                            <FormControl
                                formKey='user.firstName'
                                formType='text'
                                placeholder='First Name'
                                aria-label='First Name'
                                className='w-full'
                            />
                        </FormCol>

                        <FormCol className='basis-1/2 px-2' error={errors.user?.lastName}>
                            <label htmlFor='user.lastName'>Last Name</label>
                            <FormControl
                                formKey='user.lastName'
                                formType='text'
                                placeholder='Last Name'
                                aria-label='Last Name'
                                className='w-full'
                            />
                        </FormCol>
                    </Row>

                    <Row>
                        <Col className='basis-1/2 px-2'>
                            <Row className='spacious'>
                                <FormCol className='w-full' error={errors.user?.userName}>
                                    <label htmlFor='user.userName'>Username</label>
                                    <FormControl
                                        formKey='user.userName'
                                        formType='text'
                                        placeholder='Username'
                                        aria-label='Username'
                                    />
                                </FormCol>
                            </Row>

                            <Row className='spacious'>
                                <FormCol className='w-full' error={errors.password?.password1}>
                                    <label htmlFor='password.password1'>Password</label>
                                    <FormControl
                                        formKey='password.password1'
                                        formType='password'
                                        placeholder='Password'
                                        aria-label='Password'
                                    />
                                </FormCol>
                            </Row>

                            <Row className='spacious'>
                                <FormCol className='w-full' error={errors.user?.userEmail}>
                                    <label htmlFor='user.email'>E-Mail</label>
                                    <FormControl
                                        formKey='user.userEmail'
                                        formType='email'
                                        placeholder='E-Mail'
                                        aria-label='E-Mail'
                                    />
                                </FormCol>
                            </Row>
                        </Col>

                        <FormCol className='basis-1/2 px-1' error={errors.user?.memType}>
                            <MembershipSelectorCard
                                className={clsx(['spacious'])}
                                onUpdate={(id: number) => {
                                    form.setValue('user.memType', id, { shouldValidate: true, shouldDirty: true })
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

export default AdminUsersNew
