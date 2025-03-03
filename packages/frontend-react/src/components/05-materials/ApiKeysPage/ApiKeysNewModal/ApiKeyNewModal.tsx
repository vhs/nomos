import { useEffect, useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { ApiKeysNewModalProps } from './ApiKeyNewModal.types'
import type { ApiKeyCreateSchema } from '../ApiKeysPage.types'

import Button from '@/components/01-atoms/Button/Button'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import useAuth from '@/lib/hooks/useAuth'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import { useApiKeysPageContext } from '../ApiKeysPage.context'
import { zApiKeyCreateSchema } from '../ApiKeysPage.schemas'
import { getApiKeyTermByScope } from '../ApiKeysPage.utils'

const ApiKeyNewModal: FC<ApiKeysNewModalProps> = () => {
    const router = useRouter()

    const { scope } = useApiKeysPageContext()

    const { currentUser } = useAuth()

    const form = useForm<ApiKeyCreateSchema>({
        resolver: zodResolver(zApiKeyCreateSchema),
        mode: 'onChange',
        defaultValues: {
            notes: ''
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const createHandler = async (): Promise<void> => {
        if (!isDirty) return

        if (!isValid || currentUser?.id == null) {
            console.log(errors)
            toast.error('Invalid input!')
            return
        }

        const notes = form.getValues('notes')

        await toast
            .promise(
                scope === 'system'
                    ? ApiKeyService2.getInstance().GenerateSystemApiKey(notes)
                    : ApiKeyService2.getInstance().GenerateUserApiKey(currentUser?.id, notes),
                {
                    error: getApiKeyTermByScope('newApiKeyError', scope),
                    pending: getApiKeyTermByScope('newApiKeyPending', scope),
                    success: getApiKeyTermByScope('newApiKeySuccess', scope)
                }
            )
            .then(async () => {
                router.history.back()
                scope === 'system'
                    ? await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
                    : await mutate(`/services/v2/ApiKeyService2.svc/GetUserAPIKeys?userid=${currentUser?.id}`)

                scope === 'system'
                    ? await mutate('/services/v2/VirtualService1.svc/GetScopedKeys?scope=system')
                    : await mutate(`/services/v2/VirtualService1.svc/GetScopedKeys?scope=user&id=${currentUser?.id}`)
            })
    }

    useEffect(() => {
        void form.trigger()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div data-testid='ApiKeyNewModal'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Generate API Key'
                    actions={[
                        <Button
                            key='Generate'
                            variant='primary'
                            onClick={() => {
                                void createHandler()
                            }}
                            disabled={!isDirty || !isValid}
                        >
                            Generate
                        </Button>
                    ]}
                >
                    <Row>
                        <FormCol error={errors.notes != null}>
                            Notes:
                            <FormControl formKey='notes' formType='textarea' />
                        </FormCol>
                    </Row>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default ApiKeyNewModal
