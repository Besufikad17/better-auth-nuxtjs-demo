import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: {
        provider: "postgres",
        url: process.env.DATABASE_URL as string,
    },
    emailAndPassword: {  
        enabled: true
    },
    socialProvider: {
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