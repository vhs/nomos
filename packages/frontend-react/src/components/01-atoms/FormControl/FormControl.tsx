import { useMemo, useState, type FC } from 'react'

import { XMarkIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

import InfoButton from '@/components/02-molecules/InfoButton/InfoButton'

import Conditional from '../Conditional/Conditional'

import styles from './FormControl.module.css'
import { isFormControlSelectOption, type FormControlProps } from './FormControl.types'

const FormControl: FC<FormControlProps> = ({
    className,
    error,
    formType,
    onChange,
    reset,
    infoButton,
    preContent,
    options,
    value,
    ...restProps
}) => {
    error ??= false

    formType ??= 'text'

    const hasPreContent = useMemo(() => preContent != null, [preContent])
    const hasPostContent = useMemo(() => infoButton != null, [infoButton])

    const [hasFocus, setHasFocus] = useState(false)

    if (formType === 'dropdown')
        return (
            <div
                className={clsx([
                    styles.Container,
                    className,
                    error ? styles.Shadow : null,
                    hasFocus ? styles.Focus : null
                ])}
                data-testid='FormControl'
            >
                <select
                    className={clsx([styles.Main, 'w-full'])}
                    data-testid='FormControl'
                    onChange={(event) => {
                        if (onChange != null) onChange(event.target.value)
                    }}
                    onFocus={() => {
                        setHasFocus(true)
                    }}
                    onBlur={() => {
                        setHasFocus(false)
                    }}
                    value={value}
                    {...restProps}
                >
                    {value == null || value === '' ? <option>----</option> : null}
                    {Object.values(options ?? []).map((o) => {
                        const option = isFormControlSelectOption(o) ? o : { name: String(o), value: String(o) }

                        return (
                            <option key={option.name} value={option.value}>
                                {option.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        )

    if (formType === 'textarea')
        return (
            <div
                className={clsx([
                    styles.Container,
                    className,
                    error ? styles.Shadow : null,
                    hasFocus ? styles.Focus : null
                ])}
                data-testid='FormControl'
            >
                <textarea
                    className={clsx([styles.Main, 'w-full'])}
                    data-testid='FormControl'
                    onChange={(event) => {
                        if (onChange != null) onChange(event.target.value)
                    }}
                    onFocus={() => {
                        setHasFocus(true)
                    }}
                    onBlur={() => {
                        setHasFocus(false)
                    }}
                    rows={5}
                    aria-multiline
                    value={value}
                    {...restProps}
                />
            </div>
        )

    if (formType === 'pin')
        return (
            <div
                className={clsx([
                    styles.Container,
                    className,
                    hasPreContent ? styles.WithPreContent : null,
                    hasPostContent ? styles.WithPostContent : null,
                    error ? styles.Shadow : null,
                    hasFocus ? styles.Focus : null
                ])}
                data-testid='FormControl'
            >
                <Conditional condition={hasPreContent}>
                    <span className={styles.PreContent}>{preContent ?? ''}</span>
                </Conditional>
                <input
                    className={clsx([styles.Main, 'w-14'])}
                    type='number'
                    onChange={(event) => {
                        const t = `0000${event.target.value}`

                        console.debug({ onChange: t.slice(-4, t.length) })
                        if (onChange != null) onChange(t.slice(-4, t.length))
                    }}
                    onFocus={() => {
                        setHasFocus(true)
                    }}
                    onBlur={() => {
                        if (value.length < 4 && onChange != null) onChange(value.padStart(4, '0'))
                        setHasFocus(false)
                    }}
                    value={value}
                    max={9999}
                    size={4}
                    maxLength={4}
                    {...restProps}
                />
                <Conditional condition={hasPostContent}>
                    <span className={styles.PostContent}>
                        <InfoButton {...infoButton} />
                    </span>
                </Conditional>
            </div>
        )

    return (
        <div
            className={clsx([
                styles.Container,
                className,
                hasPreContent ? styles.WithPreContent : null,
                hasPostContent ? styles.WithPostContent : null,
                error ? styles.Shadow : null,
                hasFocus ? styles.Focus : null
            ])}
            data-testid='FormControl'
        >
            <Conditional condition={hasPreContent}>
                <span className={styles.PreContent}>{preContent ?? ''}</span>
            </Conditional>
            <input
                className={clsx([styles.Main, 'w-full'])}
                type={formType}
                onChange={(event) => {
                    if (onChange != null) onChange(event.target.value)
                }}
                onFocus={() => {
                    setHasFocus(true)
                }}
                onBlur={() => {
                    setHasFocus(false)
                }}
                value={value}
                {...restProps}
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
        </div>
    )
}

export default FormControl
