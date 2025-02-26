import { createRoot } from 'react-dom/client'

import AdminUsersNew from './AdminUsersNew'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminUsersNew />)
    root.unmount()
})
