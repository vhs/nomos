import { z } from 'zod'

export const zFormControlSelectOption = z.object({ name: z.string(), value: z.string() })
export const zFormControlSelectOptions = zFormControlSelectOption.array()

export type FormControlSelectOption = z.infer<typeof zFormControlSelectOption>
export type FormControlSelectOptions = z.infer<typeof zFormControlSelectOptions>

export const isFormControlSelectOption = (inp: unknown): inp is FormControlSelectOption =>
    zFormControlSelectOption.safeParse(inp).success

export const isFormControlSelectOptions = (inp: unknown): inp is FormControlSelectOptions =>
    zFormControlSelectOptions.safeParse(inp).success

interface FormControlBaseProps {
    error?: boolean
    onChange?: (change: string) => void
    reset?: () => void
    value: string
}

type SharedElementFields = 'ariaPlaceholder' | 'className' | 'disabled' | 'id' | 'name'

type InputElementFields = SharedElementFields | 'placeholder' | 'readOnly' | 'size' | 'maxLength'

type SelectElementFields = SharedElementFields | 'size'

type TextAreaElementFields = SharedElementFields | 'placeholder' | 'readOnly' | 'maxLength'

type TypedFormControlProps<T, E extends keyof T> = Partial<Pick<T, E>>

type HTMLInputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

interface FormControlDefaultProps extends TypedFormControlProps<HTMLInputElement, InputElementFields> {
    formType?: HTMLInputTypes
    options?: never
    preContent?: string | number
}

interface FormControlPinProps extends TypedFormControlProps<HTMLInputElement, InputElementFields> {
    formType: 'pin'
    options?: never
    preContent?: string | number
}

interface FormControlSelectProps extends TypedFormControlProps<HTMLSelectElement, SelectElementFields> {
    formType: 'dropdown'
    options: string[] | FormControlSelectOptions
    preContent?: never
}

interface FormControlTextAreaProps extends TypedFormControlProps<HTMLTextAreaElement, TextAreaElementFields> {
    formType: 'textarea'
    rows?: HTMLTextAreaElement['rows']
    options?: never
    preContent?: never
}

type FormControlVariants =
    | FormControlTextAreaProps
    | FormControlPinProps
    | FormControlSelectProps
    | FormControlDefaultProps

export type FormControlProps = FormControlBaseProps & FormControlVariants
