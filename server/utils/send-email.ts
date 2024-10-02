import * as nodemailer from "nodemailer";
import handlebars from "handlebars";
import { IEmailData } from "~/types/email";

export default async (data: IEmailData): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: useRuntimeConfig().apiSecret.EMAIL_USER,
            pass: useRuntimeConfig().apiSecret.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: 'better-auth@noreply',
        to: data.head.to,
        subject: data.head.subject,
        html: data.body.body
    }
    await transporter.sendMail(mailOptions)
}