import { createRoot } from 'react-dom/client'

import AuthenticatedLayout from './AuthenticatedLayout'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AuthenticatedLayout />)
    root.unmount()
})
