import { createRoot } from 'react-dom/client'

import UsersNew from './UsersNew'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<UsersNew />)
    root.unmount()
})
