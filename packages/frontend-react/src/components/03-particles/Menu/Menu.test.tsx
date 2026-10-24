import { createRoot } from 'react-dom/client'

import Menu from './Menu'
import { ExampleMenuItems } from './Menu.utils'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<Menu menuItems={ExampleMenuItems} />)
    root.unmount()
})
