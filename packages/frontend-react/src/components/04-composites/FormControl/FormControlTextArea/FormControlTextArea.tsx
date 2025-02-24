import { useState, type FC } from 'react'

import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import type { FormControlTextAreaProps } from '../FormControl.types'

import FormControlContainer from '../FormControlContainer/FormControlContainer'

import styles from './FormControlTextArea.module.css'

const FormControlTextArea: FC<FormControlTextAreaProps> = ({
    className,
    error,
    formType,
    id,
    infoButton,
    options,
    preContent,
    reset,
    ...restProps
}) => {
    const [hasFocus, setHasFocus] = useState(false)

    const form = useFormContext()

    const { onBlur, onChange, ...formProps } = form.register(id)

    return (
        <div data-testid='FormControlTextArea'>
            <FormControlContainer className={className} error={error} hasFocus={hasFocus}>
                <textarea
                    className={clsx([styles.Main])}
                    data-testid='textarea'
                    onBlur={(event): void => {
                        setHasFocus(false)
                        void onBlur(event)
                    }}
                    onChange={(event) => {
                        void onChange(event)
                    }}
                    onFocus={() => {
                        setHasFocus(true)
                    }}
                    rows={5}
                    aria-multiline
                    {...restProps}
                    {...formProps}
                />
            </FormControlContainer>
        </div>
    )
}

export default FormControlTextArea
