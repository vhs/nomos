/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IEmailService2 } from '@/types/providers/IEmailService2'
import type { EmailTemplate, EmailTemplates, User } from '@/types/validators/records'

export default class EmailService2 implements IEmailService2 {
    /**
     * @permission administrator
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountTemplates(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/EmailService2.svc/CountTemplates', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async DeleteTemplate(id: number): BackendResult<void> {
        await backendCall('/services/v2/EmailService2.svc/DeleteTemplate', { id })
    }

    /**
     * Summary of Email.
     *
     * @permission administrator
     *
     * @param {string} $email
     * @param {string} $tmpl
     * @param {Record<string,} unknown> $context
     * @param {string|null} $subject
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async Email(
        email: string,
        tmpl: string,
        context: Record<string, unknown>,
        subject: string | null
    ): BackendResult<void> {
        return await backendCall('/services/v2/EmailService2.svc/Email', { email, tmpl, context, subject })
    }

    /**
     * Summary of EmailUser.
     *
     * @permission administrator
     *
     * @param {User} $user    email address
     * @param {string} $tmpl
     * @param {Record<string,} unknown> $context
     * @param {string|null} $subject
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async EmailUser(
        user: User,
        tmpl: string,
        context: Record<string, unknown>,
        subject: string | null
    ): BackendResult<void> {
        return await backendCall('/services/v2/EmailService2.svc/EmailUser', { user, tmpl, context, subject })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     *
     * @throws {string}
     *
     * @returns {EmailTemplate}
     */
    async GetTemplate(id: number): BackendResult<EmailTemplate> {
        return await backendCall('/services/v2/EmailService2.svc/GetTemplate', { id })
    }

    /**
     * @permission administrator
     *
     * @param {number} $page
     * @param {number} $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {EmailTemplates}
     */
    async ListTemplates(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<EmailTemplates> {
        return await backendCall('/services/v2/EmailService2.svc/ListTemplates', {
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission administrator
     *
     * @param {string} $name
     * @param {string} $code
     * @param {string} $subject
     * @param {string} $help
     * @param {string} $body
     * @param {string} $html
     *
     * @throws {string}
     *
     * @returns {EmailTemplate}
     */
    async PutTemplate(
        name: string,
        code: string,
        subject: string,
        help: string,
        body: string,
        html: string
    ): BackendResult<EmailTemplate> {
        return await backendCall('/services/v2/EmailService2.svc/PutTemplate', {
            name,
            code,
            subject,
            help,
            body,
            html
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     * @param {string} $body
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateTemplateBody(id: number, body: string): BackendResult<boolean> {
        return await backendCall('/services/v2/EmailService2.svc/UpdateTemplateBody', {
            id,
            body
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     * @param {string} $code
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateTemplateCode(id: number, code: string): BackendResult<boolean> {
        return await backendCall('/services/v2/EmailService2.svc/UpdateTemplateCode', {
            id,
            code
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     * @param {string} $help
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateTemplateHelp(id: number, help: string): BackendResult<boolean> {
        return await backendCall('/services/v2/EmailService2.svc/UpdateTemplateHelp', {
            id,
            help
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     * @param {string} $html
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateTemplateHtml(id: number, html: string): BackendResult<boolean> {
        return await backendCall('/services/v2/EmailService2.svc/UpdateTemplateHtml', {
            id,
            html
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     * @param {string} $name
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateTemplateName(id: number, name: string): BackendResult<boolean> {
        return await backendCall('/services/v2/EmailService2.svc/UpdateTemplateName', {
            id,
            name
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} $id
     * @param {string} $subject
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateTemplateSubject(id: number, subject: string): BackendResult<boolean> {
        return await backendCall('/services/v2/EmailService2.svc/UpdateTemplateSubject', {
            id,
            subject
        })
    }

    private static _instance: EmailService2

    public static getInstance(): EmailService2 {
        if (EmailService2._instance == null) {
            EmailService2._instance = new EmailService2()
        }

        return EmailService2._instance
    }
}
