import { useCallback, useEffect, useMemo, useState, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Outlet } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import type { TablePageContextDefinition, TablePageProps } from './TablePage.types'
import type { z } from 'zod'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import Loading from '@/components/02-molecules/Loading/Loading'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import Paginator from '@/components/04-composites/Paginator/Paginator'
import BasePage from '@/components/06-integrated-pages/BasePage/BasePage'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import type { Filter, Filters } from '@/lib/db/utils/query-filters'
import { postWithParams } from '@/lib/fetcher'
import useAuth from '@/lib/hooks/useAuth'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import { compileFilter } from '@/lib/nomos'
import {
    coerceStringArray,
    coerceStringObject,
    convertFilterArrayToBooleanRecord,
    convertStringArrayToBooleanRecord
} from '@/lib/utils'

import type { DataRecord } from '@/types/validators/records'

import { TablePageContext } from './TablePage.context'
import { isTablePageSchemaType, zTablePageSchema, type AllowedPageSizes } from './TablePage.schema'
import { compileActiveFilters, getEnabledFieldsLabels, getMergedFieldNames, tablePageDefaults } from './TablePage.utils'

const TablePage: FC<TablePageProps> = ({
    actions,
    baseServiceMethod,
    children,
    component,
    defaultFilters,
    embedded,
    fields,
    label,
    order,
    primaryFilters,
    schema,
    secondaryFilters,
    serviceEndpoint,
    title,
    unsafeSearchColumns,
    user
}) => {
    user ??= false
    order ??= []
    unsafeSearchColumns ??= []
    schema ??= zTablePageSchema
    embedded ??= false
    defaultFilters ??= []

    if (!isTablePageSchemaType(schema)) throw new Error('Invalid schema')

    const userPrefix = (user ?? false) ? 'User' : ''

    const { currentUser } = useAuth()

    const fieldLabels = useMemo(() => fields.filter((f) => !(f.hidden ?? false)).map((f) => f.title), [fields])

    const Component = useMemo(() => component, [component])

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            search: {
                columns: fields.map((f) => (Array.isArray(f.field) ? f.field.join(',') : f.field)).join(','),
                order: coerceStringArray(order).join(', '),
                orderInput: coerceStringArray(order).join(', '),
                page: tablePageDefaults.searchPage,
                pageSize: tablePageDefaults.searchPageSize,
                query: '',
                queryInput: ''
            }
        }
    })

    const { state: fieldStates, dispatch: dispatchFieldState } = useToggleReducer(
        convertStringArrayToBooleanRecord(fieldLabels, true)
    )
    const { state: primaryFilterStates, dispatch: dispatchPrimaryFilterState } = useToggleReducer(
        convertFilterArrayToBooleanRecord(primaryFilters, false)
    )
    const { state: secondaryFilterStates, dispatch: dispatchSecondaryFilterState } = useToggleReducer(
        convertFilterArrayToBooleanRecord(secondaryFilters, false)
    )

    const searchColumns = form.watch('search.columns')
    const searchOrder = form.watch('search.order')
    const searchOrderInput = form.watch('search.orderInput')
    const searchPage = form.watch('search.page')
    const searchPageSize = form.watch('search.pageSize')
    const searchQuery = form.watch('search.query')
    const searchQueryInput = form.watch('search.queryInput')

    useEffect(() => {
        const searchColumnsUpdate = fields
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

        form.setValue('search.columns', searchColumnsUpdate)
    }, [fieldStates, fields, form])

    const mergedFieldNames = useMemo(() => {
        return getMergedFieldNames(fields, unsafeSearchColumns)
    }, [fields, unsafeSearchColumns])

    const getActiveSecondarySearchFilters = useCallback(() => {
        return compileActiveFilters(secondaryFilters ?? [], secondaryFilterStates)
    }, [secondaryFilterStates, secondaryFilters])

    const getCompiledSecondarySearchFilter = useCallback(
        (secondarySearchFilters: Filters) => {
            return compileFilter({
                filters: secondarySearchFilters,
                fields: mergedFieldNames,
                defaultOperator: 'or'
            })
        },
        [mergedFieldNames]
    )

    const getActivePrimarySearchFilters = useCallback(() => {
        return compileActiveFilters(primaryFilters ?? [], primaryFilterStates)
    }, [primaryFilterStates, primaryFilters])

    const getCompiledSearchFilter = useCallback(
        (searchFilters: Filters) => {
            return compileFilter({
                filters: searchFilters,
                fields: mergedFieldNames,
                search: form.getValues('search.query')
            })
        },
        [form, mergedFieldNames]
    )

    const defaultSearchFilters = useMemo(() => {
        return defaultFilters
    }, [defaultFilters])

    const [compiledSearchFilters, setCompiledSearchFilters] = useState<Filter | null>(null)

    useEffect(() => {
        const secondarySearchFilters = getActiveSecondarySearchFilters()

        const compiledSecondarySearchFilter = getCompiledSecondarySearchFilter(secondarySearchFilters)

        const primarySearchFilters = getActivePrimarySearchFilters()

        const searchFilters = [...defaultSearchFilters, ...primarySearchFilters]

        if (compiledSecondarySearchFilter != null && Object.keys(compiledSecondarySearchFilter).length > 0)
            searchFilters.push(compiledSecondarySearchFilter)

        const formSearchQuery = form.getValues('search.query')

        if (searchFilters.length === 0 && formSearchQuery === '') {
            setCompiledSearchFilters(null)
        } else {
            const compiledFilter = getCompiledSearchFilter(searchFilters)

            if (JSON.stringify(compiledFilter) !== JSON.stringify(compiledSearchFilters)) {
                setCompiledSearchFilters(compiledFilter)
            }
        }
    }, [
        compiledSearchFilters,
        defaultSearchFilters,
        form,
        getActivePrimarySearchFilters,
        getActiveSecondarySearchFilters,
        getCompiledSearchFilter,
        getCompiledSecondarySearchFilter,
        searchQuery
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
        [currentUser?.id, searchPage, searchPageSize, searchColumns, searchOrder, compiledSearchFilters]
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
    } = useSWR<DataRecord[]>(
        listUrl != null && listUrlReal != null && listUrlParams != null ? listUrl : null,
        async (_url: string) => {
            if (listUrl == null || listUrlReal == null || listUrlParams == null) throw new Error('Missing args')

            return await postWithParams<DataRecord[]>(listUrlReal, listUrlParams)
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
        form.reset()
        dispatchFieldState({ action: 'set-all' })
        dispatchPrimaryFilterState({ action: 'unset-all' })
        dispatchSecondaryFilterState({ action: 'unset-all' })
    }

    const updateSearch = (): void => {
        if (searchOrder !== searchOrderInput) form.setValue('search.order', searchOrderInput.replace(/,$/, ''))

        if (searchQuery !== searchQueryInput) form.setValue('search.query', searchQueryInput)
    }

    const toggleField = (fieldName: string): void => {
        const fieldValue = fieldStates[fieldName]

        if (typeof fieldValue !== 'boolean') throw new Error(`Invalid field: ${fieldName}`)

        dispatchFieldState({ action: 'toggle', value: fieldName })
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
                <BasePage title={title} actions={actions} embedded={embedded}>
                    <FormProvider {...form}>
                        <Row>
                            <Col className='basis-full lg:basis-1/2'>
                                <strong>Colums</strong>
                                <br />
                                <div className='inline-flex flex-wrap gap-2'>
                                    {Object.keys(fieldStates).map((fieldName) => {
                                        return (
                                            <Button
                                                key={fieldName}
                                                small={embedded}
                                                variant={fieldStates[fieldName] ? 'success' : 'secondary'}
                                                onClick={() => {
                                                    toggleField(fieldName)
                                                }}
                                            >
                                                {fieldName}
                                            </Button>
                                        )
                                    })}
                                </div>
                            </Col>

                            <Col className='basis-full lg:basis-1/2'>
                                <strong>Order</strong>
                                <br />
                                <FormControl formKey='search.orderInput' formType='text' />
                            </Col>

                            <Col className='basis-full lg:basis-1/2'>
                                <strong>Search</strong>
                                <br />
                                <FormControl formKey='search.queryInput' formType='text' reset={resetSearch} />
                            </Col>

                            <Conditional condition={Array.isArray(primaryFilters)}>
                                <Col className='basis-full lg:basis-1/2'>
                                    <strong>Quick Filters</strong>
                                    <br />
                                    <Row>
                                        {primaryFilters?.map((filter) => {
                                            return (
                                                <Col key={filter.id} className='basis-1/4'>
                                                    <Toggle
                                                        checked={primaryFilterStates[filter.id]}
                                                        onChange={(val) => {
                                                            dispatchPrimaryFilterState({
                                                                action: val ? 'set' : 'unset',
                                                                value: filter.id
                                                            })
                                                        }}
                                                    >
                                                        {filter.label}
                                                    </Toggle>
                                                </Col>
                                            )
                                        })}
                                        {secondaryFilters?.map((filter) => {
                                            return (
                                                <Col key={filter.id} className='basis-1/4'>
                                                    <Toggle
                                                        checked={secondaryFilterStates[filter.id]}
                                                        onChange={(val) => {
                                                            dispatchSecondaryFilterState({
                                                                action: val ? 'set' : 'unset',
                                                                value: filter.id
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
                                        <Button className='mx-2' small={embedded} onClick={updateSearch}>
                                            Search
                                        </Button>
                                        <Button
                                            className='mx-2'
                                            small={embedded}
                                            variant='danger'
                                            onClick={resetSearch}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className={'basis-full md:basis-4/6'}>
                                <Paginator
                                    count={itemCount}
                                    currentPage={searchPage}
                                    size={searchPageSize}
                                    pageSelectFn={(newPage) => {
                                        form.setValue('search.page', newPage)
                                    }}
                                />
                            </Col>

                            <Col className={clsx('basis-1/2 md:basis-1/6')}>
                                <div className='my-4 text-center'>
                                    {itemCount} {label}s found
                                </div>
                            </Col>

                            <Col className={clsx('basis-1/2 md:basis-1/6')}>
                                <select
                                    id='allow-page-sizes-select'
                                    className='pull-right my-4 rounded-sm border-2 border-black'
                                    onChange={(event) => {
                                        const requestedPageSize = Number(event.target.value) as AllowedPageSizes

                                        const newPage = Math.ceil(
                                            (searchPage / totalPages) * Math.ceil((itemCount ?? 1) / requestedPageSize)
                                        )

                                        form.setValue('search.page', newPage)
                                        form.setValue('search.pageSize', requestedPageSize)
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
                    </FormProvider>

                    <Conditional condition={updating}>
                        <Loading />
                    </Conditional>

                    <Conditional condition={!updating}>
                        <Conditional condition={data?.length === 0}>
                            <Row>
                                <Col>No {label}s</Col>
                            </Row>
                        </Conditional>

                        <Conditional condition={(data?.length ?? 0) > 0}>
                            <Row className='spacious w-full overflow-x-scroll'>
                                <Col>
                                    <table className='w-full table-auto rounded-lg'>
                                        <thead>
                                            <TablePageRow>
                                                {getEnabledFieldsLabels(fieldStates).map((fieldLabel) => (
                                                    <th key={fieldLabel} className='tablepage-header-field px-1'>
                                                        <Popover
                                                            className='tablepage-header'
                                                            content={fieldLabel}
                                                            popover={fieldLabel}
                                                        />
                                                    </th>
                                                ))}
                                            </TablePageRow>
                                        </thead>

                                        <tfoot>
                                            <TablePageRow>
                                                {getEnabledFieldsLabels(fieldStates).map((fieldLabel) => (
                                                    <th key={fieldLabel} className='tablepage-header-field px-1'>
                                                        <Popover
                                                            className='tablepage-header'
                                                            content={fieldLabel}
                                                            popover={fieldLabel}
                                                        />
                                                    </th>
                                                ))}
                                            </TablePageRow>
                                        </tfoot>

                                        <tbody>
                                            {(data ?? []).map((d) => {
                                                return (
                                                    <Component
                                                        key={d.id}
                                                        fields={fieldStates}
                                                        data={d}
                                                        mutate={mutate}
                                                    />
                                                )
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
                </BasePage>
                {!embedded && <Outlet />}
                {children}
            </TablePageContext.Provider>
        </div>
    )
}

export default TablePage
