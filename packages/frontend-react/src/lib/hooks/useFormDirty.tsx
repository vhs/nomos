import { useState } from 'react'

const useFormDirty = (
    ...fields: string[]
): [Record<string, boolean>, (fieldName: string, ...tests: boolean[]) => boolean, () => void] => {
    const [inputDirtyStates, setInputDirtyState] = useState<Record<string, boolean>>(
        fields.reduce((c, e) => {
            return { ...c, [e]: false }
        }, {})
    )

    const addDirty = (inputFieldName: string): void => {
        if (!inputDirtyStates[inputFieldName])
            setInputDirtyState((prevState) => {
                return { ...structuredClone(prevState), [inputFieldName]: true }
            })
    }

    const removeDirty = (inputFieldName: string): void => {
        if (inputDirtyStates[inputFieldName])
            setInputDirtyState((prevState) => {
                return { ...structuredClone(prevState), [inputFieldName]: false }
            })
    }

    const handleDirty = (inputFieldName: string, ...tests: boolean[]): boolean => {
        if (tests.filter(Boolean).length > 0) {
            addDirty(inputFieldName)

            return true
        } else {
            removeDirty(inputFieldName)

            return false
        }
    }

    const clearDirty = (): void => {
        setInputDirtyState((prevState) => {
            return Object.keys(prevState).reduce<Record<string, boolean>>((c, inputFieldName) => {
                c[inputFieldName] = false

                return c
            }, {})
        })
    }

    return [inputDirtyStates, handleDirty, clearDirty]
}

export default useFormDirty
