import { auth } from "~/composables/auth/auth";
 
export default defineEventHandler((event) => {
	return auth.handler(toWebRequest(event));
});