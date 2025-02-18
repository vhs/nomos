import { useState, type FC } from 'react'

import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { isFormControlDropdownOption, type FormControlDropdownProps } from '../FormControl.types'
import FormControlContainer from '../FormControlContainer/FormControlContainer'

import styles from './FormControlDropdown.module.css'

const FormControlDropdown: FC<FormControlDropdownProps> = ({
    className,
    error,
    formType,
    id,
    infoButton,
    options,
    preContent,
    reset,
    validators,
    ...restProps
}) => {
    const [hasFocus, setHasFocus] = useState(false)

    const form = useFormContext()

    const { onBlur, onChange, ...formProps } = form.register(id)

    return (
        <div data-testid='FormControlDropdown'>
            <FormControlContainer className={className} error={error} hasFocus={hasFocus}>
                <select
                    id={id}
                    className={clsx([styles.Main, 'w-full'])}
                    data-testid='FormControl'
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
                >
                    <option>----</option>
                    {Object.values(options ?? []).map((o) => {
                        const option = isFormControlDropdownOption(o) ? o : { name: String(o), value: String(o) }

                        return (
                            <option key={option.name} value={option.value}>
                                {option.name}
                            </option>
                        )
                    })}
                </select>
            </FormControlContainer>
        </div>
    )
}

export default FormControlDropdown
