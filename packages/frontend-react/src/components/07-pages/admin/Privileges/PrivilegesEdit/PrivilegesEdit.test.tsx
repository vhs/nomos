import { createRoot } from 'react-dom/client'

import PrivilegesEdit from './PrivilegesEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<PrivilegesEdit />)
    root.unmount()
})
