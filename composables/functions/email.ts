export async function sendResetEmail(email: string, url: string) {
   const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en" dir="ltr">
      <table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:37.5em;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:white;border:1px solid #000;border-radius:5px;padding:8px;gap:1rem;">
         <tbody>
            <tr style="width: 100%">
            <td>
               <p style="font-size:14px;line-height:24px;margin:16px 0;">Reset your <b>Better Auth</b> password</p>
               <p style="font-size:14px;line-height:24px;margin:16px 0;">Hello ${email}</p>
               <p style="font-size:14px;line-height:24px;margin:16px 0;">We received a request to reset your password for your Better Auth account. If you didn&#39;t make this request, you can safely ignore this email.</p><a style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:8px 4px;background-color:#000;color:white;border-radius:5px;text-align:center;" href="${url}"><span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:0;">Click me</span><span></span></a>
            </td>
            </tr>
         </tbody>
      </table>
   </html>`
  
   const requestBody = {
      source: "",
      head: {
        to: email,
        subject: "Reset password",
      },
      body: html,
   };

   const baseUrl = process.env.BETTER_AUTH_URL;
    
   try {
      fetch(baseUrl + '/api/verification/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then((response) => {
         console.log(response);
      }).catch((error) => {
         throw error;
      });
   } catch (error) {
      console.error('Error:', error);
   }
}