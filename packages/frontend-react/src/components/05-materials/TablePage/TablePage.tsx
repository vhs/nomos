import { useEffect, useMemo, useState, type FC } from 'react'

import useSWR from 'swr'

import type { FiltersState, TablePageContextDefinition, TablePageProps } from './TablePage.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import Loading from '@/components/02-molecules/Loading/Loading'
import Paginator from '@/components/04-composites/Paginator/Paginator'

import { postWithParams } from '@/lib/fetcher'
import useAuth from '@/lib/hooks/useAuth'
import { compileFilter } from '@/lib/nomos'
import { coerceStringArray, coerceStringObject } from '@/lib/util'

import BasePage from '../BasePage/BasePage'
import OverlayCard from '../OverlayCard/OverlayCard'

import { TablePageContext } from './TablePage.context'
import { getEnabledFieldsLabels, getFilterId, getMergedFieldNames, tablePageDefaults } from './TablePage.utils'

const TablePage: FC<TablePageProps> = ({
    title,
    label,
    serviceEndpoint,
    baseServiceMethod,
    user,
    fields,
    order,
    component,
    filters,
    secondaryFilters,
    actions,
    unsafeSearchColumns,
    children
}) => {
    user ??= false
    order ??= []
    filters ??= []
    unsafeSearchColumns ??= []

    const userPrefix = (user ?? false) ? 'User' : ''

    const { currentUser } = useAuth()

    const fieldLabels = useMemo(() => fields.filter((f) => !(f.hidden ?? false)).map((f) => f.title), [fields])

    const Component = useMemo(() => component, [component])

    const [searchPage, setPage] = useState(tablePageDefaults.searchPage)
    const [searchPageSize, setPageSize] = useState(tablePageDefaults.searchPageSize)
    const [searchOrder, setSearchOrder] = useState(coerceStringArray(order).join(', '))
    const [searchOrderInput, setSearchOrderInput] = useState(coerceStringArray(order).join(', '))
    const [searchColumns, setSearchColumns] = useState(
        fields.map((f) => (Array.isArray(f.field) ? f.field.join(',') : f.field)).join(',')
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryInput, setSearchQueryInput] = useState('')
    const [primaryFilterStates, dispatchPrimaryFilter] = useState(
        (filters ?? []).reduce<FiltersState>((c, filter) => ({ ...c, [getFilterId(filter)]: false }), {})
    )
    const [secondaryFilterStates, dispatchSecondaryFilter] = useState(
        (secondaryFilters ?? []).reduce<FiltersState>((c, filter) => ({ ...c, [getFilterId(filter)]: false }), {})
    )
    const [fieldStates, dispatchField] = useState(
        fields
            .filter((f) => !(f.hidden ?? false))
            .map((f) => f.title)
            .reduce<Record<string, boolean>>((c, field) => ({ ...c, [field]: true }), {})
    )

    useEffect(() => {
        setSearchColumns(
            fields
                .map((f) => {
                    const fieldTitle = f.title

                    if (fieldStates[fieldTitle]) {
                        const field = fields.find((f) => f.title === fieldTitle)

                        if (field != null) return Array.isArray(field.field) ? field.field.join(',') : field.field
                    }

                    return null
                })
                .filter((f) => f != null)
                .join(',')
        )
    }, [fieldLabels, fieldStates, fields])

    const compiledSearchFilters = useMemo(() => {
        const secondarySearchFilters = (secondaryFilters ?? [])
            .filter((filter) => secondaryFilterStates[getFilterId(filter)])
            .map((filter) => filter.filter)

        const compiledSecondarySearchFilter = compileFilter({
            filters: secondarySearchFilters,
            fields: getMergedFieldNames(fields, unsafeSearchColumns),
            defaultOperator: 'or'
        })

        const searchFilters = (filters ?? [])
            .filter((filter) => primaryFilterStates[getFilterId(filter)])
            .map((filter) => filter.filter)
            .filter((e) => Object.keys(e).length > 0)

        if (compiledSecondarySearchFilter != null && Object.keys(compiledSecondarySearchFilter).length > 0)
            searchFilters.push(compiledSecondarySearchFilter)

        if (searchFilters.length === 0 && searchQuery === '') return null

        const compiledFilter = compileFilter({
            filters: searchFilters,
            fields: getMergedFieldNames(fields, unsafeSearchColumns),
            search: searchQuery
        })

        return compiledFilter
    }, [
        fields,
        filters,
        primaryFilterStates,
        searchQuery,
        secondaryFilterStates,
        secondaryFilters,
        unsafeSearchColumns
    ])

    const [countUrl, countUrlReal, countUrlParams] = useMemo<[string, string, Record<string, unknown>] | []>(() => {
        if ((user ?? false) && currentUser?.id == null) return []

        const baseUrl = `/services/v2/${serviceEndpoint}.svc/Count${userPrefix}${baseServiceMethod}`

        const searchParams: Record<string, unknown> = {}

        searchParams.filters = compiledSearchFilters

        if (user ?? false) searchParams.userid = currentUser?.id

        return [`${baseUrl}?${new URLSearchParams(coerceStringObject(searchParams)).toString()}`, baseUrl, searchParams]
    }, [user, currentUser?.id, serviceEndpoint, userPrefix, baseServiceMethod, compiledSearchFilters])

    const [listUrl, listUrlReal, listUrlParams] = useMemo<[string, string, Record<string, unknown>] | []>(() => {
        if ((user ?? false) && currentUser?.id == null) return []

        const baseUrl = `/services/v2/${serviceEndpoint}.svc/List${userPrefix}${baseServiceMethod}`

        const searchParams: Record<string, unknown> = {}

        if (user ?? false) searchParams.userid = currentUser?.id

        searchParams.page = searchPage - 1
        searchParams.size = searchPageSize
        searchParams.columns = `id,${searchColumns}`
        searchParams.order = searchOrder

        searchParams.filters = compiledSearchFilters

        if (user ?? false) searchParams.userid = currentUser?.id

        return [`${baseUrl}?${new URLSearchParams(coerceStringObject(searchParams)).toString()}`, baseUrl, searchParams]
    }, [
        user,
        currentUser?.id,
        serviceEndpoint,
        userPrefix,
        baseServiceMethod,
        searchPage,
        searchPageSize,
        searchColumns,
        searchOrder,
        compiledSearchFilters
    ])

    const downloadParams = useMemo(
        () =>
            new URLSearchParams(
                coerceStringObject({
                    userid: currentUser?.id,
                    page: searchPage,
                    size: searchPageSize,
                    columns: searchColumns,
                    order: searchOrder,
                    filters: compiledSearchFilters ?? null
                })
            ).toString(),
        [currentUser, searchPage, searchPageSize, searchColumns, searchOrder, compiledSearchFilters]
    )

    const { data: itemCount, isLoading: isCountLoading } = useSWR<number>(
        countUrl != null && countUrlReal != null && countUrlParams != null ? countUrl : null,
        async (_url: string) => {
            if (countUrl == null || countUrlReal == null || countUrlParams == null) throw new Error('Missing args')

            const result = await postWithParams<number>(countUrlReal, countUrlParams)

            return result
        }
    )
    const {
        data,
        isLoading: isListLoading,
        mutate
    } = useSWR<Array<Parameters<typeof Component>[0]['data']>>(
        listUrl != null && listUrlReal != null && listUrlParams != null ? listUrl : null,
        async (_url: string) => {
            if (listUrl == null || listUrlReal == null || listUrlParams == null) throw new Error('Missing args')

            const result = await postWithParams<Array<Parameters<typeof Component>[0]['data']>>(
                listUrlReal,
                listUrlParams
            )

            return result
        },
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            refreshWhenHidden: true
        }
    )

    const updating = useMemo(
        () =>
            countUrl == null ||
            listUrl == null ||
            isCountLoading ||
            isListLoading ||
            currentUser == null ||
            itemCount == null ||
            data == null,
        [countUrl, listUrl, isCountLoading, isListLoading, currentUser, itemCount, data]
    )

    const totalPages = useMemo(() => {
        return itemCount != null && itemCount > 0 ? Math.ceil(itemCount / searchPageSize) : 1
    }, [itemCount, searchPageSize])

    const resetSearch = (): void => {
        setSearchQuery('')
        setSearchQueryInput('')
        setSearchOrder(coerceStringArray(order).join(', '))
        setSearchOrderInput(coerceStringArray(order).join(', '))
        dispatchPrimaryFilter((prevState) => {
            const updateState = structuredClone(prevState)

            Object.keys(updateState).forEach((k) => (updateState[k] = false))

            return updateState
        })
        dispatchSecondaryFilter((prevState) => {
            const updateState = structuredClone(prevState)

            Object.keys(updateState).forEach((k) => (updateState[k] = false))

            return updateState
        })
        setPage(tablePageDefaults.searchPage)
        setPageSize(tablePageDefaults.searchPageSize)
    }

    const updateSearch = (): void => {
        if (searchOrder !== searchOrderInput) setSearchOrder(searchOrderInput.replace(/,$/, ''))
        if (searchQuery !== searchQueryInput) setSearchQuery(searchQueryInput)
    }

    const toggleField = (fieldName: string): void => {
        dispatchField((prevState) => {
            const updateState = structuredClone(prevState)

            updateState[fieldName] = !updateState[fieldName]

            return updateState
        })
    }

    const contextValue: TablePageContextDefinition = useMemo(() => ({ mutate }), [mutate])

    if (data != null && !Array.isArray(data))
        return (
            <OverlayCard title='Unexpected data error'>
                We encountered an unexpected error processing the data.
                <br />
                Please contact your administrator or create a ticket.
                <br />
                Thanks!
            </OverlayCard>
        )

    return (
        <div data-testid='TablePage'>
            <TablePageContext.Provider value={contextValue}>
                <BasePage title={title} actions={actions}>
                    <Row className='flex-wrap'>
                        <Col className='basis-full lg:basis-1/2'>
                            <strong>Colums</strong>
                            <br />
                            {Object.entries(fieldStates).map(([fieldName, fieldChecked]) => {
                                return (
                                    <Button
                                        key={fieldName}
                                        className='btn-sm m-1'
                                        variant={fieldChecked ? 'success' : 'secondary'}
                                        onClick={() => {
                                            toggleField(fieldName)
                                        }}
                                    >
                                        {fieldName}
                                    </Button>
                                )
                            })}
                        </Col>

                        <Col className='basis-full lg:basis-1/2'>
                            <strong>Order</strong>
                            <br />
                            <FormControl
                                formType='text'
                                value={searchOrderInput}
                                onChange={(value) => {
                                    setSearchOrderInput(value)
                                }}
                            />
                        </Col>

                        <Col className='basis-full lg:basis-1/2'>
                            <strong>Search</strong>
                            <br />
                            <FormControl
                                formType='text'
                                value={searchQueryInput}
                                onChange={(value) => {
                                    setSearchQueryInput(value)
                                }}
                                reset={resetSearch}
                            />
                        </Col>

                        <Conditional condition={Array.isArray(filters)}>
                            <Col className='basis-full lg:basis-1/2'>
                                <strong>Quick Filters</strong>
                                <br />
                                <Row className='flex-wrap'>
                                    {filters?.map((filter) => {
                                        const filterId = getFilterId(filter)

                                        return (
                                            <Col key={filterId} className='basis-1/4'>
                                                <Toggle
                                                    checked={primaryFilterStates[filterId]}
                                                    onChange={(val) => {
                                                        dispatchPrimaryFilter((prevState) => {
                                                            const updateState = structuredClone(prevState)

                                                            updateState[filterId] = val

                                                            return updateState
                                                        })
                                                    }}
                                                >
                                                    {filter.label}
                                                </Toggle>
                                            </Col>
                                        )
                                    })}
                                    {secondaryFilters?.map((filter) => {
                                        const filterId = getFilterId(filter)

                                        return (
                                            <Col key={filterId} className='basis-1/4'>
                                                <Toggle
                                                    checked={secondaryFilterStates[filterId]}
                                                    onChange={(val) => {
                                                        dispatchSecondaryFilter((prevState) => {
                                                            const updateState = structuredClone(prevState)

                                                            updateState[filterId] = val

                                                            return updateState
                                                        })
                                                    }}
                                                >
                                                    {filter.label}
                                                </Toggle>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                        </Conditional>
                    </Row>

                    <Row>
                        <Col className='basis-full'>
                            <div className='grid w-full grid-flow-row justify-items-end'>
                                <div className='flex flex-row'>
                                    <Button className='mx-2' onClick={updateSearch}>
                                        Search
                                    </Button>
                                    <Button className='mx-2' variant='danger' onClick={resetSearch}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className='spacious'>
                        <Col className='basis-9/12'>
                            <Paginator
                                count={itemCount}
                                currentPage={searchPage}
                                size={searchPageSize}
                                pageSelectFn={(newPage) => {
                                    setPage(newPage)
                                }}
                            />
                        </Col>

                        <Col className='basis-2/12'>
                            <div className='text-center'>
                                {itemCount} {label}s found
                            </div>
                        </Col>

                        <Col className='basis-1/12'>
                            <select
                                id='allow-page-sizes-select'
                                className='rounded-sm border-2 border-black'
                                onChange={(event) => {
                                    const requestedPageSize = Number(event.target.value)

                                    const newPage = Math.ceil(
                                        (searchPage / totalPages) * Math.ceil((itemCount ?? 1) / requestedPageSize)
                                    )

                                    setPage(newPage)
                                    setPageSize(requestedPageSize)
                                }}
                                value={searchPageSize}
                            >
                                {tablePageDefaults.allowedPageSizes.map((e) => (
                                    <option key={e.toLocaleString()} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </Col>
                    </Row>

                    <Conditional condition={updating}>
                        <Loading />
                    </Conditional>

                    <Conditional condition={!updating}>
                        <Conditional condition={data?.length === 0}>
                            <Row className='spacious'>
                                <Col>No {label}s</Col>
                            </Row>
                        </Conditional>

                        <Conditional condition={(data?.length ?? 0) > 0}>
                            <Row className='spacious'>
                                <Col className='w-full'>
                                    <table className='w-full table-auto overflow-x-scroll rounded-lg'>
                                        <thead>
                                            <tr>
                                                {getEnabledFieldsLabels(fieldStates).map((fieldLabel) => (
                                                    <th key={fieldLabel} className='tablepage-header-field px-1'>
                                                        <Popover
                                                            className='tablepage-header'
                                                            content={fieldLabel}
                                                            popover={fieldLabel}
                                                        />
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tfoot>
                                            <tr>
                                                {getEnabledFieldsLabels(fieldStates).map((fieldLabel) => (
                                                    <th key={fieldLabel} className='tablepage-header-field px-1'>
                                                        <Popover
                                                            className='tablepage-header'
                                                            content={fieldLabel}
                                                            popover={fieldLabel}
                                                        />
                                                    </th>
                                                ))}
                                            </tr>
                                        </tfoot>

                                        <tbody>
                                            {(data ?? []).map((d) => {
                                                // @ts-expect-error missing
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                return <Component key={d.id} data={d} mutate={mutate} />
                                            })}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <a
                                        href={`${listUrl?.toString()}?${downloadParams}`}
                                        download={`VHS-${currentUser?.fname}-${currentUser?.lname}-${label}.json`}
                                    >
                                        Download Current View
                                    </a>
                                </Col>
                            </Row>
                        </Conditional>
                    </Conditional>
                    {children}
                </BasePage>
            </TablePageContext.Provider>
        </div>
    )
}

export default TablePage
