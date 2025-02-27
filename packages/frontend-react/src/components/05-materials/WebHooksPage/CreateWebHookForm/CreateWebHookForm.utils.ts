import type { CreateWebHookFormTypes } from './CreateWebHookForm.types'

export const CreateWebHookDefaultValues: CreateWebHookFormTypes = {
    name: '',
    description: '',
    enabled: false,
    url: '',
    translation: '',
    headers: '',
    // @ts-expect-error invalid empty type
    method: '',
    eventId: 0,
    privileges: {}
}
