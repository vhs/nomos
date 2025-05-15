import type { CastReactElement, SingleOrArray } from '@/types/utils'

export interface SelectorCardProps extends Omit<CastReactElement<'div'>, 'defaultValue'> {
    id: string
    defaultValue?: SingleOrArray<string | number>
    mode: 'checkbox' | 'radio'
    options: Record<string, string>
    title: string
}
