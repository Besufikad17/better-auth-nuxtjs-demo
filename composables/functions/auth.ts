import Pool from "pg-pool";
import { betterAuth } from "better-auth";
import {  multiSession, organization, passkey, twoFactor } from "better-auth/plugins";
import { sendInvitationEmail, sendOTP, sendResetEmail, sendVerification } from "./email";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL as string
    }),
    emailAndPassword: {  
        enabled: true,
        async sendResetPassword(user, url) { 
            await sendResetEmail(user.email, url);
        },
        sendEmailVerificationOnSignUp: true,
        async sendVerificationEmail(url: string, email: string) {
            await sendVerification(email, url);
        }
    },
    plugins: [
        multiSession(),
        organization({
            async sendInvitationEmail(data) {
                await sendInvitationEmail({
                    email: data.email,
                    invitedByUsername: data.inviter.user.name,
                    invitedByEmail: data.inviter.user.email,
                    teamName: data.organization.name,
                    inviteLink: `http://localhost:3000/accept-invitation/${data.id}`
                });
            }
        }),
        passkey(),
        twoFactor({
            issuer: "My App",
            otpOptions: {
				async sendOTP(user, otp) {
                   await sendOTP(user.email, otp);
				},
			},
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