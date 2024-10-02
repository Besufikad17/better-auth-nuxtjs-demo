export interface IEmailData {
    head: { to: string, subject: string },
    body: any
}

export interface IFormData {
    head: { to: string, subject: string },
    body: string
}