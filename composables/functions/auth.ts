import { betterAuth } from "better-auth";
import { passkey } from "better-auth/plugins";
import { Pool } from "pg";
import { sendResetEmail } from "./email";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL as string
    }),
    emailAndPassword: {  
        enabled: true,
        async sendResetPassword(url, user) { 
            await sendResetEmail(user.email, url)
        }
    },
    plugins: [
        passkey(),
    ],
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
}); 