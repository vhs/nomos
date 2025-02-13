import { useState, type FC } from 'react'

import type { NewApiKeyFormProps } from './NewApiKeyForm.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

const NewApiKeyForm: FC<NewApiKeyFormProps> = ({ show, onHide, onCreate }) => {
    show ??= false

    const [note, setNote] = useState('')

    const createHandler = (): void => {
        onCreate(note)
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
            <Row>
                <Col>
                    Notes:
                    <FormControl
                        formType='textarea'
                        onChange={(value) => {
                            setNote(value)
                        }}
                        value={note}
                    />
                </Col>
            </Row>
        </OverlayCard>
    )
}

export default NewApiKeyForm
