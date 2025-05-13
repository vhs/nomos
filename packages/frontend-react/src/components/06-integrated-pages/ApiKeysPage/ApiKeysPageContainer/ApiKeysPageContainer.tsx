import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

import type { ApiKeysPageContainerProps } from './ApiKeysPageContainer.types'
import type { ApiKeysActiveView } from '../ApiKeysPage.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'

import BasePage from '../../BasePage/BasePage'
import ApiKeysCreateNewButton from '../ApiKeysCreateNewButton/ApiKeysCreateNewButton'
import ApiKeysEditModal from '../ApiKeysEditModal/ApiKeysEditModal'
import ApiKeysNewModal from '../ApiKeysNewModal/ApiKeysNewModal'
import { ApiKeysPageContext } from '../ApiKeysPage.context'
import { ApiKeysMenu } from '../ApiKeysPage.settings'
import { getApiKeysViewPath, getApiKeysTermByScope } from '../ApiKeysPage.utils'

const ApiKeysPageContainer: FC<ApiKeysPageContainerProps> = ({
    activeView,
    basePath,
    createModal,
    editModal,
    children,
    contextValue,
    keyId,
    scope
}) => {
    scope ??= 'user'

    return (
        <div data-testid='ApiKeysPageContainer'>
            <ApiKeysPageContext.Provider value={contextValue}>
                <BasePage
                    title={getApiKeysTermByScope('title', scope)}
                    actions={[<ApiKeysCreateNewButton key='ApiKeysCreateNewButton' basePath={basePath} />]}
                >
                    <div className='grid w-fit grid-flow-col-dense gap-2 ps-3'>
                        {Object.keys(ApiKeysMenu).map((k) => {
                            const menuKey = k as ApiKeysActiveView

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
                                    <Link to={getApiKeysViewPath(basePath, menuKey)}>{ApiKeysMenu[menuKey]}</Link>
                                </button>
                            )
                        })}
                    </div>

                    <div className='max-w-full rounded-lg border-2 border-gray-500/50 md:max-w-[99%] xl:max-w-full'>
                        {children}
                    </div>

                    <Conditional condition={createModal}>
                        <ApiKeysNewModal />
                    </Conditional>

                    <Conditional condition={editModal}>
                        {keyId != null ? <ApiKeysEditModal keyId={keyId} /> : null}
                    </Conditional>
                </BasePage>
            </ApiKeysPageContext.Provider>
        </div>
    )
}
export default ApiKeysPageContainer
