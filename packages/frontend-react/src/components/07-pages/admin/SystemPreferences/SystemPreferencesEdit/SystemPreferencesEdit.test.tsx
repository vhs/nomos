import { createRoot } from 'react-dom/client'

import SystemPreferencesEdit from './SystemPreferencesEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<SystemPreferencesEdit />)
    root.unmount()
})
