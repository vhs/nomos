import { createRoot } from 'react-dom/client'

import AdminPrivilegesEdit from './AdminPrivilegesEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminPrivilegesEdit />)
    root.unmount()
})
