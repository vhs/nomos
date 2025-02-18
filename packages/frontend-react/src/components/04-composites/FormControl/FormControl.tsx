import type { FC } from 'react'

import {
    isFormControlDropdownProps,
    isFormControlPinProps,
    isFormControlTextAreaProps,
    type FormControlProps
} from './FormControl.types'
import FormControlDefault from './FormControlDefault/FormControlDefault'
import FormControlDropdown from './FormControlDropdown/FormControlDropdown'
import FormControlPin from './FormControlPin/FormControlPin'
import FormControlTextArea from './FormControlTextArea/FormControlTextArea'

const FormControl: FC<FormControlProps> = (props) => {
    if (props.id == null)
        throw new Error('FormControl requires an id to work with react-hook-form: ' + JSON.stringify(props, null, ''))

    if (props.id === 'user.stripeEmail') {
        console.debug(`FormControl[${props.id}] - props:`, props)
    }

    if (isFormControlDropdownProps(props)) {
        return (
            <div data-testid='FormControl' className='w-full'>
                <FormControlDropdown {...props} />
            </div>
        )
    } else if (isFormControlTextAreaProps(props)) {
        return (
            <div data-testid='FormControl' className='w-full'>
                <FormControlTextArea {...props} />
            </div>
        )
    } else if (isFormControlPinProps(props)) {
        return (
            <div data-testid='FormControl' className='w-full'>
                <FormControlPin {...props} />
            </div>
        )
    } else {
        return (
            <div data-testid='FormControl' className='w-full'>
                <FormControlDefault {...props} />
            </div>
        )
    }
}

export default FormControl
