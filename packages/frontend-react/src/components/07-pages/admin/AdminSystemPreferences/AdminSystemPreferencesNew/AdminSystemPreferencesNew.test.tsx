import { createRoot } from 'react-dom/client'

import AdminSystemPreferencesNew from './AdminSystemPreferencesNew'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminSystemPreferencesNew />)
    root.unmount()
})
