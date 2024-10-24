import { auth } from "~/composables/functions/auth";

export default defineEventHandler(async(event) => {
    const accts = await auth.api.listDeviceSessions({ headers: new Headers() });
    return accts;
});