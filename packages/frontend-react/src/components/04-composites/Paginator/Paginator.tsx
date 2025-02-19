import { useCallback, useEffect, useMemo, useState, type FC, type ReactNode } from 'react'

// import Conditional from '../Conditional'

import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import ClipLoader from 'react-spinners/ClipLoader'

import type {
    PaginatorDisabledFeatures,
    PaginatorItemProps,
    PaginatorItemsProps,
    PaginatorProps
} from './Paginator.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'

import { generateRangeArray } from '@/lib/util'

import styles from './Paginator.module.css'

const PaginationItem: FC<PaginatorItemProps> = ({ variant, active, children, disabled, onClick }) => {
    active ??= false
    disabled ??= false

    let itemContent: ReactNode = children
    let itemStyle = ''

    switch (variant) {
        case 'first':
            itemContent = <ChevronDoubleLeftIcon className={clsx([styles.Icon])} />
            itemStyle = 'border-r'
            break
        case 'prev':
            itemContent = <ChevronLeftIcon className={clsx([styles.Icon])} />
            itemStyle = 'border-r'
            break
        case 'backward':
            itemContent = <ArrowUturnLeftIcon className={clsx([styles.Icon])} />
            itemStyle = 'border-r'
            break
        case 'forward':
            itemContent = <ArrowUturnRightIcon className={clsx([styles.Icon])} />
            itemStyle = 'border-l'
            break
        case 'next':
            itemContent = <ChevronRightIcon className={clsx([styles.Icon])} />
            itemStyle = 'border-l'
            break
        case 'last':
            itemContent = <ChevronDoubleRightIcon className={clsx([styles.Icon])} />
            itemStyle = 'border-l'
            break
    }

    const onClickHandler = (): void => {
        if (!active && !disabled && onClick != null) onClick()
    }

    return (
        <button
            className={clsx([
                styles.Common,
                'cursor-pointer text-center align-middle',
                !active && !disabled ? styles.Default : '',
                active ? styles.Active : '',
                disabled ? styles.Disabled : '',
                itemStyle
            ])}
            onClick={onClickHandler}
        >
            {itemContent}
        </button>
    )
}

const PaginatorItems: FC<PaginatorItemsProps> = (props) => {
    const { currentPage, pageSelectFn, totalPages } = props

    const baseRange = Math.floor(currentPage / 10) * 10

    const pageRange = generateRangeArray(baseRange, baseRange + 9).filter((e) => e > 0 && e <= totalPages)

    const pagesResult = pageRange.map((page) => {
        return (
            <PaginationItem
                key={`page-${page}`}
                active={page === currentPage}
                onClick={
                    page !== currentPage
                        ? () => {
                              pageSelectFn(page)
                          }
                        : undefined
                }
            >
                {page}
            </PaginationItem>
        )
    })

    return pagesResult
}

const Paginator: FC<PaginatorProps> = ({ currentPage, size, count, pageSelectFn }) => {
    const [page, setPage] = useState(currentPage)

    useEffect(() => {
        setPage(currentPage)
    }, [currentPage])

    const totalPages = useMemo(() => {
        return count != null && count > 0 ? Math.ceil(count / size) : 1
    }, [count, size])

    const handleFirstPage = useCallback((): void => {
        pageSelectFn(1)
    }, [pageSelectFn])

    const handlePreviousPage = useCallback((): void => {
        pageSelectFn(page - 1 > 1 ? page - 1 : 1)
    }, [page, pageSelectFn])

    const handleBackwardPages = useCallback((): void => {
        pageSelectFn(page - 10 > 1 ? page - 10 : 1)
    }, [page, pageSelectFn])

    const handleForwardPages = useCallback((): void => {
        pageSelectFn(page + 10 > totalPages ? totalPages : page + 10)
    }, [page, totalPages, pageSelectFn])

    const handleNextPage = useCallback((): void => {
        pageSelectFn(page + 1 > totalPages ? totalPages : page + 1)
    }, [page, totalPages, pageSelectFn])

    const handleLastPage = useCallback((): void => {
        pageSelectFn(totalPages)
    }, [totalPages, pageSelectFn])

    const disabledFeatures: PaginatorDisabledFeatures = useMemo(
        () => ({
            first: count === 0 || page === 1,
            previous: count === 0 || page === 1,
            backward: count === 0 || page - 10 < 0,
            forward: count === 0 || page + 10 > totalPages,
            next: count === 0 || page === totalPages,
            last: count === 0 || page === totalPages
        }),
        [count, page, totalPages]
    )

    return (
        <Row className={clsx([styles.Container])}>
            <PaginationItem variant='first' disabled={disabledFeatures.first} onClick={handleFirstPage} />
            <PaginationItem variant='prev' disabled={disabledFeatures.previous} onClick={handlePreviousPage} />
            <PaginationItem variant='backward' disabled={disabledFeatures.backward} onClick={handleBackwardPages} />

            <Conditional condition={count != null && count > 0}>
                <PaginatorItems
                    count={count}
                    currentPage={page}
                    size={size}
                    totalPages={totalPages}
                    pageSelectFn={pageSelectFn}
                />
            </Conditional>
            <Conditional condition={count == null}>
                <span className='italic'>No records</span>
            </Conditional>
            <Conditional condition={count == null}>
                <ClipLoader className={clsx([styles.Common])} />
            </Conditional>

            <PaginationItem variant='forward' disabled={disabledFeatures.forward} onClick={handleForwardPages} />
            <PaginationItem variant='next' disabled={disabledFeatures.next} onClick={handleNextPage} />
            <PaginationItem variant='last' disabled={disabledFeatures.last} onClick={handleLastPage} />
        </Row>
    )
}

export default Paginator
