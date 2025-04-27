import { useCallback, useEffect, useMemo, useState, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import type { GrantingProps, GrantingSchema } from './Granting.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import Loading from '@/components/02-molecules/Loading/Loading'
import PrivilegePill from '@/components/02-molecules/PrivilegePill/PrivilegePill'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import Paginator from '@/components/04-composites/Paginator/Paginator'
import BasePage from '@/components/05-materials/BasePage/BasePage'
import type { AllowedPageSizes } from '@/components/05-materials/TablePage/TablePage.schema'
import { tablePageDefaults } from '@/components/05-materials/TablePage/TablePage.utils'

import type { Filters, Filter } from '@/lib/db/utils/query-filters'
import useGetAllPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useCountUsers from '@/lib/hooks/providers/UserService2/useCountUsers'
import useListUsers from '@/lib/hooks/providers/UserService2/useListUsers'
import useAuth from '@/lib/hooks/useAuth'
import { compileFilter } from '@/lib/nomos'

import { zUserGrantingSchema } from './Granting.schema'
import { GrantingDefaultValues } from './Granting.utils'
import GrantingItem from './GrantingItem/GrantingItem'

const Granting: FC<GrantingProps> = () => {
    const { currentUser } = useAuth()

    const { data: allPrivileges, isLoading: isGetAllPrivilegesLoading } = useGetAllPrivileges()

    const grantablePrivileges = useMemo(() => {
        const grantingPrivileges = Object.values(currentUser?.privileges ?? [])
            .filter((p) => p.code.startsWith('grant:'))
            .map((p) => p.code.replace(/^grant:/, ''))

        return allPrivileges != null ? allPrivileges.filter((p) => grantingPrivileges.includes(p.code)) : []
    }, [allPrivileges, currentUser?.privileges])

    const form = useForm<GrantingSchema>({
        resolver: zodResolver(zUserGrantingSchema),
        mode: 'onChange',
        defaultValues: GrantingDefaultValues
    })

    const page = form.watch('page')
    const pageSize = form.watch('pageSize')
    const query = form.watch('query')
    const queryInput = form.watch('queryInput')
    const columns = form.watch('columns')
    const order = form.watch('order')

    const getCompiledSearchFilter = useCallback(
        (filters: Filters) => {
            return compileFilter({
                filters,
                fields: [],
                search: form.getValues('query')
            })
        },
        [form]
    )

    const [compiledSearchFilters, setCompiledSearchFilters] = useState<Filter | null>(null)

    useEffect(() => {
        const filters: Filters = []

        const formSearchQuery = form.getValues('query')

        if (filters.length === 0 && formSearchQuery === '') {
            setCompiledSearchFilters(null)
        } else {
            const compiledFilter = getCompiledSearchFilter(filters)

            setCompiledSearchFilters(compiledFilter)
        }
    }, [form, getCompiledSearchFilter, query])

    const { data: itemCount, isLoading: isCountLoading } = useCountUsers(compiledSearchFilters)
    const { data, isLoading: isListLoading } = useListUsers(page, pageSize, columns, order, compiledSearchFilters)

    const updating = useMemo(
        () =>
            allPrivileges == null ||
            grantablePrivileges == null ||
            data == null ||
            isCountLoading ||
            isGetAllPrivilegesLoading ||
            isListLoading ||
            itemCount == null,
        [allPrivileges, grantablePrivileges, data, isCountLoading, isGetAllPrivilegesLoading, isListLoading, itemCount]
    )

    const totalPages = useMemo(() => {
        return itemCount != null && itemCount > 0 ? Math.ceil(itemCount / pageSize) : 1
    }, [itemCount, pageSize])

    const resetSearch = (): void => {
        form.reset()
    }

    const updateSearch = (): void => {
        if (query !== queryInput) form.setValue('query', queryInput)
    }

    return (
        <FormProvider {...form}>
            <BasePage
                data-testid='Granting'
                title='Grant Privileges'
                actions={[grantablePrivileges?.map((p) => <PrivilegePill key={p.code} privilege={p} />)]}
            >
                <Row>
                    <Col className='basis-3/4'>
                        <FormControl formKey='queryInput' formType='text' reset={resetSearch} />
                    </Col>
                    <Col className='basis-1/4'>
                        <div className='grid w-full grid-flow-col justify-evenly'>
                            <Button variant='primary' onClick={updateSearch}>
                                Search
                            </Button>
                            <Button variant='warning' onClick={resetSearch}>
                                Reset
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col className='h-9 basis-full'>
                        <div className='my-auto grid grid-flow-col'>
                            <div className='justify-self-start'>
                                <Paginator
                                    count={itemCount}
                                    currentPage={page}
                                    size={pageSize}
                                    pageSelectFn={(newPage) => {
                                        form.setValue('page', newPage)
                                    }}
                                />
                            </div>
                            <div className='justify-self-end text-nowrap text-center'>
                                <div className='relative top-[50%] grid -translate-y-[25%] grid-flow-col justify-around gap-x-4'>
                                    <div>{itemCount} users found</div>
                                    <div>
                                        <select
                                            id='allow-page-sizes-select'
                                            className='justify-self-end rounded-sm border-2 border-black'
                                            onChange={(event) => {
                                                const requestedPageSize = Number(event.target.value) as AllowedPageSizes

                                                const newPage = Math.ceil(
                                                    (page / totalPages) *
                                                        Math.ceil((itemCount ?? 1) / requestedPageSize)
                                                )

                                                form.setValue('page', newPage)
                                                form.setValue('pageSize', requestedPageSize)
                                            }}
                                            value={pageSize}
                                        >
                                            {tablePageDefaults.allowedPageSizes.map((e) => (
                                                <option key={e.toLocaleString()} value={e}>
                                                    {e}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Conditional condition={updating}>
                    <Loading />
                </Conditional>

                <Conditional condition={!updating}>
                    <Conditional condition={data?.length === 0}>
                        <Row>
                            <Col>No users</Col>
                        </Row>
                    </Conditional>

                    <Conditional condition={(data?.length ?? 0) > 0}>
                        <br />
                        <Row className='w-full overflow-x-scroll'>
                            <Col>
                                <table className='w-full table-auto rounded-lg'>
                                    <thead>
                                        <TablePageRow>
                                            <th className='tablepage-header-field px-1'>
                                                <Popover
                                                    className='tablepage-header'
                                                    content='Username'
                                                    popover='Username'
                                                />
                                            </th>
                                            <th className='tablepage-header-field px-1'>
                                                <Popover
                                                    className='tablepage-header'
                                                    content='Realname'
                                                    popover='Realname'
                                                />
                                            </th>
                                            <th className='tablepage-header-field px-1'>
                                                <Popover className='tablepage-header' content='Email' popover='Email' />
                                            </th>
                                        </TablePageRow>
                                    </thead>

                                    <tfoot>
                                        <TablePageRow>
                                            <th className='tablepage-header-field px-1'>
                                                <Popover
                                                    className='tablepage-header'
                                                    content='Username'
                                                    popover='Username'
                                                />
                                            </th>
                                            <th className='tablepage-header-field px-1'>
                                                <Popover
                                                    className='tablepage-header'
                                                    content='Realname'
                                                    popover='Realname'
                                                />
                                            </th>
                                            <th className='tablepage-header-field px-1'>
                                                <Popover className='tablepage-header' content='Email' popover='Email' />
                                            </th>
                                        </TablePageRow>
                                    </tfoot>

                                    <tbody>
                                        {(data ?? []).map((d) => {
                                            return (
                                                <GrantingItem
                                                    key={d.id}
                                                    user={d}
                                                    grantablePrivileges={grantablePrivileges}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Conditional>
                </Conditional>
            </BasePage>
        </FormProvider>
    )
}

export default Granting
