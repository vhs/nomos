import type { FC, ReactNode } from 'react'

import { createRoot } from 'react-dom/client'

import AuthenticatedLayout from './AuthenticatedLayout'

const TestGuard: FC<{ children: ReactNode }> = ({ children }) => {
    return <>{children}</>
}

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AuthenticatedLayout guardComponent={TestGuard} menuItems={[]} />)
    root.unmount()
})
