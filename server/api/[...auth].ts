import { auth } from "~/composables/functions/auth";
 
export default defineEventHandler((event) => {
	return auth.handler(toWebRequest(event));
});