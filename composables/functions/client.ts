import { createAuthClient } from "better-auth/vue";
import { passkeyClient } from "better-auth/plugins"; 

export const client = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        passkeyClient(),
    ]
});