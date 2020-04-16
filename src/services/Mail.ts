import nodemailer, { Transporter } from "nodemailer";

interface IMail {
  host?: string;
  port?: number | string;
  secure?: boolean;
}

interface IMailAuth<Tpass = any, Tuser = any> {
  user?: Tuser;
  pass?: Tpass;
}

interface IMailConfig<Tpass = string | undefined, Tuser = string | undefined> {
  config?: IMail;
  auth?: IMailAuth<Tpass, Tuser>;
}

interface ISendMail {
  subject?: string;
  text?: string;
  html?: string;
  from: string;
  to: string;
}

const defaultValues: IMailConfig = {
  config: {
    port: 2525,
    secure: false,
  },
};

class SendMail {
  private host: string | undefined;
  private port: number | undefined | string;
  private secure: boolean | undefined;
  private user: string | undefined;
  private pass: string | undefined;
  private transporter: Transporter;

  constructor(config: IMailConfig = defaultValues) {
    this.host = config.config?.host;
    this.port = config.config?.port;
    this.secure = config.config?.secure;
    this.user = config.auth?.user;
    this.pass = config.auth?.pass;

    this.transporter = this.createTransport();
  }

  async send(data: ISendMail): Promise<void> {
    const mail = await this.transporter.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    return mail;
  }

  private createTransport(): Transporter {
    const transporter = nodemailer.createTransport({
      host: this.host,
      port: Number(this.port),
      secure: this.secure,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });

    return transporter;
  }
}

export default SendMail;
