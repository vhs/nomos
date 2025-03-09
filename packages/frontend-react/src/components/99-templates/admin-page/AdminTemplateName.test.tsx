import { createRoot } from 'react-dom/client'

import AdminTemplateName from './AdminTemplateName'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminTemplateName />)
    root.unmount()
})
