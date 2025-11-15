import { createRootRouteWithContext } from '@tanstack/react-router'

import NotFoundComponent from '@/components/02-molecules/NotFoundComponent/NotFoundComponent.lazy'
import RootComponent from '@/components/04-composites/RootComponent/RootComponent.lazy'
import type { AuthenticationContextProps } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.types'

interface RouterContext {
    auth?: AuthenticationContextProps
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})
