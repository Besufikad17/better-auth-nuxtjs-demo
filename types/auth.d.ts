import { client } from "~/composables/functions/client";

export type ActiveOrganization = {
    data: typeof client.$Infer.ActiveOrganization;
}

export type AuthProvider = "apple" | "discord" | "facebook" | "github" | "google" | "spotify" | "twitch" | "twitter";

export type Invitation = {
    organizationName: string;
    organizationSlug: string;
    inviterEmail: string;
    id: string;
    status: "pending" | "accepted" | "rejected" | "canceled";
    email: string;
    expiresAt: Date;
    organizationId: string;
    role: "member" | "admin" | "owner";
    inviterId: string;
}

export type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
};

export type Organization = typeof client.$Infer.Organization;

export type Session = typeof client.$Infer.Session.session;

export type DeviceSession = {
    session: typeof client.$Infer.Session.session;
    user: Omit<typeof client.$Infer.Session.user, "twoFactorEnabled">
}