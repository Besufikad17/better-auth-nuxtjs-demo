export interface IEmailData {
    head: { to: string, subject: string },
    body: any
}

export interface IFormData {
    head: { to: string, subject: string },
    body: string
}

export interface IInvitationData {
    email: string;
    invitedByEmail: string;
    invitedByUsername: string;
    teamName: string;
    inviteLink: string;
}