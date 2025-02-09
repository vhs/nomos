import { createRoot } from 'react-dom/client'

import AdminApiKeys from './AdminApiKeys'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminApiKeys />)
    root.unmount()
})
