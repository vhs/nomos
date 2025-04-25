import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

import type { OAuthPageContainerProps } from './OAuthPageContainer.types'
import type { OAuthPageActiveView } from '../OAuthPage.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'

import BasePage from '../../BasePage/BasePage'
import { OAuthPageContext } from '../OAuthPage.context'
import { OAuthMenu } from '../OAuthPage.settings'
import { getOAuthTermByScope, getOAuthViewPath } from '../OAuthPage.utils'
import OAuthPageEditClientModal from '../OAuthPageEditClientModal/OAuthPageEditClientModal'
import OAuthPageNewClientButton from '../OAuthPageNewClientButton/OAuthPageNewClientButton'
import OAuthPageNewClientModal from '../OAuthPageNewClientModal/OAuthPageNewClientModal'

const OAuthPageContainer: FC<OAuthPageContainerProps> = ({
    activeView,
    basePath,
    createModal,
    editModal,
    children,
    contextValue,
    appClientId,
    scope
}) => {
    scope ??= 'user'

    return (
        <div data-testid='OAuthPageContainer'>
            <OAuthPageContext.Provider value={contextValue}>
                <BasePage
                    title={getOAuthTermByScope('title', scope)}
                    actions={[<OAuthPageNewClientButton key='OAuthCreateNewButton' basePath={basePath} />]}
                >
                    <div className='grid w-fit grid-flow-col-dense gap-2 ps-3'>
                        {Object.keys(OAuthMenu).map((k) => {
                            const menuKey = k as OAuthPageActiveView

                            return (
                                <button
                                    key={menuKey}
                                    className={clsx([
                                        'relative -bottom-0.5 z-auto inline-grid w-fit rounded-t-md border-2 border-gray-500/25 border-b-gray-500/50 bg-white px-2',
                                        activeView === k
                                            ? 'border-gray-500/75 border-b-transparent bg-header text-black'
                                            : null
                                    ])}
                                >
                                    <Link to={getOAuthViewPath(basePath, menuKey)}>{OAuthMenu[menuKey]}</Link>
                                </button>
                            )
                        })}
                    </div>

                    <div className='max-w-full rounded-lg border-2 border-gray-500/50 p-2 md:max-w-[99%] xl:max-w-full'>
                        {children}
                    </div>

                    <Conditional condition={createModal}>
                        <OAuthPageNewClientModal />
                    </Conditional>

                    <Conditional condition={editModal}>
                        {appClientId != null ? <OAuthPageEditClientModal appClientId={appClientId} /> : null}
                    </Conditional>
                </BasePage>
            </OAuthPageContext.Provider>
        </div>
    )
}

export default OAuthPageContainer
