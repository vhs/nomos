import { useEffect, useState, type FC } from 'react'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import type { ToggleProps } from './Toggle.types'

const Toggle: FC<ToggleProps> = ({ children, checked, disabled, onChange, ...restProps }) => {
    disabled ??= false

    const [isChecked, setChecked] = useState(checked ?? false)

    const toggleChecked = (): void => {
        if (!disabled)
            if (onChange != null && checked != null) onChange(!checked)
            else setChecked(!isChecked)
    }

    useEffect(() => {
        if (onChange != null && !disabled && checked == null) onChange(isChecked)
    }, [checked, disabled, isChecked, onChange])

    useEffect(() => {
        if (checked != null) setChecked(checked)
    }, [checked])

    return (
        <button
            className={clsx(['flex w-full flex-row px-1'])}
            onKeyUp={() => {
                if (!disabled) toggleChecked()
            }}
            onClick={() => {
                if (!disabled) toggleChecked()
            }}
            {...restProps}
        >
            <div className='mr-2 mt-1.5 h-4 w-12 rounded-lg bg-gray-300/50'>
                <CheckCircleIcon
                    className={clsx([
                        'm-auto -mt-1 h-6 w-6',
                        isChecked ? 'ml-6 text-success' : 'ml-0 text-gray-500',
                        disabled ? 'text-gray-300/50' : ''
                    ])}
                />
            </div>

            <div
                className={clsx([
                    'basis-auto text-center align-middle',
                    isChecked ? 'text-success' : '',
                    disabled ? 'italic text-black/50' : ''
                ])}
            >
                {children}
            </div>
        </button>
    )
}

export default Toggle
