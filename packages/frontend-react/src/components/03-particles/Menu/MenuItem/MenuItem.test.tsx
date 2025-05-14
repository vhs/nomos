import { createRoot } from 'react-dom/client'

import { ExampleMenuItems } from '../Menu.utils'

import MenuItem from './MenuItem'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<MenuItem {...ExampleMenuItems[0]} />)
    root.unmount()
})
