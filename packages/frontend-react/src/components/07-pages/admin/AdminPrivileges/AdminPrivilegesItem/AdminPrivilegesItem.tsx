import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { toast } from 'react-toastify'
import useSWR from 'swr'

import type { AdminPrivilegesItemProps } from './AdminPrivilegesItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import PrivilegeIcon from '@/components/02-molecules/PrivilegeIcon/PrivilegeIcon'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import PrivilegeService2 from '@/lib/providers/PrivilegeService2'
import { hydrateState } from '@/lib/ui'
import { checkValidIcon } from '@/lib/ui/fontawesome'
import { isBoolean, isString } from '@/lib/validators/guards'

import type { Privilege } from '@/types/records'

const AdminPrivilegesItem: FC<AdminPrivilegesItemProps> = ({ data }) => {
    const { mutate } = useTablePageContext()

    const privilegeId = Number(data.id)

    const privilegeUrl = useMemo(
        () => `/services/v2/PrivilegeService2.svc/GetPrivilege?id=${privilegeId}`,
        [privilegeId]
    )

    const { data: privilege, isLoading, mutate: mutatePrivilege } = useSWR<Privilege>(privilegeUrl)

    const [showModal, setShowModal] = useState<boolean>(false)
    const [dirty, setDirty] = useState(false)

    const [privilegeName, setPrivilegeName] = useState<string>('')
    const [privilegeDescription, setPrivilegeDescription] = useState<string>('')
    const [privilegeIcon, setPrivilegeIcon] = useState<string>('')
    const [privilegeEnabled, setPrivilegeEnabled] = useState<boolean>(false)

    const [inputErrorStates, setInputErrorState] = useState<Record<string, boolean>>(
        ['privilegeName', 'privilegeDescription', 'privilegeIcon'].reduce((c, e) => {
            return { ...c, [e]: false }
        }, {})
    )

    const addError = (inputFieldName: string): void => {
        setInputErrorState((prevState) => {
            return { ...structuredClone(prevState), [inputFieldName]: true }
        })
    }

    const removeError = (inputFieldName: string): void => {
        setInputErrorState((prevState) => {
            return { ...structuredClone(prevState), [inputFieldName]: false }
        })
    }

    const catchErrors = useCallback((inputFieldName: string, ...tests: boolean[]): boolean => {
        if (tests.filter(Boolean).length !== tests.length) {
            addError(inputFieldName)

            return true
        } else {
            removeError(inputFieldName)

            return false
        }
    }, [])

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (privilege == null) {
            toast.error('Missing privilege information')
            return
        }

        const errors = [
            catchErrors('privilegeName', isString(privilegeName)),
            catchErrors('privilegeDescription', isString(privilegeDescription)),
            catchErrors('privilegeIcon', isString(privilegeIcon)),
            catchErrors('privilegeEnabled', isBoolean(privilegeEnabled))
        ].filter(Boolean).length

        if (errors > 0) {
            toast.error(`Please fix the errors (${errors}) before continuing`)
            return
        }

        const loadingToastId = toast.loading('Updating privilege')

        try {
            if (privilege.name !== privilegeName)
                await PrivilegeService2.getInstance().UpdatePrivilegeName(privilegeId, privilegeName)
            if (privilege.description !== privilegeDescription)
                await PrivilegeService2.getInstance().UpdatePrivilegeDescription(privilegeId, privilegeDescription)
            if (privilege.icon !== privilegeIcon)
                await PrivilegeService2.getInstance().UpdatePrivilegeIcon(privilegeId, privilegeIcon)
            if (privilege.enabled !== privilegeEnabled)
                await PrivilegeService2.getInstance().UpdatePrivilegeEnabled(privilegeId, privilegeEnabled)

            toast.update(loadingToastId, {
                render: 'Privilege updated',
                type: 'success',
                isLoading: false,
                autoClose: 5000
            })

            await mutatePrivilege()
            await mutate()
        } catch (err) {
            toast.update(loadingToastId, {
                render: 'An unknown error occured. Please notify your administrators!',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            })
            console.error(err)
        }
    }

    const togglePrivilegeEnabled = async (): Promise<void> => {
        const newEnabledStatus = !(privilege?.enabled ?? false)

        const toastId = toast.loading(
            `Updating ${privilege?.name} status to ${newEnabledStatus ? 'enabled' : 'disabled'}`
        )

        try {
            await PrivilegeService2.getInstance().UpdatePrivilegeEnabled(privilegeId, newEnabledStatus)
            toast.update(toastId, { render: `Refreshing privilege`, type: 'success', isLoading: true })
            await mutatePrivilege()
            toast.update(toastId, {
                render: `Updated ${privilege?.name} status`,
                type: 'success',
                isLoading: false,
                autoClose: 3000
            })
        } catch (err) {
            console.error(err)
            toast.update(toastId, {
                render: `Failed to update ${privilege?.name} status`,
                type: 'error',
                isLoading: false,
                autoClose: 3000
            })
        }
    }

    const hydrateDefaults = useCallback((): void => {
        hydrateState(privilege?.name, setPrivilegeName)
        hydrateState(privilege?.description, setPrivilegeDescription)
        hydrateState(privilege?.icon, setPrivilegeIcon)
        hydrateState(privilege?.enabled, setPrivilegeEnabled)
        setInputErrorState({})
        setDirty(false)
        catchErrors('privilegeIcon', privilege?.icon != null && checkValidIcon(privilege?.icon))
    }, [catchErrors, privilege])

    useEffect(() => {
        hydrateDefaults()
    }, [hydrateDefaults, privilege])

    if (isLoading || privilege == null)
        return (
            <tr>
                {Object.keys(data).map((field) => (
                    <td key={field}>&nbsp;</td>
                ))}
            </tr>
        )

    return (
        <>
            <TablePageRow data-testid='AdminPrivilegesItem'>
                <ConditionalTableCell condition={'name' in data}>{privilege?.name}</ConditionalTableCell>
                <ConditionalTableCell condition={'code' in data}>{privilege?.code}</ConditionalTableCell>
                <ConditionalTableCell condition={'description' in data}>{privilege?.description}</ConditionalTableCell>
                <ConditionalTableCell condition={'icon' in data}>
                    <Popover
                        content={
                            <PrivilegeIcon
                                className={
                                    privilege?.icon !== '' && !checkValidIcon(privilege?.icon)
                                        ? 'text-red-500'
                                        : undefined
                                }
                                icon={privilegeIcon}
                                size='xl'
                            />
                        }
                        popover={privilegeIcon !== '' ? privilegeIcon.toString() : 'Not set'}
                    />
                </ConditionalTableCell>
                <ConditionalTableCell condition={'enabled' in data}>
                    <Toggle
                        checked={privilege?.enabled}
                        onChange={() => {
                            void togglePrivilegeEnabled()
                        }}
                    />
                </ConditionalTableCell>
                <td className='max-w-16'>
                    <Button
                        className='mx-1 h-10 w-10 rounded-3xl'
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                    <Button className='mx-1 h-10 w-10 rounded-3xl' variant='danger'>
                        <FontAwesomeIcon icon='times' />
                    </Button>
                    <Conditional condition={showModal}>
                        <OverlayCard
                            title={`Edit Privilege - ${privilege.name} (${privilege.code})`}
                            onClose={() => {
                                setShowModal(false)
                                return false
                            }}
                            closeLabel='Close'
                            actions={[
                                <Button
                                    key='Save'
                                    variant='success'
                                    className={dirty ? 'btn-success bg-lime-500 text-black' : 'btn-success'}
                                    onClick={(event) => {
                                        void submitHandler(event)
                                    }}
                                >
                                    Save
                                </Button>,
                                <Button
                                    key='Reset'
                                    variant='primary'
                                    onClick={() => {
                                        hydrateDefaults()
                                        setDirty(false)
                                    }}
                                >
                                    Reset
                                </Button>
                            ]}
                        >
                            <Row className='spacious'>
                                <Col
                                    className={
                                        inputErrorStates.privilegeName ? 'rounded-sm border border-red-500' : undefined
                                    }
                                >
                                    <label htmlFor={`privilege-name-${privilege.id}`}>
                                        <strong>Name</strong>
                                        <FormControl
                                            formType='text'
                                            id={`privilege-name-${privilege.id}`}
                                            value={privilegeName}
                                            onChange={(value) => {
                                                setPrivilegeName(value)
                                                setDirty(true)
                                            }}
                                        />
                                    </label>
                                </Col>
                            </Row>

                            <Row className='spacious'>
                                <Col
                                    className={
                                        inputErrorStates.privilegeDescription
                                            ? 'rounded-sm border border-red-500'
                                            : undefined
                                    }
                                >
                                    <label htmlFor={`privilege-description-${privilege.id}`}>
                                        <strong>Description</strong>
                                        <FormControl
                                            formType='text'
                                            id={`privilege-description-${privilege.id}`}
                                            value={privilegeDescription}
                                            onChange={(value) => {
                                                setPrivilegeDescription(value)
                                                setDirty(true)
                                            }}
                                        />
                                    </label>
                                </Col>
                            </Row>

                            <Row className='spacious'>
                                <Col
                                    className={
                                        inputErrorStates.privilegeIcon ? 'rounded-sm border border-red-500' : undefined
                                    }
                                >
                                    <label htmlFor={`privilege-icon-${privilege.id}`}>
                                        <div className='inline'>
                                            <Popover
                                                className='inline'
                                                content={<strong>Icon</strong>}
                                                popover={'This is the FontAwesome icon name.'}
                                            />{' '}
                                            <span
                                                className={
                                                    !checkValidIcon(privilegeIcon) ? 'inline text-orange-500' : 'hidden'
                                                }
                                            >
                                                Missing or invalid icon
                                            </span>
                                        </div>

                                        <FormControl
                                            formType='text'
                                            id={`privilege-icon-${privilege.id}`}
                                            className={!checkValidIcon(privilegeIcon) ? 'border-orange-500' : undefined}
                                            value={privilegeIcon}
                                            onChange={(value) => {
                                                setPrivilegeIcon(value)
                                                setDirty(true)
                                            }}
                                        />
                                    </label>
                                </Col>
                            </Row>

                            <Row className='spacious'>
                                <Col
                                    className={
                                        inputErrorStates.privilegeEnabled
                                            ? 'rounded-sm border border-red-500'
                                            : undefined
                                    }
                                >
                                    <Toggle
                                        checked={privilegeEnabled}
                                        onChange={() => {
                                            void togglePrivilegeEnabled()
                                        }}
                                    >
                                        Enabled
                                    </Toggle>
                                </Col>
                            </Row>

                            <Row className='spacious'>
                                <Col></Col>
                            </Row>
                        </OverlayCard>
                    </Conditional>
                </td>
            </TablePageRow>
        </>
    )
}

export default AdminPrivilegesItem
