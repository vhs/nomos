import type { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import type { NewApiKeyFormProps, NewApiKeySchemaType } from './NewApiKeyForm.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import { NewApiKeySchema } from './NewApiKeyForm.schema'

const NewApiKeyForm: FC<NewApiKeyFormProps> = ({ show, onHide, onCreate }) => {
    show ??= false

    const form = useForm<NewApiKeySchemaType>({
        resolver: zodResolver(NewApiKeySchema),
        mode: 'onChange',
        defaultValues: {
            newApiKeyNote: ''
        }
    })

    const createHandler = (): void => {
        onCreate(form.getValues('newApiKeyNote'))
        onHide()
    }

    return (
        <OverlayCard
            show={show}
            title='Generate API Key'
            actions={[
                <Button key='Generate' variant='primary' onClick={createHandler}>
                    Generate
                </Button>
            ]}
            onClose={() => {
                if (onHide != null) onHide()
                return false
            }}
        >
            <FormProvider {...form}>
                <Row>
                    <Col>
                        Notes:
                        <FormControl formKey='newApiKeyNote' formType='textarea' />
                    </Col>
                </Row>
            </FormProvider>
        </OverlayCard>
    )
}

export default NewApiKeyForm
