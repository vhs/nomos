import { useMemo, useState, type FC } from 'react'

import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import type { FormControlPinProps } from '../FormControl.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import InfoButton from '@/components/02-molecules/InfoButton/InfoButton'

import FormControlContainer from '../FormControlContainer/FormControlContainer'

import styles from './FormControlPin.module.css'

const FormControlPin: FC<FormControlPinProps> = ({
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
    const hasPreContent = useMemo(() => preContent != null, [preContent])
    const hasPostContent = useMemo(() => infoButton != null, [infoButton])

    const [hasFocus, setHasFocus] = useState(false)

    const form = useFormContext()

    const { onBlur, onChange, ...formProps } = form.register(id)

    return (
        <div data-testid='FormControlPin'>
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
                    className={clsx([styles.Main, 'w-14'])}
                    type='number'
                    onBlur={(event) => {
                        if (event.target.value.length < 4)
                            void onBlur({ target: { value: event.target.value.padStart(4, '0') } })
                        setHasFocus(false)
                    }}
                    onChange={(event) => {
                        const t = `0000${event.target.value}`

                        void onChange({ target: { value: t.slice(-4, t.length) } })
                    }}
                    onFocus={() => {
                        setHasFocus(true)
                    }}
                    max={9999}
                    size={4}
                    maxLength={4}
                    {...restProps}
                    {...formProps}
                />
                <Conditional condition={hasPostContent}>
                    <span className={styles.PostContent}>
                        <InfoButton {...infoButton} />
                    </span>
                </Conditional>
            </FormControlContainer>
        </div>
    )
}
export default FormControlPin
