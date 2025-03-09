import { createRoot } from 'react-dom/client'

import CreateUserModal from './CreateUserModal'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<CreateUserModal />)
    root.unmount()
})
