import { createRoot } from 'react-dom/client'

import FormRow from './FormRow'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<FormRow />)
    root.unmount()
})
