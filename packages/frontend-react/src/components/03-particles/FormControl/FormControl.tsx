import type { FC } from 'react'

import styles from './FormControl.module.css'
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
    if (props.formKey == null)
        throw new Error('FormControl requires an id to work with react-hook-form: ' + JSON.stringify(props, null, ''))

    if (isFormControlDropdownProps(props)) {
        return (
            <div data-testid='FormControl' className={styles.Wrapper}>
                <FormControlDropdown {...props} />
            </div>
        )
    } else if (isFormControlTextAreaProps(props)) {
        return (
            <div data-testid='FormControl' className={styles.Wrapper}>
                <FormControlTextArea {...props} />
            </div>
        )
    } else if (isFormControlPinProps(props)) {
        return (
            <div data-testid='FormControl' className={styles.Wrapper}>
                <FormControlPin {...props} />
            </div>
        )
    } else {
        return (
            <div data-testid='FormControl' className={styles.Wrapper}>
                <FormControlDefault {...props} />
            </div>
        )
    }
}

export default FormControl
