import type { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import type { ApiKeysNewModalProps } from './ApiKeyNewModal.types'
import type { ApiKeyForm } from '../ApiKeysPage.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import { zApiKeySchema } from '../ApiKeysPage.schemas'

const ApiKeyNewModal: FC<ApiKeysNewModalProps> = () => {
    // const { scope } = useApiKeysPageContext()

    const form = useForm<ApiKeyForm>({
        resolver: zodResolver(zApiKeySchema),
        mode: 'onChange',
        defaultValues: {
            notes: ''
        }
    })

    const createHandler = (): void => {
        //
    }

    return (
        <div data-testid='ApiKeyNewModal'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Generate API Key'
                    actions={[
                        <Button key='Generate' variant='primary' onClick={createHandler}>
                            Generate
                        </Button>
                    ]}
                >
                    <Row>
                        <Col>
                            Notes:
                            <FormControl formKey='notes' formType='textarea' />
                        </Col>
                    </Row>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default ApiKeyNewModal
