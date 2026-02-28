import { createRoot } from 'react-dom/client'

import SystemPreferences from './SystemPreferences'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<SystemPreferences />)
    root.unmount()
})
