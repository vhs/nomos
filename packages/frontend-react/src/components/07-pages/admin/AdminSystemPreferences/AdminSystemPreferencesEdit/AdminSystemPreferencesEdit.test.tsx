import { createRoot } from 'react-dom/client'

import AdminSystemPreferencesEdit from './AdminSystemPreferencesEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminSystemPreferencesEdit />)
    root.unmount()
})
