import { createAuthClient } from "better-auth/vue";
import { passkeyClient, twoFactorClient, multiSessionClient, organizationClient } from "better-auth/client/plugins"

export const client = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        multiSessionClient(),
        organizationClient(),
        passkeyClient(),
        twoFactorClient({
            twoFactorPage: "/two-factor",
        })
    ]
});