import { betterAuth } from "better-auth";
import { passkey, twoFactor } from "better-auth/plugins";
import Pool from "pg-pool";
import { sendResetEmail, sendVerification } from "./email";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL as string
    }),
    emailAndPassword: {  
        enabled: true,
        async sendResetPassword(url, user) { 
            await sendResetEmail(user.email, url)
        },
        sendEmailVerificationOnSignUp: true,
        async sendVerificationEmail(email, url) {
            await sendVerification(email, url);
        }
    },
    plugins: [
        passkey(),
        twoFactor({
            issuer: "My App",
        })
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