import { Request, Response } from "express";
import SendMail from "../../services/Mail";

class ContactController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, message } = req.body;

    const sendmail = new SendMail({
      auth: {
        pass: process.env.MAIL_PASSWORD,
        user: process.env.MAIL_USER,
      },
      config: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
      },
    });

    const send = await sendmail.send({
      from: `"${name} 👻" <${email}>`,
      to: process.env.MAIL_DEFAULT || "",
      html: `<b>${message}</b>`,
      subject: `Mail send from ${email} ✔`,
      text: message,
    });

    return res.json({ send });
  }
}

export default new ContactController();
