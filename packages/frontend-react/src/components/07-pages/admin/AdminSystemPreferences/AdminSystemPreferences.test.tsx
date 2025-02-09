import { createRoot } from 'react-dom/client'

import AdminSystemPreferences from './AdminSystemPreferences'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminSystemPreferences />)
    root.unmount()
})
