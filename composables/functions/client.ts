import { createAuthClient } from "better-auth/vue";
import { passkeyClient } from "better-auth/plugins"; 

export const client = createAuthClient({
    //you can pass client configuration here
    plugins: [
        passkeyClient(),
    ]
});