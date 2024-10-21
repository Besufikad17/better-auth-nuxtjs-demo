import { client } from "~/composables/functions/client";

export type AuthProvider = "apple" | "discord" | "facebook" | "github" | "google" | "spotify" | "twitch" | "twitter";

export type Session = typeof client.$Infer.Session.session;

export type DeviceSession = {
    session: typeof client.$Infer.Session.session;
    user: typeof client.$Infer.Session.user;
}