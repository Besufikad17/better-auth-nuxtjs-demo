import type{ IFormData } from "~/types/email";

export default defineEventHandler(async (event) => {
    try {
        const body: IFormData | null = await readBody(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' });
        }
        const emailHeading = {
            to: body.head.to,
            subject: body.head.subject
        }
        const emailBody: { name: string, body: string } = {
            name: "body",
            body: body.body
        }
        await sendEmail({ head: emailHeading, body: emailBody });
        return 200;
    } catch (error) {
        console.log(error);
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' });
    }
})