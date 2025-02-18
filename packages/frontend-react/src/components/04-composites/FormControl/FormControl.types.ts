import type { ReactNode } from 'react'

import { z } from 'zod'

import type { InfoButtonProps } from '@/components/02-molecules/InfoButton/InfoButton.types'

import type { CastReactElement } from '@/types/utils'

export const zFormControlDropdownOption = z.object({ name: z.string(), value: z.string() })
export const zFormControlDropdownOptions = zFormControlDropdownOption.array()

export const zFormTypeDefaults = z.union([
    z.literal('button'),
    z.literal('checkbox'),
    z.literal('color'),
    z.literal('date'),
    z.literal('datetime-local'),
    z.literal('email'),
    z.literal('file'),
    z.literal('hidden'),
    z.literal('image'),
    z.literal('month'),
    z.literal('number'),
    z.literal('password'),
    z.literal('radio'),
    z.literal('range'),
    z.literal('reset'),
    z.literal('search'),
    z.literal('submit'),
    z.literal('tel'),
    z.literal('text'),
    z.literal('time'),
    z.literal('url'),
    z.literal('week')
])
export const zFormTypeDropdown = z.literal('dropdown')
export const zFormTypePin = z.literal('pin')
export const zFormTypeTextArea = z.literal('textarea')

export const zFormControlDefaultProps = z.object({ formType: zFormTypeDefaults })
export const zFormControlPinProps = z.object({ formType: zFormTypePin })
export const zFormControlDropdownProps = z.object({ formType: zFormTypeDropdown })
export const zFormControlTextAreaProps = z.object({ formType: zFormTypeTextArea })

export type FormControlDropdownOption = z.infer<typeof zFormControlDropdownOption>
export type FormControlDropdownOptions = z.infer<typeof zFormControlDropdownOptions>
export type FormTypeDefaults = z.infer<typeof zFormTypeDefaults>
export type FormTypeDropdown = z.infer<typeof zFormTypeDefaults>
export type FormTypePin = z.infer<typeof zFormTypeDefaults>
export type FormTypeTextArea = z.infer<typeof zFormTypeDefaults>

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

type FormControlExcludeProps = 'id' | 'name' | 'onBlur' | 'onChange'

interface FormControlBaseProps {
    id: string
    error?: boolean
    reset?: () => void
    // onChange?: (change: string) => void
    // value?: string
    validators?: Array<(value: string) => boolean>
}

type BaseInputElementProps = Partial<Omit<CastReactElement<'input'>, FormControlExcludeProps>> & {
    options?: never
    preContent?: ReactNode
    infoButton?: InfoButtonProps
}

export type FormControlDefaultProps = BaseInputElementProps &
    FormControlBaseProps & {
        formType?: HTMLInputTypes
    }

export type FormControlPinProps = BaseInputElementProps &
    FormControlBaseProps & {
        formType: 'pin'
    }

export type FormControlDropdownProps = Partial<Omit<CastReactElement<'select'>, FormControlExcludeProps>> &
    FormControlBaseProps & {
        formType: 'dropdown'
        options: string[] | FormControlDropdownOptions
        preContent?: never
        infoButton?: never
    }

export type FormControlTextAreaProps = Partial<Omit<CastReactElement<'textarea'>, FormControlExcludeProps>> &
    FormControlBaseProps & {
        formType: 'textarea'
        rows?: HTMLTextAreaElement['rows']
        options?: never
        preContent?: never
        infoButton?: never
    }

export type FormControlProps =
    | FormControlTextAreaProps
    | FormControlPinProps
    | FormControlDropdownProps
    | FormControlDefaultProps

export const isFormControlDefaultProps = (inp: unknown): inp is FormControlDefaultProps =>
    zFormControlDefaultProps.safeParse(inp).success
export const isFormControlDropdownOption = (inp: unknown): inp is FormControlDropdownOption =>
    zFormControlDropdownOption.safeParse(inp).success
export const isFormControlDropdownOptions = (inp: unknown): inp is FormControlDropdownOptions =>
    zFormControlDropdownOptions.safeParse(inp).success
export const isFormControlDropdownProps = (inp: unknown): inp is FormControlDropdownProps =>
    zFormControlDropdownProps.safeParse(inp).success
export const isFormControlPinProps = (inp: unknown): inp is FormControlPinProps =>
    zFormControlPinProps.safeParse(inp).success
export const isFormControlTextAreaProps = (inp: unknown): inp is FormControlTextAreaProps =>
    zFormControlTextAreaProps.safeParse(inp).success
