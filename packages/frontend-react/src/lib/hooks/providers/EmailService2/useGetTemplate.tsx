import useSWR, { type SWRResponse } from 'swr'

import type { EmailTemplate } from '@/types/validators/records'

const useGetTemplate = (templateId?: number): SWRResponse<EmailTemplate> => {
    return useSWR<EmailTemplate>(
        templateId != null ? `/services/v2/EmailService2.svc/GetTemplate?id=${templateId}` : null
    )
}

export default useGetTemplate
