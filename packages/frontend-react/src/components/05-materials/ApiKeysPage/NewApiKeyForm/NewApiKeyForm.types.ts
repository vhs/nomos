import type { ReactNode } from 'react'

export interface NewApiKeyFormProps {
    children?: ReactNode
    show?: boolean
    onHide: () => void
    onCreate: (note: string) => void
}
