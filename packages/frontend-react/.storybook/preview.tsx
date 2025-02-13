import React from 'react'

import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from '@tanstack/react-router'
import { initialize, mswLoader } from 'msw-storybook-addon'

import type { Preview } from '@storybook/react'

import '../src/main.css'

initialize({
    serviceWorker: { url: '/apiMockServiceWorker.js' }
})

const preview: Preview = {
    loaders: [mswLoader],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    },
    decorators: [
        (Story) => {
            return (
                <RouterProvider
                    router={createRouter({
                        history: createMemoryHistory(),
                        routeTree: createRootRoute({
                            component: Story
                        })
                    })}
                />
            )
        }
    ]
}

export default preview
