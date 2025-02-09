import { useState } from 'react'

const useFormErrors = (
    ...fields: string[]
): [Record<string, boolean>, (fieldName: string, ...tests: boolean[]) => boolean, () => void] => {
    const [inputErrorStates, setInputErrors] = useState<Record<string, boolean>>(
        fields.reduce((c, e) => {
            return { ...c, [e]: false }
        }, {})
    )

    const addError = (inputFieldName: string): void => {
        if (!inputErrorStates[inputFieldName])
            setInputErrors((prevState) => {
                return { ...structuredClone(prevState), [inputFieldName]: true }
            })
    }

    const removeError = (inputFieldName: string): void => {
        if (inputErrorStates[inputFieldName])
            setInputErrors((prevState) => {
                return { ...structuredClone(prevState), [inputFieldName]: false }
            })
    }

    const catchErrors = (inputFieldName: string, ...tests: boolean[]): boolean => {
        if (tests.filter(Boolean).length !== tests.length) {
            addError(inputFieldName)

            return true
        } else {
            removeError(inputFieldName)

            return false
        }
    }

    const clearErrors = (): void => {
        setInputErrors((prevState) => {
            return Object.keys(prevState).reduce<Record<string, boolean>>((c, inputFieldName) => {
                c[inputFieldName] = false

                return c
            }, {})
        })
    }

    return [inputErrorStates, catchErrors, clearErrors]
}

export default useFormErrors
