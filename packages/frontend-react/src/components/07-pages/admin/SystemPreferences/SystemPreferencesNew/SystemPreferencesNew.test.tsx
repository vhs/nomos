import { createRoot } from 'react-dom/client'

import SystemPreferencesNew from './SystemPreferencesNew'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<SystemPreferencesNew />)
    root.unmount()
})
