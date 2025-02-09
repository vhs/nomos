import { createRoot } from 'react-dom/client'

import AdminMembershipsEdit from './AdminMembershipsEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminMembershipsEdit />)
    root.unmount()
})
