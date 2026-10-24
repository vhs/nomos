import { useMemo, useState, type FC } from 'react'

import { XMarkIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import type { FormControlDefaultProps } from '../FormControl.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import InfoButton from '@/components/05-materials/InfoButton/InfoButton'

import FormControlContainer from '../FormControlContainer/FormControlContainer'

import styles from './FormControlDefault.module.css'

const FormControlDefault: FC<FormControlDefaultProps> = ({
    className,
    error,
    errorMessage,
    formType,
    formKey,
    id,
    infoButton,
    options,
    preContent,
    reset,
    ...restProps
}) => {
    error ??= false

    formType ??= 'text'

    const hasPreContent = useMemo(() => preContent != null, [preContent])
    const hasPostContent = useMemo(() => infoButton != null, [infoButton])

    const [hasFocus, setHasFocus] = useState(false)

    const form = useFormContext()

    const { onBlur, onChange, ...formProps } = form.register(formKey)

    return (
        <div data-testid='FormControlDefault'>
            <FormControlContainer
                className={className}
                hasPreContent={hasPreContent}
                hasPostContent={hasPostContent}
                error={error}
                hasFocus={hasFocus}
            >
                <Conditional condition={hasPreContent}>
                    <span className={styles.PreContent}>{preContent ?? ''}</span>
                </Conditional>
                <input
                    id={id}
                    type={formType}
                    className={clsx([styles.Main])}
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
                    {...restProps}
                    {...formProps}
                />

                {formType !== 'password' && reset != null && (
                    <span className={styles.ResetInset}>
                        <XMarkIcon
                            onClick={() => {
                                if (reset != null) reset()
                            }}
                        />
                    </span>
                )}

                <Conditional condition={hasPostContent}>
                    <span className={styles.PostContent}>
                        <InfoButton {...infoButton} />
                    </span>
                </Conditional>
            </FormControlContainer>
        </div>
    )
}
export default FormControlDefault
