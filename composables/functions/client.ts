import { createAuthClient } from "better-auth/vue";
import { passkeyClient, twoFactorClient, multiSessionClient, organizationClient } from "better-auth/client/plugins"

export const client = createAuthClient({
    baseURL: getBaseURL(),
    plugins: [
        multiSessionClient(),
        organizationClient(),
        passkeyClient(),
        twoFactorClient({
            twoFactorPage: "/two-factor",
        })
    ]
});

function getBaseURL() {
    let baseURL = process.env.BETTER_AUTH_URL
    if (!baseURL) {
      try {
        baseURL = getRequestURL(useEvent()).origin
      }
      catch (e) {}
    }
    return baseURL
}