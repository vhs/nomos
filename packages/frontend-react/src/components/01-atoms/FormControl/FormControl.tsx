import { useMemo, useState, type FC } from 'react'

import { XMarkIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

import Conditional from '../Conditional/Conditional'

import { isFormControlSelectOption, type FormControlProps } from './FormControl.types'

const FormControl: FC<FormControlProps> = ({
    className,
    error,
    formType,
    onChange,
    reset,
    preContent,
    options,
    value,
    ...restProps
}) => {
    error ??= false

    formType ??= 'text'

    const hasPreContent = useMemo(() => preContent != null, [preContent])

    const [hasFocus, setHasFocus] = useState(false)

    if (formType === 'dropdown')
        return (
            <div
                className={clsx(['form-control', className, error ? 'shadow-formcontrol' : null])}
                data-testid='FormControl'
            >
                <select
                    className={clsx([
                        'main w-full text-gray-800',
                        hasPreContent ? 'with-pre-content' : null,
                        hasFocus ? 'focus' : null
                    ])}
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
                className={clsx(['form-control', className, error ? 'shadow-formcontrol' : null])}
                data-testid='FormControl'
            >
                <textarea
                    className={clsx([
                        'main w-full text-gray-800',
                        hasPreContent ? 'with-pre-content' : null,
                        hasFocus ? 'focus' : null
                    ])}
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
                    'form-control',
                    className,
                    hasPreContent ? 'with-pre-content' : null,
                    error ? 'shadow-formcontrol' : null
                ])}
                data-testid='FormControl'
            >
                <Conditional condition={hasPreContent}>
                    <span
                        className={clsx(['with-pre-content pre-content', hasPreContent && hasFocus ? 'focus' : null])}
                    >
                        {preContent ?? ''}
                    </span>
                </Conditional>
                <input
                    className={clsx([
                        'main w-full text-gray-800',
                        hasPreContent ? 'with-pre-content' : null,
                        hasFocus ? 'focus' : null
                    ])}
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
                    {...restProps}
                />
            </div>
        )

    return (
        <div
            className={clsx([
                'form-control',
                className,
                hasPreContent ? 'with-pre-content' : null,
                error ? 'shadow-formcontrol' : null
            ])}
            data-testid='FormControl'
        >
            <Conditional condition={hasPreContent}>
                <span className={clsx(['with-pre-content pre-content', hasPreContent && hasFocus ? 'focus' : null])}>
                    {preContent ?? ''}
                </span>
            </Conditional>
            <input
                className={clsx([
                    'main w-full text-gray-800',
                    hasPreContent ? 'with-pre-content' : null,
                    hasFocus ? 'focus' : null
                ])}
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
                <span className='-ml-6 mt-1.5 h-6 w-6 text-gray-500/50'>
                    <XMarkIcon
                        onClick={() => {
                            if (reset != null) reset()
                        }}
                    />
                </span>
            )}
        </div>
    )
}

export default FormControl
