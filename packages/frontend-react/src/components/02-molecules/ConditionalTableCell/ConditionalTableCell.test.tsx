import { createRoot } from 'react-dom/client'

import ConditionalTableCell from './ConditionalTableCell'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<ConditionalTableCell condition={false} />)
    root.unmount()
})
