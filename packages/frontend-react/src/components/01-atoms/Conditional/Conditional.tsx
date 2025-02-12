import type { FC } from 'react'

import type { ConditionalProps } from './Conditional.types'

const Conditional: FC<ConditionalProps> = ({ condition, fallback, children }) => {
    if (!condition) return fallback ?? null

    return <>{children}</>
}

export default Conditional
