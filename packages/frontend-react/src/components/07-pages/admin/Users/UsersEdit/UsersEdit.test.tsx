import { createRoot } from 'react-dom/client'

import UsersEdit from './UsersEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<UsersEdit />)
    root.unmount()
})
