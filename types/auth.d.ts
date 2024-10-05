import { client } from "~/composables/functions/client";

export type AuthProvider = "apple" | "discord" | "facebook" | "github" | "google" | "spotify" | "twitch" | "twitter";

export type Session = typeof client.$Infer.Session.session;