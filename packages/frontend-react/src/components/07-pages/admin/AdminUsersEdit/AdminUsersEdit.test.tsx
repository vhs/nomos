import { createRoot } from 'react-dom/client'

import AdminUsersEdit from './AdminUsersEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminUsersEdit />)
    root.unmount()
})
