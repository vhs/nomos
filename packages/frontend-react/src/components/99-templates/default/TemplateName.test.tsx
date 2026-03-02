import { createRoot } from 'react-dom/client'

import TemplateName from './TemplateName'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<TemplateName />)
    root.unmount()
})
